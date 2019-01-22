import Vue from 'vue'
import Console from './Console.vue'
import router from './router'
// 对应html中 能够获取<%= htmlWebpackPlugin.options.title %>值，不引用显示不出来
Vue.use(require('vue-wechat-title'))

new Vue({
    router,
    render: h => h(Console)
}).$mount('#console')
