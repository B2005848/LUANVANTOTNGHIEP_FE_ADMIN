import { createRouter, createWebHashHistory } from "vue-router";
import Admin from "./admin.router";

const routes = [...Admin];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ?? "Error 404 - PAGE NOT FOUND!!!";
  next();
});
export default router;
