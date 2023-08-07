import { createApp } from "vue";
import { Icon } from "@iconify/vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "@/index.css";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 全局前置守卫，在路由切换开始时启动 NProgress
router.beforeEach(() => {
  NProgress.start();
});
// 全局后置守卫，在路由切换结束时停止 NProgress
router.afterEach(() => {
  NProgress.done();
});

const app = createApp(App);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Icon", Icon);
app.use(router);
app.mount("#app");
