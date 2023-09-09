import Cookie from 'js-cookie'
export default {
    state:{
        isCollapse:false,  //控制是否展示
        tabsList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ],
        menu:[],
    },
    mutations:{
        isCollapse(state){
            state.isCollapse=!state.isCollapse
        },
        selcetMenu(state,val){
            if (val.name !== 'home') {
                const num=state.tabsList.findIndex(item=> item.name ==val.name)
                if (num ===-1) {
                    state.tabsList.push(val)
                }
            }
        },
        closeContent(state,val) {
            const index=state.tabsList.findIndex(item=>item.name==val.name)
            state.tabsList.splice(index,1)
        },
        getMenu(state,val) {
            state.menu=val
            Cookie.set('dataes',JSON.stringify(val)) 
        },
        //动态注册路由
        addRoute(state,router){
            if(!Cookie.get('dataes')) return
            state.menu=JSON.parse(Cookie.get('dataes'))
            const menuArray=[]
            state.menu.forEach(item=>{
                if( item.children) {
                    item.children=item.children.map(p=>{
                        p.component=()=>import(`../view/${p.url}`)
                        return p
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component=()=> import(`../view/${item.url}`)
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item=>{
                router.addRoute('Main', item)
            })
        }
    }
}