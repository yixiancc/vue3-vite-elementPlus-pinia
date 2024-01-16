<script setup>
import { inject, ref } from "vue"
import customForm from "@/components/customForm/index.vue"

const post = inject("$post")

const equipmentBindTableRef = ref(null)
const equipmentBindTableData = ref([])
const equipmentBindTablePage = ref(1)
const equipmentBindTableSize = ref(10)
const equipmentBindTableTotal = ref(0)

getProjectList()

function getProjectList() {
    post("/icc4/projectRollerInfo/listPageProjectFirst", {
        size: equipmentBindTableSize.value,
        current: equipmentBindTablePage.value,
        param: {
            companyId: localStorage.getItem("companyId")
        }
    }).then(res => {
        res.records.forEach(data => {
            data.hasChildren = true
            equipmentBindTableRef.value.toggleRowExpansion(data)
        })
        equipmentBindTableData.value = res.records
    })
}

function pageSizeChange() {
    equipmentBindTablePage.value = 1
    getProjectList()
}

function pageChange() {
    getProjectList()
}

function loadChidren(row, treeNode, resolve) {
    post("/icc4/projectRollerInfo/listPage", {
        size: 9999,
        current: 1,
        param: {
            companyId: localStorage.getItem("companyId"),
            projectId: row.projectId
        }
    }).then(res => {
        let arr = res.records
        arr = arr.filter(data => row.id != data.id)
        resolve(arr)
    })
}

import { ElMessageBox } from "element-plus"

function delTableData(row) {
    ElMessageBox.confirm(
        "确认删除？",
        "提示",
        {
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            "show-close": false,
            "close-on-click-modal": false,
            "close-on-press-escape": false
        }
    ).then(() => {
        post("/icc4/projectRollerInfo/del", {
            id: row.id
        }).then(res => {
            getProjectList()
        })
    })
}

const dialogVisible = ref(false)
const customSubmitType = ref(1)
const customFormModel = ref({
    projectId: "",
    rollerId: "",
    rtkId: "",
    vibrateId: ""
})
const customFormRules = ref({
    projectId: [
        { required: true, message: "请选择项目名称", trigger: "blur" }
    ],
    rollerId: [
        { required: true, message: "请选择压路机编号", trigger: "blur" }
    ],
    rtkId: [
        { required: true, message: "请选择RTK", trigger: "blur" }
    ],
    vibrateId: [
        { required: true, message: "请选择振动模块", trigger: "blur" }
    ]
})
const customFormItemArr = ref([
    {
        label: "项目名称",
        prop: "projectId",
        type: "select",
        placeholder: "请选择项目名称",
        disabled: false,
        optionsArr: [],
        optionsKey: "id",
        optionsLabel: "name",
        optionsValue: "id"
    },
    {
        label: "压路机编号",
        prop: "rollerId",
        type: "select",
        placeholder: "请选择压路机编号",
        disabled: false,
        optionsArr: [],
        optionsKey: "id",
        optionsLabel: "number",
        optionsValue: "id"
    },
    {
        label: "RTK",
        prop: "rtkId",
        type: "select",
        placeholder: "请选择RTK",
        disabled: false,
        optionsArr: [],
        optionsKey: "id",
        optionsLabel: "name",
        optionsValue: "id"
    },
    {
        label: "振动模块",
        prop: "vibrateId",
        type: "select",
        placeholder: "请选择振动模块",
        disabled: false,
        optionsArr: [],
        optionsKey: "id",
        optionsLabel: "name",
        optionsValue: "id"
    }
])

getOptionsArr()

function getOptionsArr() {
    post("/icc4/companyProject/listPage", {
        size: 9999,
        current: 1,
        param: {
            companyId: localStorage.getItem("companyId")
        }
    }).then(res => {
        customFormItemArr.value[0].optionsArr = res.records
    })
    
    post("/icc4/roller/list", {
        companyId: localStorage.getItem("companyId")
    }).then(res => {
        customFormItemArr.value[1].optionsArr = res
    })
    
    post("/icc4/equipment/listByType", {
        companyId: localStorage.getItem("companyId")
    }).then(res => {
        let arr = res
        arr.forEach(data => {
            if (data.type == 1) {
                customFormItemArr.value[2].optionsArr = data.list
            } else if (data.type == 2) {
                customFormItemArr.value[3].optionsArr = data.list
            }
        })
    })
}

