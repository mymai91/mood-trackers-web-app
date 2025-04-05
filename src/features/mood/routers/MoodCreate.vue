<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold text-center mb-4">How was your day</h2>

    <div v-if="moodState.mood">
      <div class="text-lg text-gray-700 mb-2 text-center">
        <span class="font-semibold">Today's mood:</span>
        <span class="text-2xl">
          {{ MoodOptionsData[moodState.mood as MoodType].emoji }}
        </span>
      </div>

      <p v-if="moodState.mood.comment">
        You shared: {{ moodState.mood.comment }}
      </p>
    </div>
    <MoodTrackForm />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import MoodTrackForm from "../components/MoodTrackForm.vue";
import { computed, onMounted } from "vue";
import { MoodOptionsData } from "@/entities/MoodEntity";

// Store
const store = useStore();
import type { Mood, MoodType } from "@/entities/MoodEntity";

const moodState = computed(() => store.state.mood as { mood: Mood });

onMounted(() => {
  store.dispatch("mood/getTrackMoodByDate");
});
</script>
