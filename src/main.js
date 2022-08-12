import Vue from 'vue'
import App from './App.vue'
// 全局引入element-ui
// import ElementUI from 'element-ui';


// 使用ui 全局引入
// Vue.use(ElementUI);

// 按需引入element-ui
import { Button, MessageBox } from 'element-ui';

// 使用ui 按需引入
Vue.component(Button.name, Button);

// 引入ElementUI样式
import 'element-ui/lib/theme-chalk/index.css';


// 三级联动全局组件
import TypeNav from '@/components/TypeNav';
// 轮播图全局组件
import Carousel from '@/components/Carousel';
// 分页全局组件
import Pagination from '@/components/Pagination';
// 注册全局组件 第一个参数是组件的名字，第二个参数是哪个组件
Vue.component(TypeNav.name, TypeNav);
// 注册轮播图全局组件
Vue.component(Carousel.name, Carousel);
// 注册分页全局组件
Vue.component(Pagination.name, Pagination);
// 引入路由
import router from '@/router';
Vue.config.productionTip = false
import { reqCategoryList, } from '@/api';
reqCategoryList();

// 引入store
import store from './store';
// 引入mock模块
import '@/mock/mockServer';

// 引入接口api
import * as API from '@/api';
// 引入轮播图样式
import 'swiper/css/swiper.css';

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import defaultIMG from '@/assets/images/defaultIMG.jpg';
Vue.use(VueLazyload, {
    loading: defaultIMG,
})

// 引入表单验证插件
import "@/plugins/validate";

new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
    },
    // 注册路由
    router,
    store,
}).$mount('#app')