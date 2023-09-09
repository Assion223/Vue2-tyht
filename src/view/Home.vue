<template>
    <div >
        <el-row>
            <el-col :span="8" style="padding-right: 10px;">
                <el-card class="box-card">
                    <div class="user">
                        <img src="../assets/微信图片_20230723161030.jpg" alt />
                        <div class="user-info">
                            <p class="name">Assion</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="loginfo">
                        <p>
                            上传登录时间：
                            <span>2023-0202</span>
                        </p>
                        <p>
                            上次登录地点：
                            <span>成都</span>
                        </p>
                    </div>
                </el-card>
                <el-card style="margin-top: 20px; height: 350px;">
                    <el-table :data="tableData" style="width: 100%; " max-height="400">
                        <el-table-column
                            v-for="(val,key) in tableList"
                            :key="key"
                            :prop="key"
                            :label="val"
                        ></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16" style="padding-left: 10px;">
                <div class="num">
                    <el-card
                        v-for=" p in countData"
                        :key="p.name"
                        :body-style="{display: 'flex', padding:0}"
                    >
                        <i class="icon" :class="`el-icon-${p.icon}`" :style="{background: p.color}"></i>
                        <div class="detail">
                            <p class="price">${{ p.value }}</p>
                            <p class="desc">{{ p.name }}</p>
                        </div>
                    </el-card>
                </div>
                <el-card style="height: 230px">
                    <div ref="echarts1" style="height: 210px;"></div>
                </el-card>
                <div class="graph">
                    <el-card class="echarts2" style="height: 210px"></el-card>
                    <el-card class="echarts3" style="height: 210px"></el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import { getDate } from "../api/index.js";
import * as echarts from "echarts";

export default {
    name: "Home",
    data() {
        return {
            tableData: [
                {
                    name: "oppo",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                },
                {
                    name: "vivo",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                },
                {
                    name: "苹果",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                },
                {
                    name: "小米",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                },
                {
                    name: "三星",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                },
                {
                    name: "魅族",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                },
            ],
            tableList: {
                name: "课程",
                todayBuy: "今日购买",
                monthBuy: "本月购买",
                totalBuy: "总购买",
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],
        };
    },
    mounted() {
        getDate().then(({ data: { data } }) => {
            this.tableData = data.tableData;
            //折线图
            const echarts1 = echarts.init(this.$refs.echarts1);
            const option1 = {};
            const key =Object.keys(data.orderData.data[0])
            
            option1.xAxis = {
                data: data.orderData.date
            };
            option1.yAxis = {};
            option1.legend = {
                data: key,
            };
            option1.series = [];
            key.forEach((keys) => {
                option1.series.push({
                    name: keys,
                    type: "line",
                    data: data.orderData.data.map((item) => { 
                        return item[keys]}),
                });
            });
            echarts1.setOption(option1);
            //柱状图
            const echarts2=echarts.init(document.querySelector('.echarts2'))
            const option2={
            legend: {
            // 图例文字颜色
            textStyle: {
                color: "#333",
            },},
            grid: {
                left: "20%",
            },
            // 提示框
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category", // 类目轴
                data: data.userData.map((item)=>item.date),
                axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
            },
            axisLabel: {
                interval: 0,
                color: "#333",
            },
            },
            yAxis: [
            {
                type: "value",
                axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
                },
            },
            ],
            color: ["#2ec7c9", "#b6a2de"],
            series: [
                {
                    name:'新增用户',
                    type:'bar',
                    data:data.userData.map((item)=>item.new)
                },
                {
                    name:'活跃用户',
                    type:'bar',
                    data:data.userData.map((item)=>item.active)
                }
            ],
        }
        echarts2.setOption(option2)
         //饼图
        const echarts3=echarts.init(document.querySelector('.echarts3'))
        const option3={
            tooltip: {
            trigger: "item",
            },
            color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
            ],
            series: [
                {
                    type:'pie',
                    data:data.videoData
                }
            ],
        }
        echarts3.setOption(option3)
        });
    },

};
</script>

<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #999;
    display: flex;
    align-items: center;
    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .user-info {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }
        .access {
            color: #999;
        }
    }
}
.loginfo {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999;
        span {
            color: #666;
            margin-left: 60px;
        }
    }
}
.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon {
        width: 80px;
        height: 80px;
        font-style: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }
    .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }
        .desc {
            font-size: 14px;
            text-align: center;
            color: #999;
        }
    }
    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}
.graph {
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    .el-card {
        width: 48%;
    }
}
</style>