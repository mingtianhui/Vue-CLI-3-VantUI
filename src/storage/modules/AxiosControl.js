/**
 * Created For:  用于控制axios请求拦截刷新token
 * Author: chenLiYan.
 * Date: 2018/12/7 0007 13:13.
 */
// import { getUserInfo } from '@/api/auth'
const AxiosControl = {
    namespaced: true, // 开启命名空间
    state: {
        threshold: null // 用于存储刷新token promise
    },
    getters: {
        pendingPromise: (state) => state.threshold // 用于监听是否处理完成
    },
    mutations: {
        // 中断请求，等待刷新token响应
        waitThis (state, { waitPromise }) {
            if (!state.threshold) {
                state.threshold = waitPromise
            }
        },
        // 用于重置刷新token处理完成
        clearPending (state) {
            state.threshold = null
        }
    },
    actions: {

    }
}
export default AxiosControl
