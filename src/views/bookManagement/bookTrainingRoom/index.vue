<script setup>
import {ref } from "vue";

import router from "@/router/index.js";

const show = ref(false)

function showInfo() {
    router.push({
        path: "/bookManagement/bookTrainingRoom/trainingRoomInfo",
        query: {
            id: 1
        }
    })
    show.value = true
}
</script>

<template>
    <div @click="showInfo()">
        bookTrainingRoom
    </div>
</template>

<style scoped>

</style>
