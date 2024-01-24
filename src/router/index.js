import { createRouter, createWebHistory } from "vue-router"

import Layout from "@/layout/index.vue"

import projectManage0 from "@/assets/images/menu/projectManage0.png"
import projectManage1 from "@/assets/images/menu/projectManage1.png"
import equipment0 from "@/assets/images/menu/equipment0.png"
import equipment1 from "@/assets/images/menu/equipment1.png"

// 一定要看！！！
// 其中meta中可以存放的字段：
// title-标题，另外可以写函数，接收参数是路由上的query，例如title: query => { return query.projectName }，用处是想要在面包屑上动态显示上面的值时；
// elIcon-elementplus中的icon名字，该字段与后续activeImage/unactiveImage互斥，优先会使用elIcon；
// activeImage/unactiveImage-两者需同时都有，存放的是小图标地址，分别为激活时/非激活时，与elIcon互斥；
// breadcrumbIsClick-面包屑是否可以点击，默认true，false-不可以点击，用处是有时不想要这个面包屑可以点击，正常情况下不用加true，但需要强制要求可以点击的话，可以设置为true；
// breadcrumb-是否需要展示面包屑；activeMenu-在该页面时，菜单激活哪一个，需要严格写对激活的path全路径，例如/processManagement/manageTrainingRoom；
// routerLevel-用于强制使用几层路由，目前根据项目最高3，可以在src/layout/components/pageMain/index.vue自行加层级，若有activeMenu会被是为2级
// 其中redirect: "noRedirect"代表该路由不会重定向，且在面包屑中也不能被点击
const routes = [
    {
        path: "/login",
        component: () => import("@/views/login.vue"),
        meta: {
            title: "智能连续压实控制系统"
        },
        hidden: true
    },
    {
        path: "/",
        component: Layout,
        redirect: "/projectManage",
        meta: {
            title: "项目管理",
            elIcon: "",
            breadcrumb: false,
            activeImage: projectManage0,
            unactiveImage: projectManage1
        },
        children: [
            {
                path: "projectManage",
                name: "projectManage",
                component: () => import("@/views/projectManage/index.vue"),
                meta: { title: "项目管理", activeMenu: "/", routerLevel: 1 },
                hidden: true,
                children: [
                    {
                        path: "projectInfo",
                        name: "projectInfo",
                        component: () => import("@/views/projectManage/projectInfo/index.vue"),
                        meta: {
                            title: query => {
                                return query.projectName
                            },
                            routerLevel: 2,
                            breadcrumbIsClick: false,
                            activeMenu: "/"
                        },
                        hidden: true,
                        children: [
                            {
                                path: "allData",
                                name: "allData",
                                component: () => import("@/views/projectManage/projectInfo/allData/index.vue"),
                                meta: { title: "总体数据", routerLevel: 3, activeMenu: "/" },
                                hidden: true
                            },
                            {
                                path: "historyData",
                                name: "historyData",
                                component: () => import("@/views/projectManage/projectInfo/historyData/index.vue"),
                                meta: { title: "历史数据", routerLevel: 3, activeMenu: "/" },
                                hidden: true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/equipmentManagement",
        component: Layout,
        redirect: "noRedirect",
        meta: { title: "设备管理", activeImage: equipment1, unactiveImage: equipment0 }, // breadcrumb代表该页面是否展示面包屑
        children: [
            {
                path: "equipmentBind",
                name: "equipmentBind",
                component: () => import("@/views/equipmentManagement/equipmentBind/index.vue"),
                meta: { title: "绑定详情", routerLevel: 1 }, // 用于强制使用几层路由，目前根据项目最高3
            },
            {
                path: "equipmentInfo",
                name: "equipmentInfo",
                component: () => import("@/views/equipmentManagement/equipmentInfo/index.vue"),
                meta: { title: "设备详情", routerLevel: 1 }
            }
        ]
    },
    {
        path: "/accountManagement",
        component: Layout,
        redirect: "/accountManagement",
        meta: { title: "账号管理", elIcon: "User", breadcrumb: false, activeImage: "", unactiveImage: "" }, // breadcrumb代表该页面是否展示面包屑
        children: [
            {
                path: "/accountManagement",
                name: "accountManagement",
                component: () => import("@/views/accountManagement/index.vue"),
                meta: { title: "账号管理" }
            }
        ]
    },
    {
        path: "/systemInfo",
        component: Layout,
        redirect: "/systemInfo",
        meta: { title: "系统信息", elIcon: "Document", breadcrumb: false, activeImage: "", unactiveImage: "" }, // breadcrumb代表该页面是否展示面包屑
        children: [
            {
                path: "systemInfo",
                name: "systemInfo",
                component: () => import("@/views/systemInfo/index.vue"),
                meta: { title: "系统信息" }
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
        redirect: "/",
        name: "ErrorPage",
        hidden: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        if (to.meta.title instanceof Function) {
            document.title = to.meta.title(to.query);
        } else {
            document.title = to.meta.title;
        }
    }
    next();
});

export default router;
