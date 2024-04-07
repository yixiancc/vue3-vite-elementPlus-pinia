<script setup>
import router from "@/router/index.js";

router.options.routes.forEach(data => {
    router.addRoute(data)
})

import { post } from "@/request/http.js"

// 从某个接口拿到的，动态路由的相关参数，通过check来判断用户是否能看到
post("").then(res => {
    let arr = res
    
    // 循环arr中找到check是false的项，并判断是否有children，若有继续找check是false的项，以此类推
    let findChildren = (arr) => {
        arr.forEach(data => {
            if (data.check === false) {
                router.removeRoute(data.url.replace(/\//g, ""))
            }
            if (data.resources && data.resources.length > 0) {
                findChildren(data.resources)
            }
        })
    }
    
    findChildren(arr)
})
</script>

<template>
    <router-view/>
</template>

<style scoped>

</style>
