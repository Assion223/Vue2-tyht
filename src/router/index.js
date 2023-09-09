import Vue from 'vue';
import VueRouter from "vue-router";
import Home from '@/view/Home';
import Main from '@/view/Main';
import Mall from '@/view/Mall';
import PageOne from '@/view/PageOne';
import PageTwo from '@/view/PageTwo';
import User from '@/view/User';
import Login from '@/view/Login'
import Cookie from 'js-cookie';

Vue.use(VueRouter)



const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/home', //重定向
            name: 'Main',
            component: Main,
            children: []
                // { path: 'user', name: 'user', component: User },//用户管理
                // { path: 'home', name: 'home', component: Home },//首页
                // { path: 'mall', name: 'mall', component: Mall },//商品管理
                // { path: 'pageone', name: 'pageone', component: PageOne },//1
                // { path: 'pagetwo', name: 'pagetwo', component: PageTwo },//2
            
        },
        {
            path: '/Login',
            name: 'login',
            component: Login
        }
    ]
})
router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    } else if (token && to.name == 'login') {
        next('/home')
    } else {

        next()
    }
})
// router.beforeEach((to, from, next) => {
//     const lg = JSON.parse(Cookie.get('dataes')) || this.$store.state.tab.menu
//     lg.forEach(item => {
//         if (item instanceof Array) {
//             item.forEach(p => {
//                 if (item.path) next(item.path)
//             })
//         } else {
//             if (item.path) next(item.path)
//         }
//     })
//     console.log(lg);

// })
export default router