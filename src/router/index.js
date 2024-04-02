import { shallowRef } from "vue"
import { createRouter, createWebHistory } from "vue-router"

import Layout from "@/layout/index.vue"

import equipment0 from "@/assets/images/menu/equipment0.png"
import equipment1 from "@/assets/images/menu/equipment1.png"

import projectManageSvg from "@/assets/images/menu/projectManage.svg?component"

// 一定要看！！！
// 其中meta中可以存放的字段：
// title-标题，另外可以写函数，接收参数是路由上的query，例如title: query => { return query.projectName }，用处是想要在面包屑上动态显示上面的值时；
// elIcon-elementplus中的icon名字，该字段与后续activeImage/unactiveImage互斥，优先会使用elIcon；
// 还可以使用svg字段，需要先import进来，例如import projectManageSvg from "@/assets/images/menu/projectManage.svg?component"，然后在meta中写svg: projectManageSvg；
// activeImage/unactiveImage-两者需同时都有，存放的是小图标地址，分别为激活时/非激活时，与elIcon互斥；
// 优先级为elIcon > svg > activeImage/unactiveImage；
// breadcrumbIsClick-面包屑是否可以点击，默认true，false-不可以点击，用处是有时不想要这个面包屑可以点击，正常情况下不用加true，但需要强制要求可以点击的话，可以设置为true；
// breadcrumb-是否需要展示面包屑；activeMenu-在该页面时，菜单激活哪一个，需要严格写对激活的path全路径，例如/processManagement/manageTrainingRoom；
// routerLevel-用于强制使用几层路由，目前根据项目最高3，可以在src/layout/components/pageMain/index.vue自行加层级，若有activeMenu会被是为2级
// 其中redirect: "noRedirect"代表该路由不会重定向，且在面包屑中也不能被点击
const routes = [
    {
        path: "/login",
        component: () => import("@/views/login.vue"),
        meta: {
            title: "管理系统"
        },
        hidden: true
    },
    {
        path: "/",
        component: Layout,
        redirect: "/statisticAnalysis",
        meta: {
            title: "统计分析",
            elIcon: "",
            svg: shallowRef(projectManageSvg),
            breadcrumb: false,
            activeImage: "",
            unactiveImage: ""
        }, // breadcrumb代表该页面是否展示面包屑
        children: [
            {
                path: "statisticAnalysis",
                name: "statisticAnalysis",
                component: () => import("@/views/statisticAnalysis/index.vue"),
                meta: { title: "统计分析" }
            }
        ]
    },
    {
        path: "/processManagement",
        component: Layout,
        redirect: "noRedirect",
        meta: { title: "审核管理", elIcon: "Calendar", activeImage: "", unactiveImage: "" },
        children: [
            {
                path: "manageTrainingRoom",
                name: "manageTrainingRoom",
                component: () => import("@/views/processManagement/manageTrainingRoom/index.vue"),
                meta: { title: "实训室管理" },
                children: [
                    {
                        path: "trainingRoomInfo",
                        name: "trainingRoomInfo",
                        component: () => import("@/views/processManagement/manageTrainingRoom/trainingRoomInfo/index.vue"),
                        meta: { title: "实训室详情", activeMenu: "/processManagement/manageTrainingRoom" }, // activeMenu代表若处于该页面下时，侧边栏的高亮项
                        hidden: true
                    }
                ]
            },
            {
                path: "processEquipment",
                name: "processEquipment",
                component: () => import("@/views/processManagement/processEquipment/index.vue"),
                meta: { title: "设备审核" }
            },
            {
                path: "processMaterial",
                name: "processMaterial",
                component: () => import("@/views/processManagement/processMaterial/index.vue"),
                meta: { title: "材料审核" }
            }
        ]
    },
    {
        path: "/equipmentManagement",
        component: Layout,
        redirect: "/equipmentManagement",
        meta: { title: "设备管理", activeImage: equipment1, unactiveImage: equipment0 }, // breadcrumb代表该页面是否展示面包屑
        children: [
            {
                path: "/equipmentManagement",
                name: "equipmentManagement",
                component: () => import("@/views/equipmentManagement/index.vue")
            },
            {
                path: "equipmentAdd",
                name: "equipmentAdd",
                component: () => import("@/views/equipmentManagement/equipmentAdd/index.vue"),
                meta: { title: "录入设备", activeMenu: "/equipmentManagement", routerLevel: 1 }, // 用于强制使用几层路由，目前根据项目最高3
                hidden: true
            },
            {
                path: "equipmentInfo",
                name: "equipmentInfo",
                redirect: "/equipmentManagement",
                component: () => import("@/views/equipmentManagement/equipmentInfo/index.vue"),
                meta: { title: "设备详情", activeMenu: "/equipmentManagement" },
                hidden: true,
                children: [
                    {
                        path: "basicInfo",
                        name: "basicInfo",
                        component: () => import("@/views/equipmentManagement/equipmentInfo/basicInfo/index.vue"),
                        meta: { title: "基本信息", activeMenu: "/equipmentManagement" },
                        hidden: true,
                    },
                    {
                        path: "eduResources",
                        name: "eduResources",
                        component: () => import("@/views/equipmentManagement/equipmentInfo/eduResources/index.vue"),
                        meta: { title: "教学资源", activeMenu: "/equipmentManagement" },
                        hidden: true,
                        children: [
                            {
                                path: "eduFolder",
                                name: "eduFolder",
                                component: () => import("@/views/equipmentManagement/equipmentInfo/eduResources/eduFolder/index.vue"),
                                meta: { title: "教学案例", activeMenu: "/equipmentManagement", routerLevel: 3 }, // 用于强制使用几层路由，目前根据项目最高3
                                hidden: true,
                            }
                        ]
                    }
                ]
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
