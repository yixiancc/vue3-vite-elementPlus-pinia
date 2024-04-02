<script setup>
import { ref, onMounted, watch } from "vue";
import sidebarItem from "./sidebarItem.vue";

const routes = ref([])

import {useRouter, useRoute } from "vue-router"

const router = useRouter()

onMounted(() => {
    routes.value = router.options.routes
})

watch(routes, () => {
    routes.value = router.options.routes
})

const route = useRoute()

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

function logout() {
    router.push(`/login?redirect=${ global.$route.fullPath }`)
}

import logoutSvg from "../../images/logout.svg?component"
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
        
        <div class="logout-class">
            <div @click="logout()">
                <i>
                    <logout-svg/>
                </i>
                
                <div>
                    退出系统
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.sidebar-index {
    width: 100%;
    height: calc(100% - 0.5rem);
    max-height: calc(100% - 0.5rem);
    padding: 0.15rem 0.08rem;
    overflow-y: auto;
    position: relative;
    
    .logout-class {
        position: absolute;
        bottom: 0.2rem;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        
        > div {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: var(--main-color);
            
            > i {
                font-size: 0.16rem;
                
                svg {
                    vertical-align: middle;
                }
                
            }
            
            > div {
                margin-left: 0.08rem;
                color: var(--main-color);
                font-size: 0.16rem;
                font-weight: 400;
            }
        }
    }
}

:deep(.el-menu) {
    border: 0;
    border-right: 0;
    
    .el-menu-item, .el-sub-menu__title {
        color: rgba(47, 49, 51, 1);
        
        img {
            width: 0.18rem;
        }
        
        > svg {
            min-width: 0.18rem;
            font-size: 0.18rem;
            vertical-align: middle;
            width: 0.18rem;
            height: 0.18rem;
        }
        
        > span {
            margin-left: 0.1rem;
            font-size: 0.16rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    
    .el-menu-item.is-active {
        background: #F2F3F5;
        color: var(--main-color);
        border-radius: 0.04rem;
    }
    
    .nest-menu {
        span {
            color: rgba(140, 144, 148, 1)
        }
        
        .el-menu-item.is-active {
            background: #F2F3F5;
            border-radius: 0.04rem;
            
            span {
                color: var(--main-color);
            }
        }
    }
    
}
</style>
