/**
 * Created For: 统一管理localStorage
 * Author: chenLiYan.
 * Date: 2018/11/06 11:46.
 */
const localSt = {
    state: {
        historySearch: localStorage.getItem('history_search') ? JSON.parse(localStorage.getItem('history_search')) : [] // 历史搜索
    },
    // 计算属性
    getters: {},
    mutations: {
        SetHistorySearch (state, keyword) {
            keyword = keyword.trim()
            if (keyword || keyword === 0) {
                let history = state.historySearch
                if (history.indexOf(keyword) === -1) { // 关键词不在列表中
                    if (history.length >= 10) {
                        history.pop()
                        history.unshift(keyword) // 向数组的开头添加一个或更多元素
                    } else {
                        history.unshift(keyword)
                    }
                } else if (history.indexOf(keyword) !== 0) {
                    history.splice(history.indexOf(keyword), 1)
                    history.unshift(keyword)
                }
                localStorage.setItem('history_search', JSON.stringify(history))
                state.historySearch = history
            }
        },
        DelHistorySearch (state) {
            localStorage.removeItem('history_search')
            state.historySearch = []
        }
    },
    actions: {}
}
export default localSt
