/* // 引入路由组件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/MyOrder';
import GroupOrder from '@/pages/Center/GroupOrder'; */

// 路由懒加载
// const foo = ()=>{
//     return import('@/pages/Home');
// }

// 调用
// {
//     path: '/home',
//     component: foo,
//     meta: { show: true }
// }

// 简写 直接在里面写箭头函数
// {
//     path: '/home',
//     component: ()=>import('@/pages/Home'),
//     meta: { show: true }
// }
export default [{
        path: '/home',
        component: () =>
            import ('@/pages/Home'),
        meta: { show: true }
    }, {
        path: '/login',
        component: () =>
            import ('@/pages/Login'),
        meta: { show: false }
    }, {
        path: '/register',
        component: () =>
            import ('@/pages/Register'),
        meta: { show: false }
    }, {
        name: 'search',
        path: '/search/:keyword?',
        component: () =>
            import ('@/pages/Search'),
        meta: { show: true },
        // props: ($route) => {
        //     return { keyword: $route.params.keyword, k: $route.query.k };
        // }
    },
    {
        // 重定向，当访问路径为/时，页面重定向到首页
        path: '/',
        redirect: '/home',
    },
    {
        path: '/detail/:skuId',
        component: () =>
            import ('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: '/addCartSuccess',
        name: 'addCartSuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/shopCart',
        name: 'shopCart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/trade',
        name: 'trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopCart') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/center',
        name: 'center',
        component: () =>
            import ('@/pages/Center'),
        meta: { show: true },
        children: [{
            path: 'myOrder',
            component: () =>
                import ('@/pages/Center/MyOrder')
        }, {
            path: 'groupOrder',
            component: () =>
                import ('@/pages/Center/GroupOrder')
        }, {
            path: '/center',
            redirect: '/center/myOrder'
        }]
    }
]