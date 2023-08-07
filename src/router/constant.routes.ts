import { RouteRecordRaw } from "vue-router";

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/LoginView.vue"),
  },
  {
    path: "/departmentManagement",
    name: "departmentManagement",
    component: () => import("@/views/departmentManagement/index.vue"),
  },
];
export default constantRoutes;
