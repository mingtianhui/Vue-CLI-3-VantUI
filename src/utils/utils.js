/**
 * Created For: 小工具库
 * Author: Mason.
 * Date: 2019/01/18 19:24.
 */
/**
 * 函数防抖，适用于输入- 2018/03/10 By chenLiYan
 */
export function debounce (func, wait, immediate) {
    wait = wait || 300
    // immediate默认为false，是否立即执行
    let timeout = null
    let args = null
    let context = null
    let timestamp = null
    let result = null
    let later = function () {
        // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
        let last = +new Date() - timestamp
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }
    return function () {
        context = this
        args = arguments
        timestamp = +new Date()
        // 第一次调用该方法时，且immediate为true，则调用func函数
        let callNow = immediate && !timeout
        // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }
        return result
    }
}

/* 判断手机系统 */
export function userAgentType () {
    let u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) { // android终端
        return 'android'
    } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) { // ios终端
        return 'ios'
    } else {
        return ''
    }
}
