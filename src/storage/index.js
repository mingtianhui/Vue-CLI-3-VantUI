import Vue from 'vue'
import Vuex from 'vuex'
import localSt from './modules/localStorage'
import AxiosControl from './modules/AxiosControl'
// 用户相关
import user from './modules/user'
import { userAgentType } from '../utils/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', // 非生产环境使用严格模式
    state: {
        // 手机系统类型：android，ios 或者 ''
        UserAgent: userAgentType()
    },
    mutations: {},
    actions: {},
    modules: {
        user,
        localSt,
        AxiosControl
    }
})
/*
* Vuex 支持在开发过程中热重载 mutation、module、action 和 getter
* */
if (module.hot) {
    console.log(module.hot)
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./modules/localStorage', './modules/AxiosControl', './modules/user'], () => {
        // 获取更新后的模块
        // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
        const localStorage = require('./modules/localStorage').default
        const AxiosControl = require('./modules/AxiosControl').default
        const user = require('./modules/user').default
        // 加载新模块
        store.hotUpdate({
            modules: {
                localStorage: localStorage,
                AxiosControl: AxiosControl,
                user: user
            }
        })
    })
}

export default store
