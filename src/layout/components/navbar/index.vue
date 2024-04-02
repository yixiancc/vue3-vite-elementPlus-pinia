<script setup>
import { useRouter,useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function logout() {
    router.push(`/login?redirect=${ route.fullPath }`)
}
</script>

<template>
    <div class="navbar-index">
        <div class="navbar-index-title">
            lalala
        </div>
        <el-dropdown class="avatar-container" trigger="click" :teleported="false">
            <div class="avatar-wrapper">
                <div>lalala</div>
                <img src="/images/icon.png" class="user-avatar">
            </div>
            <template #dropdown>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item @click.native="logout">
                        <span>登出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<style scoped lang="less">
.navbar-index {
    width: 100%;
    height: var(--top-height);
    min-height: var(--top-height);
    padding: 0 0.35rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .navbar-index-title {
        font-size: 0.26rem;
        font-weight: 500;
        letter-spacing: 0.04rem;
    }
}

:deep(.avatar-container) {
    
    .avatar-wrapper {
        display: flex;
        align-items: center;
        
        > div:nth-child(1) {
            margin-right: 0.1rem;
            font-weight: 500;
            font-size: 0.16rem;
        }
        
        .user-avatar {
            cursor: pointer;
            width: 0.3rem;
            height: 0.3rem;
            border-radius: 0.1rem;
        }
    }
}

:deep(.el-dropdown-menu) {
    .el-dropdown-menu__item {
        padding: 0.05rem 0.15rem;
        font-size: 0.14rem;
    }
}
</style>
