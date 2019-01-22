/**
 * Created For: axios 接口请求封装
 * Author: Mason.
 * Date: 2018/11/28 0028 15:17.
 */
import axios from 'axios'
import storage from '../storage'
import { refreshToken } from '@/api/auth'

// 用于开发环境输出接口请求日志
// 请求发送时间
let requestTimestamp = null
// 请求响应时间
let responseTimestamp = null

// 创建axios实例
const $appHttps = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? window.location.origin + '/' : process.env.VUE_APP_BASE_API,
    timeout: process.env.VUE_APP_TIMEOUT,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    // `withCredentails`选项表明了是否是跨域请求
    withCredentials: true // default
})
/**
 * 弹出退出登录的提示
 */
const showLoginOut = function () {
    // 清除localStorage信息
    storage.dispatch('LoginOut')
    // 强制提示重新登录
    // window.GlobalVue.$createDialog({
    //     title: '提示',
    //     type: 'alert',
    //     content: `你已被登出，请重新登录！`,
    //     onConfirm: () => {
    //         window.GlobalVue.$router.push({ name: 'login', query: { referer: window.GlobalVue.$route.name } })
    //     }
    // }).show()
}

/**
 * 刷新Token函数
 * @param reqConfig
 * @returns {Promise<any> | Object}
 */
const doRefreshToken = (refreshTokens, reqConfig) => {
    let returnObject = null
    if (refreshTokens) {
        returnObject = refreshToken(refreshTokens).then(res => {
            if (res.code === 1) {
                storage.commit('SET_ACCESS_TOKEN', res.data.accessToken)
                storage.commit('SET_TOKEN_TYPE', res.data.accessToken ? 'Bearer' : '')
                storage.commit('SET_REFRESH_TOKEN', res.data.refreshToken)
                storage.commit('SET_EXPIRES_IN', res.data.expiresIn || 0)
            }
            storage.commit('AxiosControl/clearPending')
            reqConfig.headers['Authorization'] = 'Bearer' + ' ' + res.data.accessToken
            return reqConfig
        }).catch((err) => {
            storage.commit('AxiosControl/clearPending')
            console.log('Axios refresh token fail in request!', err)
            reqConfig.headers['Authorization'] = storage.state.user.TokenType + ' ' + storage.state.user.AccessToken
            return reqConfig
        })
        storage.commit('AxiosControl/waitThis', { waitPromise: returnObject })
    } else {
        console.log('刷新Token失败，refreshToken丢失!')
        showLoginOut()
        returnObject = reqConfig
    }
    return returnObject
}

// request拦截器
$appHttps.interceptors.request.use((config) => {
    // 判断是否登录已过期,并且不是刷新token接口
    if (storage.getters.IsLogin && storage.state.user.ExpiresIn <= new Date().getTime() && config.url.indexOf('/v1/account/login/refresh/') === -1) {
        let returnObject = null
        let pendingPromise = storage.getters['AxiosControl/pendingPromise']
        if (pendingPromise) {
            // 已经在执行刷新token请求
            returnObject = new Promise(resolve => {
                pendingPromise.then(() => {
                    console.log('刷新Token成功，开始处理之前等待的请求', config.url)
                    config.headers['Authorization'] = storage.state.user.TokenType + ' ' + storage.state.user.AccessToken
                    // 开发环境,统计接口相应时间
                    if (process.env.NODE_ENV !== 'production') {
                        // 获取请求url和时间戳
                        requestTimestamp = new Date().getTime()
                    }
                    return resolve(config)
                }).catch(() => {
                    console.log('RefreshToken fail ')
                })
                console.log('有正在进行中的RefreshToken动作，请求等待', config.url)
            })
        } else {
            // 还未执行刷新token
            console.log('登陆状态下认证状态失效，开始重新刷新token', '由请求' + config.url + '触发')
            returnObject = doRefreshToken(storage.state.user.RefreshToken, config)
        }
        return returnObject
    } else {
        config.headers['Authorization'] = storage.state.user.TokenType + ' ' + storage.state.user.AccessToken
        // 开发环境,统计接口相应时间
        if (process.env.NODE_ENV !== 'production') {
            // 获取请求url和时间戳
            requestTimestamp = new Date().getTime()
        }
        return config
    }
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 统一过滤请求，对公共错误进行处理
$appHttps.interceptors.response.use((response) => {
        // 开发环境
        if (process.env.NODE_ENV !== 'production') {
            // 获取响应时间戳并且打印响应时间和url
            responseTimestamp = new Date().getTime()
            console.log('请求url[' + response.config.url + ']')
            console.log(`响应时间${responseTimestamp - requestTimestamp}毫秒`)
        }

        let responseRet = null
        const { data } = response
        switch (data.code) {
            case 1: {
                // 1,请求成功
                responseRet = data
                break
            }
            case 400: { // 参数错误
                // window.GlobalVue.$createDialog({
                //     title: '提示',
                //     type: 'alert',
                //     content: data.reason || ''
                // }).show()
                responseRet = Promise.reject(new Error(data.reason))
                break
            }
            case 401: { // 用户未授权
                // 清除localStorage信息
                storage.dispatch('LoginOut')
                if (response.config.url.indexOf('/v1/account/login/logout') >= 0) {
                    // 是退出登录接口触发时，直接跳转到登录页
                    window.GlobalVue.$router.push({ name: 'login', query: { referer: window.GlobalVue.$route.name } })
                } else {
                    // 强制提示重新登录
                    showLoginOut()
                }
                responseRet = Promise.reject(new Error(data.reason))
                break
            }
            case 403: { // 拒绝访问
                // window.GlobalVue.$createDialog({
                //     title: '提示',
                //     type: 'alert',
                //     content: data.reason || ''
                // }).show()
                responseRet = Promise.reject(new Error(data.reason))
                break
            }
            default:
                // window.GlobalVue.$createToastNew({
                //     txt: data.reason || ''
                // }).show()
                responseRet = Promise.reject(new Error(data.reason))
                break
        }
        return responseRet
    },
    error => {
        if (error && error.response && error.response.status) {
            if ((error.response.status === 401 || error.response.status === 403) && error.response.data.error !== 'bad token') {
                // 强制提示重新登录
                showLoginOut()
            } else {
                // window.GlobalVue.$createToastNew({
                //     txt: error.message || ''
                // }).show()
            }
        } else {
            // window.GlobalVue.$createToastNew({
            //     txt: error.message || ''
            // }).show()
        }
        return Promise.reject(error)
    }
)
export default $appHttps
