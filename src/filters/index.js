/*
* 全局过滤器
* @author Mson
* */
/* 数字保留两位小数 */
export function toFixed (val) {
    return val.toFixed(2)
}

/* 用户名校验 */
export function isValidUsername (str) {
    const reg = /^[a-z]\w{5,31}$/
    return reg.test(str)
}

/**
 * 校验 email
 * @param email
 * @returns {boolean}
 */
export function validateEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}
