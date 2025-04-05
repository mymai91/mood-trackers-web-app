import type { Mood } from "@/entities/MoodEntity";

import axios from "axios";

export const createMoodApi = async (mood: Mood) => {
  const response = await axios.post("/moods", mood);

  return response;
};
