/**
 * Created For: 用户基本信息，
 * Author: chenLiYan.
 * Date: 2018/11/28 0028 15:06.
 */
import { login, getUserInfo } from '@/api/auth'
// 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
import {
    SET_USER_NAME,
    SET_USER_INFO,
    DEL_USER_INFO,
    SET_ACCESS_TOKEN,
    DEL_ACCESS_TOKEN,
    SET_TOKEN_TYPE,
    DEL_TOKEN_TYPE,
    SET_EXPIRES_IN,
    DEL_EXPIRES_IN,
    SET_REFRESH_TOKEN,
    DEL_REFRESH_TOKEN
} from './events'

const user = {
    state: {
        UserInfo: localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : {},
        AccessToken: localStorage.getItem('access_token') || '', // 请求token：access_token
        TokenType: localStorage.getItem('token_type') || '', // 请求token：token_type
        ExpiresIn: localStorage.getItem('expires_in') || 0, // token超时时间戳
        RefreshToken: localStorage.getItem('refresh_token') || '', // 刷新token
        localUserName: localStorage.getItem('user_name') || '' // 本地现在或之前登录过的用户名（手机号）
    },
    // 计算属性
    getters: {
        // 是否已登录
        IsLogin (state, getters) {
            return !!(state.AccessToken && state.TokenType)
        }
    },
    mutations: {
        // 设置用户基本信息
        [SET_USER_NAME] (state, data) {
            localStorage.setItem('user_name', data)
            state.localUserName = data
        },
        // 设置用户基本信息
        [SET_USER_INFO] (state, data) {
            state.UserInfo = data || ''
            if (data) {
                localStorage.setItem('user_info', JSON.stringify(data))
            } else {
                localStorage.setItem('user_info', '')
            }
        },
        [DEL_USER_INFO] (state) {
            localStorage.removeItem('user_info')
            state.UserInfo = {}
        },
        [SET_ACCESS_TOKEN] (state, data) {
            localStorage.setItem('access_token', data)
            state.AccessToken = data
        },
        [DEL_ACCESS_TOKEN] (state) {
            localStorage.removeItem('access_token')
            state.AccessToken = ''
        },
        [SET_TOKEN_TYPE] (state, data) {
            localStorage.setItem('token_type', data)
            state.TokenType = data
        },
        [DEL_TOKEN_TYPE] (state) {
            localStorage.removeItem('token_type')
            state.TokenType = ''
        },
        [SET_EXPIRES_IN] (state, num) {
            localStorage.setItem('expires_in', new Date().getTime() + num)
            state.ExpiresIn = new Date().getTime() + num
        },
        [DEL_EXPIRES_IN] (state) {
            localStorage.removeItem('expires_in')
            state.ExpiresIn = ''
        },
        [SET_REFRESH_TOKEN] (state, data) {
            localStorage.setItem('refresh_token', data)
            state.RefreshToken = data
        },
        [DEL_REFRESH_TOKEN] (state) {
            localStorage.removeItem('refresh_token')
            state.RefreshToken = ''
        }
    },
    actions: {
        // 用户登录
        Login ({ commit }, params) {
            return new Promise((resolve, reject) => {
                login(params.username.toString(), params.password).then(res => {
                    if (res.code === 1) {
                        commit('SET_ACCESS_TOKEN', res.data.accessToken || '')
                        commit('SET_TOKEN_TYPE', res.data.accessToken ? 'Bearer' : '')
                        commit('SET_EXPIRES_IN', res.data.expiresIn || '')
                        commit('SET_REFRESH_TOKEN', res.data.refreshToken || '')
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetUserInfo ({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    if (response.code === 1) {
                        commit('SET_USER_INFO', response.data)
                        commit('SET_USER_NAME', response.data.identifier || '')
                    } else {
                        commit('SET_USER_INFO', '')
                    }
                    resolve(response)
                }).catch(error => {
                    commit('SET_USER_INFO', '')
                    reject(error)
                })
            })
        },
        // 退出登录,清除数据
        LoginOut: function ({ commit }) {
            commit('DEL_USER_INFO')
            commit('DEL_ACCESS_TOKEN')
            commit('DEL_TOKEN_TYPE')
            commit('DEL_EXPIRES_IN')
            commit('DEL_REFRESH_TOKEN')
        }
    }
}
export default user
