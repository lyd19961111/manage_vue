import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

//全局配置
import '@/assets/scss/reset.scss'
import http from '@/api/config'
import './mock'
import echarts from 'echarts'


Vue.use(ElementUI);
Vue.prototype.$http=http
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  store.commit('user/getToken')
  let token=store.state.user.token
  if(!token&& to.name!=='login'){
    next({name:'login'})
  }else{
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('tab/addMenu',router)
  }
}).$mount('#app')
