import type { Meta, TimeEntity } from "@/entities/Entity";
import { groupBy } from "lodash";

interface RelationshipData {
  id: string;
  type: string;
}

export interface JsonApiEntity<T> {
  id: string;
  type: string;
  attributes: T & TimeEntity;
  relationships?: Record<
    string,
    { data: RelationshipData | RelationshipData[] }
  >;
}

export interface GenericJsonApiGetOne<T> {
  data: JsonApiEntity<T>;
  included?: JsonApiEntity<T>[];
}

export interface GenericJsonApiGetList<T> {
  data: JsonApiEntity<T>[];
  included?: JsonApiEntity<T>[];
  meta?: Meta;
}

const dtoSingleEntity = <T>(jsonData: JsonApiEntity<T>) => {
  const { id, type, attributes } = jsonData;
  const { createdAt, updatedAt, ...dataAttributes } = attributes;
  const entityData = {
    id,
    type,
    ...dataAttributes,
    createdAt: createdAt ? new Date(createdAt) : null,
    updatedAt: updatedAt ? new Date(updatedAt) : null,
  };

  return entityData;
};

export const dtoData = <T>(jsonData: GenericJsonApiGetOne<T>) => {
  const { data, included } = jsonData;

  const { id, type, attributes, relationships } = data;
  const { createdAt, updatedAt, ...dataAttributes } = attributes;
  const entity = {
    id,
    type,
    ...dataAttributes,
    createdAt: new Date(createdAt),
    updatedAt: updatedAt ? new Date(updatedAt) : null,
  };

  if (relationships) {
    const includedGroupByTypeData = groupBy(included, "type");

    Object.keys(relationships).forEach((key) => {
      const relationshipEntity = relationships[key];
      if (Array.isArray(relationshipEntity.data)) {
        const relationshipType = relationshipEntity.data[0].type;
        const parsedEntities = relationshipEntity.data.map(
          (relationshipData: any) => {
            const includedEntities = includedGroupByTypeData[relationshipType];
            const result = includedEntities.find((includedEntity) => {
              return includedEntity.id === relationshipData.id;
            });

            if (result) {
              const parsedEntity = dtoSingleEntity(result);

              return parsedEntity;
            }
          },
        );
        //@ts-ignore
        entity[key] = parsedEntities;
      } else {
        const singleRelationshipEntity = relationshipEntity.data;
        const includedEntities =
          includedGroupByTypeData[singleRelationshipEntity.type];

        const result = includedEntities.find((includedEntity) => {
          return includedEntity.id === singleRelationshipEntity.id;
        });

        if (result) {
          const parsedEntity = dtoSingleEntity(result);
          //@ts-ignore
          entity[key] = parsedEntity;
        }
      }
    });
  }

  return entity as T;
};

export const dtoListData = <T>(jsonData: GenericJsonApiGetList<T>) => {
  const { data: listData, included } = jsonData;

  const parsed = listData.map((item: JsonApiEntity<T>) => {
    const jsonApiSingle: GenericJsonApiGetOne<T> = {
      included,
      data: item,
    };
    return dtoData<T>(jsonApiSingle);
  });

  return parsed;
};
