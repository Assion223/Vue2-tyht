<template>
    <el-form
        ref="form"
        label-width="70px"
        :model="userForm"
        class="user-form"
        :rules="rules"
        :line="true"
    >
        <h3 class="login-title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" placeholder="请输入你的用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userForm.password" placeholder="请输入你的密码"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 42px;margin-top: 10px;">
            <el-button @click="submit" type="primary" class="login-submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
    data() {
        return {
            userForm: {
                username: "",
                password: "",
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入账户名称",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入你的密码",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.userForm).then(({ data }) => {
                        if (data.code === 20000) {
                            // token信息存入cookie用于不同页面间的通信
                            Cookie.set("token", data.data.token);
                            // 获取菜单的数据，存入store中
                            this.$store.commit("getMenu", data.data.menu);
                            this.$store.commit("addRoute", this.$router);
                            // 跳转到首页
                            this.$router.push("/home");
                        } else {
                            this.$message.error(data.data.message);
                        }
                    });
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.user-form {
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .login-title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }
    .login-submit {
        margin: 10px auto 0px auto;
    }
}
</style>