import { createApp } from "vue";
import { Icon } from "@iconify/vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "@/index.css";

const app = createApp(App);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Icon", Icon);
app.use(router);
app.mount("#app");
