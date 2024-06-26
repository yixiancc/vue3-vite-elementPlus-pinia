<script setup>
import { ref, computed } from "vue";
import path from "path-browserify"

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    basePath: {
        type: String,
        default: ""
    }
})

const onlyOneChild = ref({})

function isShowChildren(children = [], item) {
    const showingChildren = children.filter(item => {
        if (item.hidden) {
            return false
        } else {
            onlyOneChild.value = item
            return true
        }
    })
    
    if (showingChildren.length === 1) {
        return true
    }
    
    if (showingChildren.length === 0) {
        onlyOneChild.value = { ...item, path: "", noShowingChildren: true }
        return true
    }
    
    return false
}

function resolvePath(routePath) {
    if (isExternal(routePath)) {
        return routePath
    }
    if (isExternal(props.basePath)) {
        return props.basePath
    }
    return path.resolve(props.basePath, routePath)
}

const linkType = computed(() => {
    if (isExternal(onlyOneChild.value.path)) {
        return "a"
    }
    return "router-link"
})

function linkProps() {
    let url = resolvePath(onlyOneChild.value.path)
    if (isExternal(url)) {
        return {
            href: url,
            target: "_blank",
            rel: "noopener"
        }
    }
    return {
        to: url
    }
}

function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

import { useRouter, useRoute } from "vue-router"

const route = useRoute()

// 获取当前路由，看是否是当前路由，如果是，返回activeImage，否则返回unactiveImage
function getImgSrc(meta) {
    if (meta.activeImage && meta.unactiveImage) {
        if (resolvePath(props.item.path) == route.path || route.path.indexOf(resolvePath(props.item.path)) != -1) {
            return meta.activeImage
        } else {
            return meta.unactiveImage
        }
    }
}

const router = useRouter()

function judgeIsHasRoute(item) {
    return router.hasRoute(item.name)
}
</script>

<template>
    <div v-if="!props.item.hidden && judgeIsHasRoute(props.item)">
        <template
            v-if="isShowChildren(props.item.children, props.item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !props.item.alwaysShow">
            <component :is="linkType" v-bind="linkProps()">
                <el-menu-item :index="resolvePath(onlyOneChild.path)">
                    <component v-if="props.item.meta.elIcon || props.item.meta.svg" :is="props.item.meta.elIcon || props.item.meta.svg"></component>
                    <img v-if="props.item.meta.activeImage && props.item.meta.unactiveImage"
                         :src="getImgSrc(props.item.meta)">
                    <span>{{ props.item.meta.title }}</span>
                </el-menu-item>
            </component>
        </template>
        
        <el-sub-menu v-else ref="subMenu" :index="resolvePath(props.item.path)" teleported>
            <template #title>
                <component v-if="props.item.meta.elIcon || props.item.meta.svg" :is="props.item.meta.elIcon || props.item.meta.svg"></component>
                <img v-else :src="getImgSrc(props.item.meta)">
                <span>{{ props.item.meta.title }}</span>
            </template>
            <sidebar-item
                v-for="child in props.item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :basePath="resolvePath(child.path)"
                class="nest-menu"
            />
        </el-sub-menu>
    </div>
</template>
