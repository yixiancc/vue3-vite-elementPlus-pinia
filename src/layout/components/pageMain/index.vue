<script setup>
import { computed } from "vue";

import { useRoute } from 'vue-router'
const route = useRoute()

const key = computed(() => {
    return route.path
})

function showChildRouterView() {
    if (route.meta.routerLevel) { // 用于强制使用几层路由，目前根据项目最高3
        return route.meta.routerLevel
    }
    
    if (route.meta.activeMenu) {
        return 2
    }
    
    return 1
}
</script>

<template>
    <transition name="el-fade-in" mode="out-in" v-if="showChildRouterView() == 3">
        <div class="page-main">
            <router-view>
                <router-view>
                    <router-view :key="key"></router-view>
                </router-view>
            </router-view>
        </div>
    </transition>
    <transition name="el-fade-in" mode="out-in" v-if="showChildRouterView() == 2">
        <div class="page-main">
            <router-view>
                <router-view :key="key"></router-view>
            </router-view>
        </div>
    </transition>
    <transition name="el-fade-in" mode="out-in" v-if="showChildRouterView() == 1">
        <div class="page-main">
            <router-view :key="key"></router-view>
        </div>
    </transition>
</template>

<style scoped lang="less">
.page-main {
    width: 100%;
    height: calc(100vh - var(--top-height) - 0.6rem);
    max-height: calc(100vh - var(--top-height) - 0.6rem);
    overflow-y: auto;
}

// global transition css

/* fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all .5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-0.3rem);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(0.3rem);
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(0.2rem);
}

.breadcrumb-move {
    transition: all .5s;
}

.breadcrumb-leave-active {
    position: absolute;
}

</style>
