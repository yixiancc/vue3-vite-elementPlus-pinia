<script setup>

</script>

<template>
    <div class="equipmentInfo-index">
        <div class="equipmentInfo-part1">
            <div class="equipmentInfo-part1-title">
                RTK
            </div>
            <div class="equipmentInfo-part1-line"></div>
            <div class="equipmentInfo-part1-index">
                
                <div v-for="data in 20">
                    <img src="@/assets/images/equipmentBind-work0.png">
                    <div>
                        此处是编号
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
                
                <div v-for="data in 20">
                    <img src="@/assets/images/equipmentBind-work0.png">
                    <div>
                        此处是编号
                    </div>
                </div>
            
            </div>
        </div>
        
        <div class="equipmentInfo-part2">
            <div class="equipmentInfo-part2-title">
                <div>压路机</div>
                <div class="equipmentInfo-part2-title-button">
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
                
                <div v-for="data in 5" class="equipmentInfo-part2-index-row">
                    <div>
                        <img src="@/assets/images/equipmentBind-work0.png">
                        <div>
                            此处是编号
                        </div>
                    </div>
                    <div>
                        碾压轮宽度：2m
                    </div>
                    <div>
                        强振起振力：10KN
                    </div>
                    <div>
                        弱振起振力：1KN
                    </div>
                    <div>
                        桁架质量：100Kg
                    </div>
                    <div>
                        碾压轮质量：50Kg
                    </div>
                    <div>
                        强振频率：20Hz
                    </div>
                    <div>
                        弱振频率：2Hz
                    </div>
                    <div>
                        压路机高度：3m
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.equipmentInfo-index {
    width: 100%;
    padding: 0.24rem;
    
    .equipmentInfo-part1 {
        width: 100%;
        margin-bottom: 25px;
        
        &-title {
            width: 500px;
            height: 36px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            color: #FFF;
            font-size: 17px;
            font-weight: 600;
            border-left: 1px solid #4489FE;
            background: linear-gradient(90deg, rgba(68, 137, 254, 0.32) 0%, rgba(68, 137, 254, 0.00) 100%);
        }
        
        &-line {
            width: 100%;
            height: 1px;
            background: rgba(68, 137, 254, 0.25);
        }
        
        &-index {
            width: 100%;
            margin-top: 24px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            
            > div {
                width: auto;
                height: auto;
                margin-right: 24px;
                margin-bottom: 28px;
                padding: 10px 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 2px;
                background: #14324D;
                
                > img {
                    width: 12px;
                }
                
                > div {
                    margin-left: 10px;
                    word-break: keep-all;
                    color: #FFF;
                    font-size: 15px;
                    font-weight: 500;
                }
            }
        }
    }
    
    .equipmentInfo-part2 {
        width: 100%;
        margin-bottom: 25px;
        
        &-title {
            width: 500px;
            height: 36px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            color: #FFF;
            font-size: 17px;
            font-weight: 600;
            border-left: 1px solid #4489FE;
            background: linear-gradient(90deg, rgba(68, 137, 254, 0.32) 0%, rgba(68, 137, 254, 0.00) 100%);
            
            &-button {
                margin-left: 24px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color: #4489FE;
                font-size: 17px;
                font-weight: 400;
                
                .el-icon {
                    margin-left: 7px
                }
            }
        }
        
        &-line {
            width: 100%;
            height: 1px;
            background: rgba(68, 137, 254, 0.25);
        }
        
        &-index {
            width: 100%;
            margin-top: 24px;
            
            &-row {
                width: 100%;
                margin-bottom: 28px;
                font-size: 15px;
                word-break: keep-all;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                
                > div:first-child {
                    width: auto;
                    height: auto;
                    padding: 10px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 2px;
                    background: #14324D;
                    
                    > img {
                        width: 12px;
                    }
                    
                    > div {
                        margin-left: 10px;
                        word-break: keep-all;
                        color: #FFF;
                        font-size: 15px;
                        font-weight: 500;
                    }
                }
                
                > div:not(:first-child) {
                    margin-left: 4px;
                    width: auto;
                    height: auto;
                    padding: 10px 16px;
                    color: rgba(255, 255, 255, 0.50);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 2px;
                    background: #14324D;
                }
                
                >div:nth-child(2){
                    margin-left: 12px;
                }
            }
        }
    }
}
</style>
