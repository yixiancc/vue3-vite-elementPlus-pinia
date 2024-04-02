<script setup>
import { compile } from "path-to-regexp"
import { watch, ref } from "vue"
import { ArrowRightBold } from "@element-plus/icons-vue"

import { useRouter,useRoute } from "vue-router"

const router = useRouter()
    
const route = useRoute()

const levelList = ref([])

getBreadcrumb()

watch(() => route, () => {
    getBreadcrumb()
}, { deep: true })

function getBreadcrumb() {
    // only show routes with meta.title
    let matched = route.matched.filter(item => item.meta && item.meta.title)
    const first = matched[0]
    
    // if (!this.isDashboard(first)) {
    //     matched = [{path: '/userList', meta: {title: '后台基础设置'}}].concat(matched)
    // }
    
    levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

function handleLink(item) {
    const { redirect, path } = item
    if (redirect) {
        router.push(redirect)
        return
    }
    router.push({ // 修改了一下，用于保存query
        path: pathCompile(path),
        query: route.query
    })
}

function pathCompile(path) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = route
    const toPath = compile(path)
    return toPath(params)
}
</script>

<template>
    <el-breadcrumb class="app-breadcrumb" :separator-icon="ArrowRightBold">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                
                <span v-if="typeof item.meta.title === 'function' && item.meta.breadcrumbIsClick===false"
                      class="no-redirect">
                    {{ item.meta.title(route.query) }}
                </span>
                
                <a v-else-if="typeof item.meta.title === 'function' && item.meta.breadcrumbIsClick===true"
                   @click.prevent="handleLink(item)">
                    {{ item.meta.title(route.query) }}
                </a>
                
                <span
                    v-else-if="item.redirect==='noRedirect'||index==levelList.length-1||item.meta.breadcrumbIsClick===false"
                    class="no-redirect">
                    {{ item.meta.title }}
                </span>
                
                <a v-else @click.prevent="handleLink(item)">
                    {{ item.meta.title }}
                </a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
    display: block;
    line-height: 0.45rem;
    font-size: 0.15rem;
    
    :deep(.el-breadcrumb__separator.el-icon) {
        color: rgba(156, 163, 175, 1);
        font-size: 0.15rem;
    }
    
    .no-redirect {
        color: rgba(156, 163, 175, 1);
        cursor: text;
    }
    
    a {
        color: rgba(156, 163, 175, 1);
        cursor: pointer;
    }
    
    a:hover {
        color: rgba(68, 137, 254, 1);
    }
}
</style>
