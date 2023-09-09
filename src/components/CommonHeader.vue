<template>
    <div class="h-container">
        <div class="l-content">
            <el-button
                @click="isCollapse"
                icon="el-icon-menu"
                size="mini"
                style="margin-right: 20px;"
            ></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item
                    v-for="i in tags"
                    :key="i.path"
                    :to="{ path: i.path }"
                >{{ i.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/微信图片_20230723161030.jpg" alt />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="layout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from 'js-cookie'
export default {
    data() {
        return {};
    },
    methods: {
        isCollapse() {
            this.$store.commit("isCollapse");
        },
        handleCommand(command){
            if (command==='layout') {
                Cookie.remove('token')
                Cookie.remove('dataes')
                this.$router.push('/login')
            }
        }
    },
    computed: {
        ...mapState({
            tags: (state) => state.tab.tabsList,
        }),
    },
};
</script>

<style lang="less" scoped>
.h-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
        font-size: 14px;
        color: #fff;
        margin-left: 10px;
    }
    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content {
        display: flex;
        align-items: center;
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                &.is-link {
                    font-weight: normal;
                    color: #666;
                }
            }
            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }
}
</style>