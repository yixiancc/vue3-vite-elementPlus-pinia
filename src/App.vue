<script setup>
import router from "@/router/index.js";

router.options.routes.forEach(data => {
    router.addRoute(data)
})

import { post } from "@/request/http.js"

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
