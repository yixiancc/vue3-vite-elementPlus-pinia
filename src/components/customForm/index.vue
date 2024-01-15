<script setup>
import { ref, watchEffect } from "vue"

const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false
    },
    customFormModel: {
        type: Object,
        default: () => {
            return {}
        }
    },
    customFormRules: {
        type: Object,
        default: () => {
            return {}
        }
    },
    customFormItemArr: {
        type: Array,
        default: () => {
            return []
        }
    }
})

import cloneDeep from "lodash.clonedeep"

// 弹窗的显示与隐藏
const dialogVisible = ref(props.dialogVisible)
// 监听父组件传过来的dialogVisible，如果为true，则将customFormModel的值重置为父组件传过来的customFormModel，且深拷贝，以防止修改form中的值影响父组件的值
const customFormModel = ref({})
watchEffect(() => {
    dialogVisible.value = props.dialogVisible
    if (dialogVisible.value) {
        customFormModel.value = cloneDeep(props.customFormModel)
    }
})

// form表单的校验规则
const customFormRules = ref(props.customFormRules)

// form表单的数据
const customFormItemArr = ref(props.customFormItemArr)

// 清除上一次留下的校验警告
const customFormRef = ref(null)

function dialogOpened() {
    customFormRef.value.resetFields()
}

// 定义各种子传父事件，changeValue代表输入框的值改变，closeDialog代表点击取消按钮，submitForm代表点击确定按钮
const emits = defineEmits(["changeValue", "closeDialog", "submitForm"])

function changeValue(index, prop, value) { // index代表当前输入框的索引，prop代表当前输入框的prop，value代表当前输入框的值
    emits("changeValue", {
        index,
        prop,
        value
    })
}

function closeDialog() { // 关闭弹窗
    emits("closeDialog");
}

function submitForm() { // 提交表单，并将表单数据传给父组件
    emits("submitForm", customFormModel.value);
    emits("closeDialog");
}
</script>

<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            align-center
            center
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            destroy-on-close
            @opened="dialogOpened()"
        >
            <template #header="{ close }">
                <div class="dialogTitle">
                    添加绑定
                </div>
            </template>
            <div class="dialogBody" v-if="customFormItemArr.length != 0">
                <el-form ref="customFormRef" :model="customFormModel" label-width="80px" :rules="customFormRules">
                    <el-form-item :label="data.label" :prop="data.prop" v-for="(data, index) in customFormItemArr"
                                  :key="index" v-show="data.show">
                        <el-input v-if="data.type == 'input'" v-model="customFormModel[data.prop]"
                                  :placeholder="data.placeholder"
                                  @change="changeValue(index, data.prop, customFormModel[data.prop])"
                                  clearable/>
                        
                        <el-select v-if="data.type == 'select'" v-model="customFormModel[data.prop]"
                                   :placeholder="data.placeholder"
                                   @change="changeValue(index, data.prop, customFormModel[data.prop])"
                                   filterable
                                   clearable>
                            <el-option
                                v-for="item in data.optionsArr"
                                :key="item[data.optionsKey]"
                                :label="item[data.optionsLabel]"
                                :value="item[data.optionsValue]">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="closeDialog()">取消</el-button>
                    <el-button type="primary" @click="submitForm()">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
:deep(.el-dialog) {
    width: 5.6rem;
    height: auto;
    background: #041A21;
    border-radius: 0.04rem;
    box-shadow: 0rem 0.12rem 0.32rem 0rem rgba(0, 0, 0, 0.14);
    
    
    .el-dialog__header {
        padding: 0.3rem 0.22rem;
        margin-right: 0;
        
        .dialogTitle {
            width: 100%;
            color: #fff;
            font-size: 0.2rem;
            font-weight: 500;
            line-height: 0.22rem;
            text-align: center;
        }
    }
    
    .el-dialog__body {
        padding: 0;
        
        .dialogBody {
            width: 100%;
            padding: 0.1rem 0.8rem;
            
            .el-form-item:last-child {
                margin-bottom: 0;
            }
        }
    }
    
    .el-dialog__footer {
        padding: 0.3rem;
        
        .dialog-footer {
            display: flex;
            align-items: center;
            justify-content: center;
            
            .el-button--small {
                height: auto;
                color: #fff;
                font-size: 0.16rem;
                font-weight: 400;
                padding: 0.1rem 0.3rem;
                border-radius: 0.02rem;
                border: 0.01rem solid #024466;
                background: transparent;
                outline: none;
            }
            
            .el-button--primary {
                border: none;
                border-radius: 0.02rem;
                background: linear-gradient(180deg, #024466 0%, #4489FE 0.01%, #2262D0 100%);
            }
            
            .el-button--small + .el-button--small {
                margin-left: 0.35rem;
            }
        }
    }
    
}
</style>
