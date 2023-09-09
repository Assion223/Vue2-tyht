<template>
    <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <h3>{{ isCollapse?'后台':'Vue通用管理后台' }}</h3>
        <el-menu-item @click="getPath(p)" v-for=" p in noChildren" :key="p.name" :index="p.name">
            <i :class="`el-icon-${p.icon}`"></i>
            <span slot="title">{{ p.label }}</span>
        </el-menu-item>
        <el-submenu v-for=" item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="submit in item.children" :key="submit.name">
                <el-menu-item @click="getPath(submit)" :index="submit.name">{{ submit.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>


<script>
import Cookie from 'js-cookie'
export default {
    data() {
        return {
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        getPath(p) {
            //判断不一致才能跳
            if (
                this.$route.path !== p.path &&
                !(this.$route.path == "/home" && p.path == "/")
            ) {
                this.$router.push(p.path);
            }
            this.$store.commit('selcetMenu',p)
        },
    },
    computed: {
        //判断有无children
        hasChildren() {
            return this.menuaData.filter((item) => item.children);
        },
        noChildren() {
            return this.menuaData.filter((item) => !item.children);
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse;
        },
        menuaData(){
            return  JSON.parse(Cookie.get('dataes')) || this.$store.state.tab.menu
        }
    },
};
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu {
    height: 100vh;
    border: none;
    h3 {
        font-weight: 400;
        line-height: 48px;
        font-size: 16px;
        text-align: center;
        color: aliceblue;
    }
}
</style>