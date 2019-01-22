/**
 * Created For: 用户登录、用户信息相关接口
 * Author: Mason.
 * Date: 2019/01/17 15:15.
 */
import request from '@/utils/request'

// 用户登录
export function login (userName) {
    return request({
        url: '/v1/account/login/username',
        method: 'post',
        data: {
            userName,
            factoryKey: 'yabao'
        }
    })
}

// 根据token获取用户信息
export function getUserInfo () {
    return request({
        url: '/v1/user/me/info',
        method: 'get'
    })
}

// 刷新token
export function refreshToken (refreshToken) {
    return request({
        url: '/v1/account/login/refresh/' + refreshToken,
        method: 'get'
    })
}

// 获取手机验证码
export function asyncSmsCode (mobile, category = 'activate_user') {
    // category 验证码类型: activate_user,reset_password,login
    return request({
        url: '/v1/account/send_sms',
        data: {
            mobile: mobile,
            category: category
        },
        method: 'post'
    })
}

// 重置密码
export function asyncResetPwd (params) {
    // params: mobile,smsCode,newPassword
    return request({
        url: '/v1/account/password/reset',
        data: params,
        method: 'post'
    })
}

// 用户首次登录激活
export function asyncActivateUser (params) {
    // params: mobile,smsCode,newPassword
    return request({
        url: '/v1/account/user/activate',
        data: params,
        method: 'post'
    })
}

// 修改密码
export function asyncUpdatePwd (params) {
    // params: oldPassword,newPassword
    return request({
        url: '/v1/account/password/modify',
        data: params,
        method: 'post'
    })
}

// 退出登录
export function asyncLoginOut () {
    return request({
        url: '/v1/account/login/logout',
        method: 'post'
    })
}
