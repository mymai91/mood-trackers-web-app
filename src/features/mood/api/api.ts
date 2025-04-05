import type { Mood } from "@/entities/MoodEntity";
import axiosInstance from "@/lib/axios/config";

export const createMoodApi = async (mood: Mood) => {
  const response = await axiosInstance.post("/moods", { mood: mood });

  return response;
};