function editTableData(row) {
    customFormModel.value.id = row.id
    customFormModel.value.projectId = row.projectId
    customFormModel.value.rollerId = row.rollerId
    customFormModel.value.rtkId = row.rtkId
    customFormModel.value.vibrateId = row.vibrateId
    customSubmitType.value = 2
    dialogVisible.value = true
}

function addBind() {
    customSubmitType.value = 1
    dialogVisible.value = true
}

function closeDialog() {
    dialogVisible.value = false
}

function submitForm(obj, type) {
    let url = ""
    if (type == 1) {
        url = ""
    } else if (type == 2) {
        url = ""
    }
    post(url, obj).then(res => {
        dialogVisible.value = false
        getProjectList()
    })
}
</script>

<template>
    <div class="equipmentBind-index">
        <div class="equipmentBind-search">
            <div class="equipmentBind-search-button">
                <el-button class="customize-button-class" @click="addBind()">
                    <div>
                        添加绑定
                    </div>
                    <div class="equipmentBind-search-button-icon">
                        <el-icon>
                            <CirclePlus/>
                        </el-icon>
                    </div>
                </el-button>
            </div>
        </div>
        
        <div class="equipmentBind-table">
            <el-table ref="equipmentBindTableRef" :data="equipmentBindTableData" max-height="500px" row-key="id" lazy
                      :load="loadChidren"
                      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="projectName" label="项目名称"/>
                <el-table-column prop="rollerNumber" label="压路机编号"/>
                <el-table-column prop="rtkNumber" label="RTK"/>
                <el-table-column prop="vibrateNumber" label="振动模块"/>
                <el-table-column label="状态">
                    <template #default="{row}">
                        <div class="tableOperationClass" v-if="row.online == 0">
                            <img src="@/assets/images/equipmentBind-work0.png">
                            <div>
                                未工作
                            </div>
                        </div>
                        
                        <div class="tableOperationClass" v-if="row.online == 1">
                            <img src="@/assets/images/equipmentBind-work1.png">
                            <div>
                                工作中...
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{row}">
                        <div class="tableOperationClass">
                            <el-button type="primary" @click="editTableData(row)">
                                编辑
                            </el-button>
                            <el-button type="danger" @click="delTableData(row)">
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <div class="equipmentBind-page">
            <el-pagination
                v-model:current-page="equipmentBindTablePage"
                v-model:page-size="equipmentBindTableSize"
                :page-sizes="[10, 20, 50, 100]"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="equipmentBindTableTotal"
                @size-change="pageSizeChange"
                @current-change="pageChange"
            />
        </div>
        
        <custom-form :dialogVisible="dialogVisible" :customSubmitType="customSubmitType"
                     :customFormModel="customFormModel"
                     :customFormRules="customFormRules" :customFormItemArr="customFormItemArr"
                     @closeDialog="closeDialog" @submitForm="submitForm"></custom-form>
    </div>
</template>

<style scoped lang="less">
.tableOperationClass {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    > img {
        width: 0.12rem
    }
    
    > div {
        margin-left: 0.06rem;
        font-size: 0.15rem;
        font-weight: 500;
    }
}

.equipmentBind-index {
    width: 100%;
    padding: 0.24rem;
    
    .equipmentBind-search {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        
        &-input {
            width: 3.8rem;
            
            :deep(.el-input--small) {
                display: block;
                
                .el-input__wrapper {
                    width: 100%;
                    border-radius: 0.01rem;
                    border: 0.01rem solid #2262D0;
                    background: rgba(68, 137, 254, 0.15);
                    outline: none;
                    box-shadow: none;
                    
                    .el-input__prefix {
                        font-size: 0.15rem;
                        color: #fff;
                        
                        .el-icon {
                            top: 0.01rem;
                        }
                    }
                    
                    .el-input__suffix {
                        font-size: 0.15rem;
                        color: #fff;
                        
                        .el-icon {
                            top: 0.01rem;
                        }
                    }
                    
                    .el-input__inner {
                        height: 0.38rem;
                        font-size: 0.15rem;
                        color: #fff;
                    }
                }
            }
        }
        
        &-button {
            width: 1.4rem;
            height: 0.42rem;
            font-size: 0.16rem;
            
            &-icon {
                margin-left: 0.08rem;
            }
        }
    }
    
    .equipmentBind-table {
        width: 100%;
        margin-top: 30px;
        
        :deep(.el-table) {
            width: 100%;
        }
    }
    
    .equipmentBind-page {
        width: 100%;
        margin-top: 0.2rem
    }
}
</style>
