import { createApp } from "vue";
import { Icon } from "@iconify/vue";
import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import "./registerServiceWorker";
import "@/index.css";

const app = createApp(App);
// 将dayjs添加到Vue的原型中
app.config.globalProperties.$dayjs = dayjs;
// eslint-disable-next-line vue/multi-word-component-names
app.component("Icon", Icon);
app.use(router);
app.mount("#app");
