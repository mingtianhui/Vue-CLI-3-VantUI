/**
*Created For: 内部弹框
*Author:Mason
*Date:2019/1/17
*/
<template>
    <van-popup :overlay="mask" ref="popup" :position="position" v-show="isShow" @click="toastClick">
        <div :class="['d-absolute-wrapper',!isCenter ? 'position' : '']" :style="styleText">
            <span :class="['d-absolute']">
                <p :style="pStyle">{{txt}}</p>
            </span>
        </div>
    </van-popup>
</template>

<script>
    export default {
        name: 'ToastNew',
        props: {
            // 是否显示遮盖层
            mask: {
                type: Boolean,
                default: false
            },
            // toast显示内容
            txt: {
                type: String,
                default: ''
            },
            allowClose: { // 是否可以主动关闭按钮
                type: Boolean,
                default: false
            },
            time: { // 默认消失时间
                type: Number,
                default: 2000
            },
            // 定位
            top: {
                type: [String, Number],
                default: ''
            },
            bottom: {
                type: [String, Number],
                default: ''
            },
            // 关闭后的回调
            callback: {
                type: Function,
                default: function () { return false }
            },
            pStyle: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                isShow: false,
                timer: null // 关闭定时器
            }
        },
        watch: {},
        computed: {
            // 是否居中显示
            isCenter () {
                return this.top === '' && this.bottom === ''
            },
            // 显示位置
            position () {
                if (this.top !== '') {
                    return 'top'
                } else if (this.bottom !== '') {
                    return 'bottom'
                } else {
                    return 'center'
                }
            },
            styleText () {
                if (!this.isCenter) {
                    let per = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 750
                    if (this.top !== '') {
                        return {
                            top: this.top * per + 'px'
                        }
                    } else if (this.bottom !== '') {
                        return {
                            bottom: this.bottom * per + 'px'
                        }
                    } else {
                        return ''
                    }
                } else {
                    return ''
                }
            }
        },
        mounted () {},
        components: {},
        methods: {
            show () {
                this.isShow = true
                this.clearTimer()
                this.$nextTick(() => {
                    // 设置定时
                    this.setToastTimer()
                })
            },
            hide () {
                this.isShow = false
                if (this.timer) {
                    this.clearTimer()
                }
                this.callback()
            },
            setToastTimer () {
                let self = this
                this.timer = setTimeout(() => {
                    self.hide()
                }, this.time)
            },
            // 点击关闭
            toastClick () {
                if (this.allowClose) {
                    this.hide()
                }
            },
            // 删除定时器
            clearTimer () {
                clearTimeout(this.timer)
                this.timer = null
            }
        }
    }
</script>

<style scoped lang="less">
    .d-absolute-wrapper{
        text-align: center;
        width: 670px;
        &.position{
            position: fixed;
            left: 50%;
            transform: translate(-50%,0);
        }
    }
    .d-absolute{
        max-width: 670px;
        box-sizing: border-box;
        font-size: 28px;
        text-align: center;
        line-height: 30px;
        padding: 15px 28px;
        background: rgba(0,0,0,0.6);
        color: #fff;
        border-radius: 6px;
        // 当不是默认居中对齐时

    }
</style>
