import { createApp } from 'vue'
import App from "./App.vue"
const app = createApp(App)

import router from "@/router/index.js";

import { createPinia } from "pinia"
const pinia = createPinia()
import piniaPluginPersistedstate from "pinia-plugin-persistedstate" // pinia持久化插件
pinia.use(piniaPluginPersistedstate)

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router).use(pinia).use(ElementPlus, { size: "small", zIndex: 3000, locale: zhCn }).mount("#app")

import { post, get, request } from "@/request/http.js";
app.provide("$post", post)
app.provide("$get", get)
app.provide("$request", request)

import "@/assets/css/index.less";
import "dayjs/locale/zh-cn"
