import { createApp } from "vue";
import App from "./App.vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import axios from "axios";
import VueAxios from "vue-axios";
import "./tailwind.css";
import "flowbite";
import "vue3-easy-data-table/dist/style.css";

const app = createApp(App);
app.component("EasyDataTable", Vue3EasyDataTable);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios); // provide 'axios'
app.mount("#app");
