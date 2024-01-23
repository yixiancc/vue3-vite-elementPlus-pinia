<script setup>
import { inject, ref } from "vue"
import customForm from "@/components/customForm/index.vue"
import { ElMessageBox } from "element-plus";

const post = inject("$post")
const customMessage = inject("$customMessage")

const rtkList = ref([])
const vibrateList = ref([])

getRtkVibrate()

function getRtkVibrate() {
    post("/icc4/equipment/listByType", {
        companyId: localStorage.getItem("companyId")
    }).then(res => {
        let arr = res
        arr.forEach(data => {
            if (data.type == 1) {
                rtkList.value = data.list
            } else if (data.type == 2) {
                vibrateList.value = data.list
            }
        })
    })
}

const rollerList = ref([])

getRoller()

function getRoller() {
    post("/icc4/roller/list", {
        companyId: localStorage.getItem("companyId")
    }).then(res => {
        rollerList.value = res
    })
}

const dialogVisible = ref(false)
const customFormTitle = ref("")
const customSubmitType = ref(1)
const customFormModel = ref({
    companyId: localStorage.getItem("companyId"),
    number: "",
    rollingWheelWidth: "",
    rollingWheelMass: "",
    strongVibratingStartingForce: "",
    weakVibrationStartingForce: "",
    trussMass: "",
    strongVibratingFrequency: "",
    weakVibratingFrequency: "",
    rollerHigh: ""
})
const customFormRules = ref({
    number: [
        { required: true, message: "请输入压路机编号", trigger: "blur" }
    ],
    rollingWheelWidth: [
        { required: true, message: "请输入碾压轮宽度", trigger: "blur" }
    ],
    rollingWheelMass: [
        { required: true, message: "请输入碾压轮质量", trigger: "blur" }
    ],
    strongVibratingStartingForce: [
        { required: true, message: "请输入强振起振力", trigger: "blur" }
    ],
    weakVibrationStartingForce: [
        { required: true, message: "请输入弱振起振力", trigger: "blur" }
    ],
    trussMass: [
        { required: true, message: "请输入桁架质量", trigger: "blur" }
    ],
    strongVibratingFrequency: [
        { required: true, message: "请输入强振频率", trigger: "blur" }
    ],
    weakVibratingFrequency: [
        { required: true, message: "请输入弱振频率", trigger: "blur" }
    ],
    rollerHigh: [
        { required: true, message: "请输入压路机高度", trigger: "blur" }
    ]
})
const customFormItemArr = ref([
    {
        label: "压路机编号",
        prop: "number",
        type: "input",
        placeholder: "请输入压路机编号",
        disabled: false
    },
    {
        label: "碾压轮宽度",
        prop: "rollingWheelWidth",
        type: "input",
        placeholder: "请输入碾压轮宽度",
        disabled: false,
        append: true,
        appendText: "m"
    },
    {
        label: "碾压轮质量",
        prop: "rollingWheelMass",
        type: "input",
        placeholder: "请输入碾压轮质量",
        disabled: false,
        append: true,
        appendText: "kg"
    },
    {
        label: "强振起振力",
        prop: "strongVibratingStartingForce",
        type: "input",
        placeholder: "请输入强振起振力",
        disabled: false,
        append: true,
        appendText: "KN"
    },
    {
        label: "弱振起振力",
        prop: "weakVibrationStartingForce",
        type: "input",
        placeholder: "请输入弱振起振力",
        disabled: false,
        append: true,
        appendText: "KN"
    },
    {
        label: "桁架质量",
        prop: "trussMass",
        type: "input",
        placeholder: "请输入桁架质量",
        disabled: false,
        append: true,
        appendText: "kg"
    },
    {
        label: "强振频率",
        prop: "strongVibratingFrequency",
        type: "input",
        placeholder: "请输入强振频率",
        disabled: false,
        append: true,
        appendText: "Hz"
    },
    {
        label: "弱振频率",
        prop: "weakVibratingFrequency",
        type: "input",
        placeholder: "请输入弱振频率",
        disabled: false,
        append: true,
        appendText: "Hz"
    },
    {
        label: "压路机高度",
        prop: "rollerHigh",
        type: "input",
        placeholder: "请输入压路机高度",
        disabled: false,
        append: true,
        appendText: "m"
    }
])

