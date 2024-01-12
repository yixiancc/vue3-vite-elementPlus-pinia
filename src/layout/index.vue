<script setup>
import sidebar from "./components/sidebar/index.vue"
import navbar from "./components/navbar/index.vue"
import pageMain from "./components/pageMain/index.vue"
import breadCrumb from "./components/breadCrumb/index.vue"

import { ref } from "vue"
// 布局展示条件
const isLeftAndRight = ref(false) // 左右布局，指的是左上下，右上下布局
const isTopAndBottom = ref(true) // 上下布局，指的是上是一个整体，下左右布局
</script>

<template>
    <!--    左上下 右上下布局-->
    <div class="all-layout-left-right" v-if="isLeftAndRight">
        <div class="all-layout-left">
            <div class="all-layout-left-title">
                <img src="./images/menuTitleLogo.png">
            </div>
            <div class="all-layout-left-sidebar">
                <sidebar></sidebar>
            </div>
        </div>
        <div class="all-layout-right">
            <navbar></navbar>
            <div class="all-layout-right-bottom">
                <div>
                    <bread-crumb></bread-crumb>
                </div>
                <div class="all-layout-right-bottom-page">
                    <page-main></page-main>
                </div>
            </div>
        </div>
    </div>
    
    <div class="all-layout-top-bottom" v-if="isTopAndBottom">
        <div class="all-layout-top">
            <navbar></navbar>
        </div>
        <div class="all-layout-bottom">
            <div class="all-layout-bottom-left">
                <sidebar></sidebar>
            </div>
            <div class="all-layout-bottom-right">
                <div>
                    <bread-crumb></bread-crumb>
                </div>
                <div class="all-layout-bottom-right-page">
                    <page-main></page-main>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.all-layout-left-right {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    
    .all-layout-left {
        width: var(--left-menu-width);
        min-width: var(--left-menu-width);
        height: 100%;
        flex-shrink: 0;
        
        &-title {
            width: 100%;
            height: var(--top-height);
            background: rgba(154, 52, 51, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            
            > img {
                width: 100%
            }
        }
        
        &-sidebar {
            width: 100%;
            height: calc(100% - 0.72rem)
        }
    }
    
    .all-layout-right {
        width: calc(100% - var(--left-menu-width));
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        
        .all-layout-right-bottom {
            width: 100%;
            flex-grow: 1;
            display: flex;
            flex-shrink: 0;
            flex-direction: column;
            padding: 0 0.25rem 0.25rem 0.25rem;
            background: #F5F7FA;
            
            &-page {
                width: 100%;
                flex-grow: 1;
            }
        }
    }
}

.all-layout-top-bottom {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    
    .all-layout-top {
        width: 100%;
        height: var(--top-height);
    }
    
    .all-layout-bottom {
        width: 100%;
        flex-grow: 1;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        
        &-left {
            width: var(--left-menu-width);
            min-width: var(--left-menu-width);
            height: 100%;
            flex-shrink: 0;
        }
        
        &-right {
            width: calc(100% - var(--left-menu-width));
            height: 100%;
            display: flex;
            flex-shrink: 0;
            flex-direction: column;
            padding: 0 0.25rem 0.25rem 0.25rem;
            background: #F5F7FA;
            
            &-page {
                width: 100%;
                flex-grow: 1;
            }
        }
    }
}
</style>
