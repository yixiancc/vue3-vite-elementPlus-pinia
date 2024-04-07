# vue3 + vite + elementPlue + pinia

## 基本实现很多类后台项目布局所需参数，相关配置在router中查看
### src/components中还有可以通用使用的组件包括信息弹窗，动态表单可自定义使用
### 信息弹窗已通过main.js中app.provide("$customMessage", customMessage)设置了全局属性，使用方法为
```javascript
customMessage({
    type: "success",
    content: "登陆成功！",
    duration: 800
})
```
### 具体可查看src/components/customMessage/index.vue内容

### 其中动态表单可以在src/views/equipmentManagement/equipmentBind/index.vue和src/views/equipmentManagement/equipmentInfo/index.vue中查看到部分使用方法

### 在src/request/http.js中自定义了接口调用方式以及拦截器处理方式，可查看

### 另外，项目中有动态路由，页面模块权限的相关处理，可供参考

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
