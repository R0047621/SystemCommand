import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    id?: string;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login/LoginView.vue"),
  },
  {
    path: "/projectManagement/Project/:id",
    component: () => import("@/views/OverviewView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