function addRoller() {
    customFormTitle.value = "添加压路机"
    customSubmitType.value = 1
    delete customFormModel.value.id
    customFormModel.value.number = ""
    customFormModel.value.rollingWheelWidth = ""
    customFormModel.value.rollingWheelMass = ""
    customFormModel.value.strongVibratingStartingForce = ""
    customFormModel.value.weakVibrationStartingForce = ""
    customFormModel.value.trussMass = ""
    customFormModel.value.strongVibratingFrequency = ""
    customFormModel.value.weakVibratingFrequency = ""
    customFormModel.value.rollerHigh = ""
    dialogVisible.value = true
}

function editRoller(data) {
    customFormTitle.value = "添加压路机" + data.id
    customSubmitType.value = 2
    customFormModel.value.id = data.id
    customFormModel.value.number = data.number
    customFormModel.value.rollingWheelWidth = data.rollingWheelWidth
    customFormModel.value.rollingWheelMass = data.rollingWheelMass
    customFormModel.value.strongVibratingStartingForce = data.strongVibratingStartingForce
    customFormModel.value.weakVibrationStartingForce = data.weakVibrationStartingForce
    customFormModel.value.trussMass = data.trussMass
    customFormModel.value.strongVibratingFrequency = data.strongVibratingFrequency
    customFormModel.value.weakVibratingFrequency = data.weakVibratingFrequency
    customFormModel.value.rollerHigh = data.rollerHigh
    dialogVisible.value = true
}

function closeDialog() {
    dialogVisible.value = false
}

function submitForm(obj, type) {
    let url = ""
    if (type == 1) {
        url = "/icc4/roller/add"
    } else if (type == 2) {
        url = "/icc4/roller/update"
    }
    post(url, obj).then(res => {
        dialogVisible.value = false
        getRoller()
    })
}

function delRoller(data) {
    ElMessageBox.confirm(
        "确认删除编号" + data.number + "的压路机？",
        "提示",
        {
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            "show-close": false,
            "close-on-click-modal": false,
            "close-on-press-escape": false
        }
    ).then(() => {
        post("/icc4/roller/del", {
            id: data.id
        }).then(res => {
            customMessage({
                type: "success",
                content: "删除成功",
                duration: 1000
            })
            getRoller()
        })
    })
}
</script>

<template>
    <div class="equipmentInfo-index">
        <div class="equipmentInfo-part1">
            <div class="equipmentInfo-part1-title">
                RTK
            </div>
            <div class="equipmentInfo-part1-line"></div>
            <div class="equipmentInfo-part1-index">
                
                <div v-for="data in rtkList" :key="data.id">
                    <img src="@/assets/images/equipmentBind-work0.png" v-if="data.online == 0">
                    <img src="@/assets/images/equipmentBind-work1.png" v-if="data.online == 1">
                    <div>
                        {{ data.number }}
                    </div>
                </div>
            
            </div>
        </div>
        
        <div class="equipmentInfo-part1">
            <div class="equipmentInfo-part1-title">
                振动模块
            </div>
            <div class="equipmentInfo-part1-line"></div>
            <div class="equipmentInfo-part1-index">
                
                <div v-for="data in vibrateList" :key="data.id">
                    <img src="@/assets/images/equipmentBind-work0.png" v-if="data.online == 0">
                    <img src="@/assets/images/equipmentBind-work1.png" v-if="data.online == 1">
                    <div>
                        {{ data.number }}
                    </div>
                </div>
            
            </div>
        </div>
        
        <div class="equipmentInfo-part2">
            <div class="equipmentInfo-part2-title">
                <div>压路机</div>
                <div class="equipmentInfo-part2-title-button" @click="addRoller()">
                    <div>
                        添加
                    </div>
                    <el-icon>
                        <CirclePlus/>
                    </el-icon>
                </div>
            </div>
            <div class="equipmentInfo-part2-line"></div>
            <div class="equipmentInfo-part2-index">
                
                <div v-for="data in rollerList" :key="data.id" class="equipmentInfo-part2-index-row">
                    <div>
                        <img src="@/assets/images/equipmentBind-work0.png" v-if="data.online == 0">
                        <img src="@/assets/images/equipmentBind-work1.png" v-if="data.online == 1">
                        <div>
                            {{ data.number }}
                        </div>
                    </div>
                    <div>
                        碾压轮宽度：{{ data.rollingWheelWidth }}m
                    </div>
                    <div>
                        强振起振力：{{ data.strongVibratingStartingForce }}KN
                    </div>
                    <div>
                        弱振起振力：{{ data.weakVibrationStartingForce }}KN
                    </div>
                    <div>
                        桁架质量：{{ data.trussMass }}Kg
                    </div>
                    <div>
                        碾压轮质量：{{ data.rollingWheelMass }}Kg
                    </div>
                    <div>
                        强振频率：{{ data.strongVibratingFrequency }}Hz
                    </div>
                    <div>
                        弱振频率：{{ data.weakVibratingFrequency }}Hz
                    </div>
                    <div>
                        压路机高度：{{ data.rollerHigh }}m
                    </div>
                    <el-button type="primary" @click="editRoller(data)">
                        编辑
                    </el-button>
                    <el-button type="danger" @click="delRoller(data)">
                        删除
                    </el-button>
                </div>
            
            </div>
        </div>
        
        <custom-form :dialogVisible="dialogVisible" :customFormTitle="customFormTitle" :customSubmitType="customSubmitType"
                     :customFormModel="customFormModel"
                     :customFormRules="customFormRules" :customFormItemArr="customFormItemArr"
                     @closeDialog="closeDialog" @submitForm="submitForm"></custom-form>
    </div>
