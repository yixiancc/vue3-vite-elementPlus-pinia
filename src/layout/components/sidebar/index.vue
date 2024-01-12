<script setup>
import { ref, onMounted, watch } from "vue";
import sidebarItem from "./sidebarItem.vue";

const routes = ref([])

import router from "@/router/index.js";
import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(() => {
    routes.value = router.options.routes
})

watch(routes, () => {
    routes.value = router.options.routes
})

function activeMenu() {
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
        return meta.activeMenu
    }
    let returnPath = path
    
    router.options.routes.forEach(data => { // 遍历路由列表，以防有些路由是隐藏的，但是触发了，导致父节点没有亮，做法是返回父节点下的第一个子节点，也就是redirect
        if (data.path == path) {
            returnPath = data.redirect
        }
        if (data.children) {
            data.children.forEach(child => {
                if (child.path === path) {
                    if (child.hidden) {
                        returnPath = data.redirect
                    }
                }
            })
        }
    })
    return returnPath
}
</script>

<template>
    <div class="sidebar-index">
        <el-menu
            :default-active="activeMenu()"
        >
            <sidebar-item
                :basePath="route.path"
                v-for="route in routes"
                :key="route.path"
                :item="route"
            />
        </el-menu>
    </div>
</template>

<style lang="less" scoped>
.sidebar-index {
    width: 100%;
    height: 100%;
    max-height: 100%;
    padding: 0.15rem 0.08rem;
    overflow-y: auto
}

:deep(.el-menu) {
    border: 0;
    border-right: 0;
    
    .el-menu-item, .el-sub-menu__title {
        color: rgba(47, 49, 51, 1);
        
        img{
            width: 0.18rem;
        }
        
        > svg {
            width: 0.18rem;
            height: 0.18rem;
        }
        
        > span {
            margin-left: 0.1rem;
            font-size: 0.16rem;
        }
    }
    
    .el-menu-item.is-active {
        background: rgba(154, 52, 51, 1);
        color: #fff;
        border-radius: 0.04rem;
    }
    
    .nest-menu {
        span {
            color: rgba(140, 144, 148, 1)
        }
        
        .el-menu-item.is-active {
            background: rgba(154, 52, 51, 1);
            color: #fff;
            border-radius: 0.04rem;
            
            span {
                color: #fff
            }
        }
    }
    
}
</style>
