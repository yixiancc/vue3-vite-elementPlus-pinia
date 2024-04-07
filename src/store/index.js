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
    actions: {
        // 判断用户是否能够访问，利用router.hasRoute，因为不能访问的已经remove了
        judgeAuthority(to) {
            return new Promise((resolve, reject) => {
                const router = useRouter()
                resolve(router.hasRoute(to.name))
            })
        }
    }
})

// 用法，在需要的页面中引入
// import { useCommonCache } from "@/store/index.js"
// const commonCache = useCommonCache()
//
// console.log(commonCache.lalala)
