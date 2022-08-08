import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'

import { Button,Swipe, SwipeItem,Lazyload,Popup } from 'vant';
import VueLazyload from 'vue-lazyload'
Vue.use(Button);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Popup);
Vue.use(VueLazyload);

//注册仓库功能
import store from './store';

//跑马灯（广播消息轮播组件）
import VueMarquee from 'vue-marquee-component-fix';
Vue.use(VueMarquee);



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
  router,
  //下面的代码作用:给项目添加仓库功能,主要的作用是给全部VC拥有一个$store属性
  store,

  
}).$mount('#app')
