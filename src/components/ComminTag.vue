<template>
    <div>
        <div class="tag-group">
            <el-tag
                v-for="(item,index) in tags"
                :key="item.name"
                :type="item.path"
                :closable="item.name !=='home'"
                :effect="$route.name == item.name ? 'dark' : 'plain'"
                @click="changeMenu(item)"
                @close="closeChange(item,index)"
                size="small"
            >{{ item.label }}</el-tag>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name:'CommonTag',
    computed:{
        ...mapState({
            tags:state=>state.tab.tabsList
        })
    },
    methods:{
        ... mapMutations(['closeContent']),
        changeMenu(item){
            this.$router.push({name: item.name})
        },
        closeChange(item,index) {
            this.closeContent(item)
            const length=this.tags.length
            //删除之后的逻辑
            if (item.name !== this.$route.name) {
                return
            }
            //删除最后的
            if ( index ==length ) {
                this.$router.push({name:this.tags[index-1].name})
            }else {
                this.$router.push({name:this.tags[index].name})
            }
            
        }
    }
};
</script>

<style lang="less" scoped>
.tag-group {
    padding: 20px;
    .el-tag {
        margin-right: 15px;
        cursor:pointer
    }
}
</style>