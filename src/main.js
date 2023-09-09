import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
import './api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addRoute',router)
  }
}).$mount('#app')
