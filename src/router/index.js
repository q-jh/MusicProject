//配置路由
//第一步：引入插件、安装插件
import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
//引入路由相关的配置项
import routes from './routes'

//引入仓库
// import store from '@/store'
//把人家原型对象的push方法进行保存
// let originPush = VueRouter.prototype.push;
// let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
// VueRouter.prototype.push = function (location, resolve, reject) {
//     //当前函数this：即为VueRouter类的实例
//     //相当于push方法里面this，是windows【完犊子了】
//     //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

//     //面试:函数apply与call区别?
//     //相同的地方:都可以篡改函数里面this
//     //不同的地方:apply传递参数 数组  call传递参数 逗号分割

//     if (resolve && reject) {
//         //代表真:代表着两个形参接受参数【箭头函数】
//         originPush.call(this, location, resolve, reject);
//     } else {
//         originPush.call(this, location, () => { }, () => { });
//     }
// }


// VueRouter.prototype.replace = function (location, resolve, reject) {
//     if (resolve && reject) {
//         //代表真:代表着两个形参接受参数【箭头函数】
//         originReplace.call(this, location, resolve, reject);
//     } else {
//         originReplace.call(this, location, () => { }, () => { });
//     }
// }

//第二步:暴露VueRouter类的实例
//对外暴露一个路由器,实质是VueRouter类的实例,一个路由器可以管理多个路由
const router = new VueRouter({
    //配置路由
    routes,
    //设置滚动条的位置
    // scrollBehavior() {
        //滚动行为这个函数,需要有返回值,返回值为一个对象。
        //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
        // return { y: 0 };
    // }
});

export default router;