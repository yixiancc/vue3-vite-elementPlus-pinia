import { defineStore } from "pinia"

export const useCommonCache = defineStore({
    // 定义标识符
    id: "useCommonCache",
    // 定义状态
    state: () => {
        return {
            // 用户能访问的路由
            userRoutes: []
        }
    },
    persist: {
        key: "digital_laboratory_storeKey",
        storage: window.sessionStorage,
        paths: ["userRoutes"]
    },
    // 定义 getters
    getters: {},
    // 定义 actions
    actions: {}
})

// 用法，在需要的页面中引入
// import { useCommonCache } from "@/store/index.js"
// const commonCache = useCommonCache()
//
// console.log(commonCache.lalala)
