import NotFound from "@/components/NotFound.vue";
import MoodRouter from "@/features/mood/routers/MoodRouter";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...MoodRouter,
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export default router;
