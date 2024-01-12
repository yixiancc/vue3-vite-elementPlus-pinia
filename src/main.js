import { createApp } from "vue"
import router from "@/router/index.js";

import App from "./App.vue"

import { createPinia } from "pinia"
const pinia = createPinia()
import piniaPluginPersistedstate from "pinia-plugin-persistedstate" // pinia持久化插件
pinia.use(piniaPluginPersistedstate)

import ElementPlus from "element-plus"
import 'dayjs/locale/zh-cn'
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

import { post, get, request } from "@/request/http.js";
import "@/assets/css/index.less";
import * as echarts from "echarts";
import customMessage from "@/components/customMessage/index.js";

app.provide("$post", post)
app.provide("$get", get)
app.provide("$request", request)
app.provide("$echarts", echarts)
app.provide("$customMessage", customMessage)

app.use(router).use(pinia).use(ElementPlus, { size: "small", zIndex: 3000, locale: zhCn }).mount("#app")
