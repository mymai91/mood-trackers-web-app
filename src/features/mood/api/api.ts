// import type { Period } from "../../../entities/Entity";
// import type { Mood, MoodEntity } from "../../../entities/MoodEntity";
// import { api } from "../../../lib/services/api";

import type { Period } from "@/entities/Entity";
import type { Mood, MoodEntity } from "@/entities/MoodEntity";
import { api } from "@/lib/services/api";

export const getMoodPeriodApi = async (period: Period) => {
  const response = await api.getList<MoodEntity>("/moods", {
    query: [`period=${period}`],
  });

  return response.data;
};

export const createMoodApi = async (mood: Mood) => {
  return api.create<Mood, Mood>("/moods", mood);
};
