<script setup>
import { ElDialog } from "element-plus"
import { ref } from "vue"
import successIcon from "@/components/customMessage/icon/icon-success-fill.png"
import errorIcon from "@/components/customMessage/icon/icon-warning-fill.png"

const showCustomMessage = ref(true)

const props = defineProps({
    type: {
        type: String,
        default: "success"
    },
    content: {
        type: String,
        default: "提示内容"
    },
    duration: {
        type: Number,
        default: 2000
    }
})

setTimeout(() => {
    showCustomMessage.value = false
}, props.duration)

const imgUrl = ref("")
if (props.type == "success") {
    imgUrl.value = successIcon
} else {
    imgUrl.value = errorIcon
}

</script>

<template>
    <div>
        <el-dialog
            v-model="showCustomMessage"
            :show-close="false"
            align-center
            destroy-on-close
            center
        >
            <img :src="imgUrl">
            <div>
                {{ props.content }}
            </div>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
:deep(.el-dialog) {
    width: auto;
    height: auto;
    background: transparent;
    
    .el-dialog__header {
        padding: 0;
        margin-right: 0;
    }
    
    .el-dialog__body {
        padding: 0.8rem 1.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 0.04rem;
        box-shadow: 0rem 0.12rem 0.32rem 0rem rgba(0, 0, 0, 0.14);
        
        > img {
            width: 0.48rem
        }
        
        > div {
            margin-left: 0.14rem;
            color: #000;
            font-size: 0.24rem;
            font-weight: 500;
        }
    }
}
</style>
