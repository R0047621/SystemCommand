import router from "@/router";
import { list2tree } from "@/utils/buildMenuTree";
import { RouteRecordRaw } from "vue-router";
export default (menus: TLayout["data"]) => {
  const temp = menus.map((item) => {
    const path = (item.component as string).replace(/^views\//, "") + ".vue";
    item.component = () => import("@/views/" + path);
    return item;
  });
  const menuTree = list2tree(temp);
  menuTree.forEach((route) => router.addRoute(route as RouteRecordRaw));
  console.log(menus);
};
