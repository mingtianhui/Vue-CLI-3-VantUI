<template>
    <div class="page-home">
        <form action="/">
            <van-search
                v-model='searchInputValue'
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </form>
        <input type="search" :value="searchVal | toFixed" title=""/>
        基础路径：{{publicPath}}
        demo：{{blogTitle}}
        <van-button type="primary" @click="$router.push({name:'cart'})">{{ msg }}</van-button>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
                msg: '购物车',
                searchInputValue: '',
                publicPath: process.env.BASE_URL,
                blogTitle: '你好',
                searchVal: 1
            }
        },
        watch: {
            // 用于搜索联想
            searchInputValue: {
                handler: 'searchSuggest', // 使用函数字面量方法调用，化简watchers
                immediate: true // 创建数组时立马执行一次
            }
        },
        mounted () {
            console.log(this.$el)
        },
        methods: {
            searchSuggest () {
                console.log('使用函数字面量方法调用，化简watchers')
            },
            goConsolePage () {
                // 跳转到console页面 没有路由
                window.location.href = location.href + 'console.html'
            },
            onSearch () {}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import "../../less/base/base.less";
</style>
