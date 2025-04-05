import { createStore } from "vuex";
import moodModule, { type MoodState } from "@/features/mood/store/mood";

// Create a RootState interface that combines all module states
export interface RootState {
  mood: MoodState;
}

// Create and export the store
export default createStore<RootState>({
  modules: {
    mood: moodModule,
  },
});
