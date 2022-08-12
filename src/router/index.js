// 该文件用于配置路由
import Vue from 'vue';
// 引入插件
import VueRouter from 'vue-router'
// 使用插件	
Vue.use(VueRouter);

// 引入store
import store from '@/store';

import routes from './routes';
// 重写push和replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// location:往哪里跳转、携带什么参数
// resolve:成功的回调函数
// reject:失败的回调函数
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
};
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}

// 配置路由
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})
router.beforeEach(async(to, form, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;


    if (token) {
        // 已登录
        // 登录不能去login
        if (to.path == '/login') {
            next('/home');
        } else {
            // 已登录去其他路由
            // 如果用户信息存在
            if (name) {
                next();
            } else {
                // 用户信息不存在
                try {
                    //当刷新页面用户信息就没了 再派发一次获取用户信息请求 
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // 这是token失效的情况  重新登录
                    await store.dispatch('logout');
                    next('/login');
                }
            }
        }
    } else {
        // 未登录
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1 || to.path.indexOf('/shopCart') != -1) {
            next('/login?redirect=' + to.path);
        } else {
            next();
        }
    }

})
export default router