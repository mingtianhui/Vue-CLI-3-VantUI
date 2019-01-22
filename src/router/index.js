import Vue from 'vue'
import Router from 'vue-router'
// import storage from '../storage'
import { AsyncComponent } from '@/utils/asyncComponent'
Vue.use(Router)
let routers = {
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            name: 'notFound',
            component: () => import('@/components/NotFound'),
            meta: {
                title: '404页面',
                noRequiresAuth: true // 无需登录
            }
        },
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '@/views/home/index'),
            meta: {
                title: '阿卡迪亚'
            }
        },
        {
            path: '/sign',
            component: () => import('@/components/TransferRouter'),
            children: [
                {
                    path: '',
                    name: 'login',
                    component: () => AsyncComponent(import('@/views/sign/Login')),
                    meta: {
                        title: '登录页',
                        noRequiresAuth: true // 无需登录
                    }
                }
            ]
        },
        {
            path: '/goods',
            component: () => import('@/components/TransferRouter'),
            children: [
                {
                    path: '',
                    name: 'goodsDetail',
                    component: () => AsyncComponent(import('@/views/goods/GoodsDetail')),
                    meta: {
                        title: '商品详情页'
                    }
                }
            ]
        },
        {
            path: '/cart',
            component: () => import('@/components/TransferRouter'),
            children: [
                {
                    path: '',
                    name: 'cart',
                    component: () => AsyncComponent(import('@/views/cart/MyCart')),
                    meta: {
                        title: '购物车页'
                    }
                }
            ]
        }
    ]
}
const router = new Router(routers)
// router.beforeEach((to, from, next) => {
//     // 判断是否已登录，已登录的获取下当前用户基本信息
//     if(storage.getters.IsLogin){
//         storage.dispatch("GetUserInfo")
//     }
//     // 不需要登录
//     if (to.matched.some(record => record.meta.noRequiresAuth)) {
//         next()  // 确保一定要调用 next()
//     } else {
//         // 当需要进行 导航守卫 时
//         // 判断是否登录（通过本地token），已登录则可正常打开，未登录则退出
//         if ( storage.getters.IsLogin ) {
//             next()
//         } else {
//             next({
//                 name: 'login',
//                 query: { referer: to.name}
//             })
//         }
//     }
// })
export default router
