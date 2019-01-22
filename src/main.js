import Vue from 'vue'
import './plugins/vant-ui' // 注册使用cube-ui
import App from './App.vue'
import 'amfe-flexible' // 移动端屏幕适配
import router from './router' // 路由相关
import store from './storage/index' // vuex
import dayjs from 'dayjs' // 日期插件
import { normalize, schema } from 'normalizr' // 扁平化数据

/*
* import导出指定的资源
* import * as filters from './filters'导出多个过滤器
* */
import * as filters from './filters' // 全局过滤器
import './components/common/global' // 通过webpack的require.context  全局注册组件 在组件中直接使用

/*
* 注册过滤器
* 过滤器只能用在双花括号插值和v-bind表达式
* */
// 通过import导出指定的资源时注册
// Vue.filter('toFixed', filters)

// 通过import * as filters from './filters'导出多个过滤器时需要这要注册
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

/*
* 全局注册自定义指令
* 用法<input type="search" v-focus />
* 输入框获取光标
* */
Vue.directive('focus', {
    inserted: function (el, obj) {
        if (obj.value !== false) {
            el.focus()
        }
    }
})

/*
* Normalizr是一个开源的工具，可以将上面的深层嵌套的 JSON 对象通过定义好的 schema 转变成使用 id 作为字典的实体表示的对象。
* */
const originalData = {
    success: true,
    message: '没有错误',
    data: [
        {
            id: 324,
            user: {
                id: 2,
                name: 'Tami'
            }
        }, {
            id: 222,
            user: {
                id: 3,
                name: 'Maon'
            }
        }
    ]
}
const success = new schema.Entity('success')
const message = new schema.Entity('message')
const datas = new schema.Entity('data', {
    success: success,
    message: message
})
const article = new schema.Entity('articles', {
    user: [datas]
})
const normalizedData = normalize(originalData, article)
console.log(normalizedData)

/*
* dayjs 时间插件 支持链式操作
* 在组件中用法：
* this.$dayjs(new Date()).format('YYYY-MM-DD-HH:mm:ss')
* 2019-01-18 14:42:32
* */
Vue.prototype.$dayjs = dayjs
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

/*
* 全局注册返回方法
* */
Vue.prototype.$goBack = function () {
    window.history.length > 1 && !!window.history.state
        ? window.GlobalVue.$router.go(-1)
        : window.GlobalVue.$router.push('/')
}

/*
* 阻止 vue 在启动时生成生产提示
* */
Vue.config.productionTip = false

window.GlobalVue = new Vue({
    router,
    store,
    render: h => h(App),
    mounted () {
        document.dispatchEvent(new Event('custom-render-trigger'))
    }
}).$mount('#app')
