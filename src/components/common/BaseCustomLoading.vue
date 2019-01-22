/**
* Created For: 自定义样式加载组件
* Author: Mason.
* Date: 2019/01/18 19:09.
*/
<template>
    <div>
        <div class="mask" v-if="isMask"></div>
        <div :class="['custom-loading',isFix ? 'fix-loading':'']">
            <div class="gif-box"><span></span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'customLoading',
        components: {},
        props: {
            content: {
                type: String,
                default () {
                    return '加载中…'
                }
            },
            // 是否全屏显示加载
            isFix: {
                type: Boolean,
                default: true
            },
            // 是否显示遮盖层
            isMask: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {}
        },
        computed: {},
        beforeMount () {
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    @import "../../less/base/base";
    .custom-loading {
        width: 140px;
        height: 140px;
        display: inline-block;
        background-color: @color-white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        .mixin-center;
        overflow: hidden;
        &.fix-loading {
            position: absolute;
            z-index: 99;
        }
        // 转圈动画
        .gif-box {
            width: 80px;
            height: 80px;
            background: url("../../assets/images/img/loading.gif") no-repeat center;
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -40px;
            margin-left: -40px;
        }
    }

    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(255, 255, 255, .5);
        z-index: 98;
    }
</style>
