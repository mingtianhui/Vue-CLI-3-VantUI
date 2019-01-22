/**
* Created For: 用户登录
* Author: chenLiYan.
* Date: 2018/11/28 0028 17:56.
*/
<template>
    <div class="login-page">
        {{$route.meta.title}}{{dayjs}}
        <!--加载中-->
        <base-custom-loading v-if="loading" :isMask="true"></base-custom-loading>
    </div>
</template>

<script>
    export default {
        name: 'login',
        components: { },
        props: {},
        data () {
            return {
                dayjs: this.$dayjs(new Date()).format('YYYY-MM-DD-HH:mm:ss'),
                loading: true
            }
        },
        computed: {},
        beforeMount () {
        },
        methods: {}
    }
</script>

<style lang="less" scoped></style>
