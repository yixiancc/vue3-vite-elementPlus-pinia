// 实现使用函数调用组件的逻辑
//   引入 创建虚拟节点 和渲染方法
import { createVNode, render } from "vue"
// 引入信息提示组件
import customMessage from "./index.vue"

// 准备dom容器
const div = document.createElement("div")
// 添加到body上
document.body.appendChild(div)

export default ({ type, content, duration = 2000 }) => {
    // 实现：根据MessageMain.vue渲染消息提示
    // 1. 导入组件
    // 2. 根据组件创建虚拟节点   第一个参数为要创建的虚拟节点  第二个参数为props的参数
    const vnode = createVNode(customMessage, { type, content, duration })
    // 3. 准备一个DOM容器
    // 4. 把虚拟节点渲染DOM容器中
    render(vnode, div)

    // 5. 等待duration时间后，删除DOM容器中的内容
    setTimeout(() => {
        render(null, div)
    }, duration + 500)
}
