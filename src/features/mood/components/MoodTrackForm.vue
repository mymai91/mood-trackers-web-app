<template>
  <div class="w-full lg:max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
    <div v-if="submitResp.error" class="mt-4 text-sm text-center text-red-500">
      {{ submitResp.error }}
    </div>

    <Form :validation-schema="schema" @submit="onSubmit">
      <Field name="mood" v-slot="{ field, errorMessage }">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <button
            v-for="(option, key) in MoodOptionsData"
            :key="key"
            type="button"
            @click="field.onChange(key)"
            :class="[
              'border-2 p-4',
              emotionColors[key],
              field.value === key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200',
            ]"
          >
            <!-- <div>{{ key }}</div> -->
            <div>{{ option.emoji }}</div>
            <div>{{ option.label }}</div>
          </button>
        </div>
      </Field>

      <ErrorMessage name="mood" class="text-red-600 text-sm mb-4 block" />

      <Field name="comment" v-slot="{ field }">
        <div class="mb-6">
          <label class="block text-gray-700 mb-2"
            >Add a comment (optional):</label
          >
          <textarea
            v-bind="field"
            rows="3"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="How was your day?"
          ></textarea>
        </div>
      </Field>

      <Field name="rating" v-slot="{ field }">
        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Rating (optional):</label>
          <input
            type="number"
            v-bind="field"
            class="w-full border border-gray-300 rounded p-2"
            min="1"
            max="5"
            placeholder="Enter a rating from 1 to 5"
          />
        </div>
      </Field>

      <button
        type="submit"
        class="bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white rounded-md px-6 py-3 font-semibold flex items-center justify-center gap-2"
      >
        <span>Save</span>

        <div
          v-if="submitResp.isLoading"
          class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
        ></div>
      </button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import type { Mood } from "@/entities/MoodEntity";
import { emotionColors, MoodOptionsData } from "@/entities/MoodEntity";
import { ErrorMessage, Field, Form } from "vee-validate";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import * as yup from "yup";

interface MoodFormValue extends Mood {}

const submitResp = ref({ mood: "", error: "", isLoadding: false });

// Store
const store = useStore();
const moodState = computed(() => store.state.mood);

// Form

const schema = yup.object({
  mood: yup.string().required("You have to select your mood"),
  comment: yup.string().optional(),
});

const onSubmit = async (values: MoodFormValue, { resetForm }: any) => {
  submitResp.value.isLoadding = true;
  const isTrackedDailyMood = Boolean(moodState.value.mood);
  if (isTrackedDailyMood) {
    submitResp.value.error = "You have already entered your mood for today";
    submitResp.value.isLoadding = false;
    return;
  }

  const resp = await store.dispatch("mood/createTrackMood", values);

  if (resp.success) {
    submitResp.value.mood = resp.mood;
    resetForm();
  } else {
    submitResp.value.error = resp.message;
    submitResp.value.isLoadding = false;
  }
};

onMounted(() => {
  store.dispatch("mood/getTrackMoodByDate");
});
</script>
∏
