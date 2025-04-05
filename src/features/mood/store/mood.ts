import type { ActionContext } from "vuex/types/index.js";
import Cookies from "js-cookie";
import { storageKey } from "@/entities/StorageKey";
import type { Mood } from "@/entities/MoodEntity";
import type { RootState } from "@/store";
import type { TimeEntity } from "@/entities/Entity";
import { createMoodApi } from "../api/api";

export interface MoodState extends TimeEntity {
  mood: string | null;
  comment?: string;
  error: string | null;
  isLoading?: boolean;
}

const initialState: MoodState = {
  mood: "",
  comment: "",
  createdAt: new Date(),
  error: null,
  isLoading: false,
};

export default {
  // use namespace: true
  // store.dispatch('mood/addEntry', moodData) otherwise store.dispatch('addEntry', moodData)
  namespaced: true,
  state: () => initialState,
  getters: {
    dailyMood: (state: MoodState) => ({
      mood: state.mood,
      comment: state.comment,
      createdAt: state.createdAt,
    }),
    isLoading: (state: MoodState) => state.isLoading,
    error: (state: MoodState) => state.error,
  },
  mutations: {
    TRACK_MOOD(state: MoodState, moodPayload: MoodState) {
      console.log("### TRACK_MOOD", moodPayload);
      state.mood = moodPayload.mood;
      state.comment = moodPayload.comment;
      state.createdAt = moodPayload?.createdAt || new Date();
    },
    SET_LOADING(state: MoodState, loading: boolean) {
      state.isLoading = loading;
    },
    SET_ERROR(state: MoodState, error: string | null) {
      state.error = error;
    },
  },
  actions: {
    async createTrackMood(
      { commit }: ActionContext<MoodState, RootState>,
      mood: Mood,
    ) {
      const moodFromStore = Cookies.get(storageKey.mood);
      console.log("###CREATE A MOOD####");
      if (moodFromStore) {
        const errorMessage = "You have already tracked your mood today";
        commit("SET_ERROR", errorMessage);

        return {
          success: false,
          message: errorMessage,
        };
      }

      try {
        await createMoodApi(mood);

        Cookies.set(storageKey.mood, JSON.stringify(mood), {
          expires: 1,
        });

        commit("TRACK_MOOD", mood);

        return {
          success: true,
          message: "Mood tracked successfully",
        };
      } catch (error: any) {
        const message = error.data.message || "Create error";

        commit("SET_ERROR", message);
        return {
          success: false,
          message: message,
        };
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async getTrackMoodByDate({ commit }: ActionContext<MoodState, RootState>) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        const mood = Cookies.get(storageKey.mood);
        if (mood) {
          const parsedMood = JSON.parse(mood);
          commit("TRACK_MOOD", { ...parsedMood });
          return {
            success: true,
            message: "Mood retrieved successfully",
            mood: parsedMood,
          };
        }

        return {
          success: true,
          message: "Track mood for today",
          mood: null,
        };
      } catch (error) {
        console.error("Error retrieving mood:", error);
        commit("SET_ERROR", "Error retrieving mood");
        return {
          success: false,
          message: "Error retrieving mood",
        };
      }
    },
  },
};