</template>

<style scoped lang="less">
.equipmentInfo-index {
    width: 100%;
    padding: 0.24rem;
    
    .equipmentInfo-part1 {
        width: 100%;
        margin-bottom: 0.25rem;
        
        &-title {
            width: 5rem;
            height: 0.36rem;
            padding: 0 0.1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            color: #FFF;
            font-size: 0.17rem;
            font-weight: 600;
            border-left: 0.01rem solid #4489FE;
            background: linear-gradient(90deg, rgba(68, 137, 254, 0.32) 0%, rgba(68, 137, 254, 0.00) 100%);
        }
        
        &-line {
            width: 100%;
            height: 0.01rem;
            background: rgba(68, 137, 254, 0.25);
        }
        
        &-index {
            width: 100%;
            margin-top: 0.24rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            
            > div {
                width: auto;
                height: auto;
                margin-right: 0.24rem;
                margin-bottom: 0.28rem;
                padding: 0.1rem 0.16rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 0.02rem;
                background: #14324D;
                
                > img {
                    width: 0.12rem;
                }
                
                > div {
                    margin-left: 0.1rem;
                    word-break: keep-all;
                    color: #FFF;
                    font-size: 0.15rem;
                    font-weight: 500;
                }
            }
        }
    }
    
    .equipmentInfo-part2 {
        width: 100%;
        margin-bottom: 0.25rem;
        
        &-title {
            width: 5rem;
            height: 0.36rem;
            padding: 0 0.1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            color: #FFF;
            font-size: 0.17rem;
            font-weight: 600;
            border-left: 0.01rem solid #4489FE;
            background: linear-gradient(90deg, rgba(68, 137, 254, 0.32) 0%, rgba(68, 137, 254, 0.00) 100%);
            
            &-button {
                margin-left: 0.24rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color: #4489FE;
                font-size: 0.17rem;
                font-weight: 400;
                
                .el-icon {
                    margin-left: 0.07rem
                }
            }
        }
        
        &-line {
            width: 100%;
            height: 0.01rem;
            background: rgba(68, 137, 254, 0.25);
        }
        
        &-index {
            width: 100%;
            margin-top: 0.24rem;
            
            &-row {
                width: 100%;
                margin-bottom: 0.28rem;
                font-size: 0.15rem;
                word-break: keep-all;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                
                > div:first-child {
                    width: auto;
                    height: auto;
                    padding: 0.1rem 0.16rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.02rem;
                    background: #14324D;
                    
                    > img {
                        width: 0.12rem;
                    }
                    
                    > div {
                        margin-left: 0.1rem;
                        word-break: keep-all;
                        color: #FFF;
                        font-size: 0.15rem;
                        font-weight: 500;
                    }
                }
                
                > div:not(:first-child) {
                    margin-left: 0.04rem;
                    width: auto;
                    height: auto;
                    padding: 0.1rem 0.16rem;
                    color: rgba(255, 255, 255, 0.50);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.02rem;
                    background: #14324D;
                }
                
                > div:nth-child(2) {
                    margin-left: 0.12rem;
                }
                
                :deep(.el-button) {
                    width: auto;
                    height: auto;
                    font-size: 0.15rem;
                    padding: 0.1rem 0.2rem;
                    margin-left: 0.12rem;
                    outline: none;
                    border: none;
                    border-radius: 0.02rem;
                }
                
                :deep(.el-button-primary) {
                    background: linear-gradient(180deg, #024466 0%, #4489FE 0.01%, #2262D0 100%)
                }
                
                :deep(.el-button--danger) {
                    background: linear-gradient(180deg, #EB5757 0%, #C93131 100%)
                }
            }
        }
    }
}
</style>
