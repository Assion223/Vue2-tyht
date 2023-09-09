<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header></common-header>
                </el-header>
                <common-tag></common-tag>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonTag from '../components/ComminTag.vue'
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from '../components/CommonHeader.vue';
export default {
    name: "Main",
    components: {
        CommonAside,CommonHeader,CommonTag
    },
};
</script>

<style lang="less" scoped>
    .el-header {
        padding: 0;
    }
</style>