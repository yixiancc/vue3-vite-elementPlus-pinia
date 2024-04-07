<script setup>
import { ref, inject } from "vue"

const loginForm = ref({
    username: "",
    password: "",
    rememberMe: false
})

if (localStorage.getItem("username")) {
    loginForm.value.username = localStorage.getItem("username")
    loginForm.value.password = localStorage.getItem("password")
    loginForm.value.rememberMe = true
}

const isLoading = ref(false)
    
import { useRouter, useRoute } from "vue-router"
const router = useRouter()

const customMessage = inject("$customMessage")
const post = inject("$post")

function loginSystem() {
    router.options.routes.forEach(data => {
        router.addRoute(data)
    })
    
    isLoading.value = true
    post("", loginForm.value).then(res => {
        localStorage.clear()
        if (loginForm.value.rememberMe) {
            localStorage.setItem("username", loginForm.value.username)
            localStorage.setItem("password", loginForm.value.password)
        }
        localStorage.setItem("token", res.token)
        
        // 若有动态路由相关，可以写在此处，同时登录跳转就可以写到函数里，例如
        changeRoutes()

        customMessage({
            type: "success",
            content: "登陆成功！",
            duration: 800
        })
    }).catch(err => {
        isLoading.value = false
        console.log(err)
    })
}

import { useCommonCache } from "@/store/index.js"

const commonCache = useCommonCache()
    
function changeRoutes() {
    post("").then(res => {
        // 从某个接口拿到的，动态路由的相关参数，通过check来判断用户是否能看到
        let arr = res
        commonCache.userRoutes = arr
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

        setTimeout(() => {
            // 用于进入界面，旦有可能上一次登录保留的redirect现在登录后没有权限访问了，所以需要检查一下
            isLoading.value = false
            
            let url = ""
            
            let findCanEnterUrl = (arr) => {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].check) {
                        url = arr[i].url
                        break
                    } else {
                        if (arr[i].resources && arr[i].resources.length > 0) {
                            findCanEnterUrl(arr[i].resources)
                        }
                    }
                }
            }
            
            if (redirect.value) {
                if (router.hasRoute(redirect.value.split("/")[redirect.value.split("/").length - 1])) {
                    url = redirect.value
                } else {
                    url = "/"
                }
            } else {
                url = "/"
            }
            
            router.push(url).catch((err) => {
                console.log(err)
            })
        }, 500)
    })
}
</script>

<template>
    <div class="login-index">
        <div class="login-div">
            <div class="login-div-title">
                啦啦啦
            </div>
            <div class="login-div-form">
                <div class="login-div-form-title">
                    账号登录
                </div>
                <div class="login-div-form-input">
                    <div>
                        <el-icon>
                            <User/>
                        </el-icon>
                    </div>
                    <div>
                        <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
                    </div>
                </div>
                
                <div class="login-div-form-input">
                    <div>
                        <el-icon>
                            <Key/>
                        </el-icon>
                    </div>
                    <div>
                        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"
                                  show-password></el-input>
                    </div>
                </div>
                
                <div class="login-div-form-checkbox">
                    <el-checkbox v-model="loginForm.rememberMe" label="记住密码"/>
                </div>
                
                <div class="login-div-form-button">
                    <el-button type="primary" @click="loginSystem()" v-loading="isLoading"
                               :disabled="isLoading">
                        登录
                    </el-button>
                </div>
            </div>
            
            <div class="login-div-logo">
                <img src="@/assets/images/loginLogo.png">
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.login-index {
    width: 100%;
    height: 100%;
    padding: 0 1.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: url("@/assets/images/loginBack.png") no-repeat fixed;
    background-size: cover;
    
    .login-div {
        width: 6.2rem;
        padding: 0.5rem 0.65rem;
        border-radius: 0.04rem;
        border: 0.04rem solid rgba(68, 137, 254, 0.2);
        background: linear-gradient(218deg, rgba(37, 37, 37, 0.75) 2.49%, rgba(37, 37, 37, 0) 98.84%);
        backdrop-filter: blur(0.2rem);
        
        &-title {
            width: 100%;
            color: #4489FE;
            font-size: 0.42rem;
            font-weight: 700;
            letter-spacing: 0.042rem;
            text-align: center;
        }
        
        &-form {
            width: 100%;
            margin-top: 0.5rem;
            
            &-title {
                width: 100%;
                color: #FFF;
                font-size: 0.22rem;
                font-weight: 500;
                line-height: 0.22rem;
            }
            
            &-input {
                width: 100%;
                margin-top: 0.2rem;
                
                > div:nth-child(1) {
                    width: 100%;
                    font-size: 0.24rem;
                    color: rgba(68, 137, 254, 1)
                }
                
                > div:nth-child(2) {
                    width: 100%;
                    margin-top: 0.05rem
                }
            }
            
            &-checkbox {
                width: 100%;
                margin-top: 0.2rem;
            }
            
            &-button {
                width: 100%;
                margin-top: 0.25rem
            }
        }
        
        &-logo {
            width: 100%;
            margin-top: 0.4rem;
            text-align: center;
            
            > img {
                width: 3rem;
            }
        }
    }
}

:deep(.el-input--small) {
    width: 100%;
    display: block;
    
    .el-input__wrapper {
        width: 100%;
        padding: 0.12rem 0.16rem;
        border: 0.01rem solid #4B5563;
        box-shadow: none;
        background: #374151;
        
        .el-input__inner {
            height: 0.22rem;
            font-size: 0.18rem;
            color: #fff;
        }
        
        .el-input__prefix, .el-input__suffix {
            font-size: 0.22rem;
            color: rgba(68, 137, 254, 1)
        }
        
        .el-input__password {
            font-size: 0.22rem;
            color: rgba(68, 137, 254, 1)
        }
    }
}

:deep(.el-checkbox--small) {
    display: flex;
    align-items: center;
    
    .el-checkbox__inner {
        border: 0.01rem solid #4B5563;
        background: #374151;
    }
    
    .el-checkbox__inner:after {
        left: 0.04rem;
        border-width: 0.02rem;
        border-color: rgb(68, 137, 254);
    }
    
    .el-checkbox__label {
        color: #fff;
    }
}

:deep(.el-button--small) {
    width: 100%;
    height: auto;
    padding: 0.15rem 0;
    font-size: 0.2rem;
    letter-spacing: 0.1rem;
    text-align: center;
    border-radius: 0.02rem;
    background: #4489FE;
    border: none;
    outline: none;
    
    .el-loading-mask {
        background: #4489FE;
        
        .el-loading-spinner .path {
            stroke: #fff;
        }
    }
}
</style>
