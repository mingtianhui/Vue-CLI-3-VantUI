/**
* Created For: 404错误模块
* Author: Mason.
* Date: 2019/01/15 17:36.
*/
<template>
    <div class="error-page">
        <div class="not-found"></div>
        <p class="error-text">出错啦！您访问的页面没找着！</p>
        <button type="button" class="act-btn" @click="$router.go(-1)">返回</button>
    </div>
</template>

<script>
    export default {
        name: 'NotFoundComponent',
        data () {
            return {}
        },
        methods: {
            goHome () {
                this.$router.replace({ name: 'index' })
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../less/error.less";
</style>
