/*
* vant-ui按需引入
* */
import Vue from 'vue'
import {
    Button,
    Cell,
    CellGroup,
    Col,
    Popup,
    Checkbox,
    CheckboxGroup,
    Field,
    Picker,
    Radio,
    Search,
    Stepper,
    Dialog,
    Loading,
    Notify,
    PullRefresh,
    Toast,
    Collapse,
    Lazyload,
    List,
    NoticeBar,
    Steps,
    Swipe,
    SwipeItem,
    Tag,
    NavBar,
    Tab,
    Tabbar,
    TabbarItem,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Card,
    SubmitBar
} from 'vant'
// 基础组件
Vue.use(Button)
Vue.use(Cell).use(CellGroup)
Vue.use(Col)
Vue.use(Popup)
// 表单组件
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Radio)
Vue.use(Search)
Vue.use(Stepper)
// 反馈组件
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Notify)
Vue.use(PullRefresh) // 下拉刷新
Vue.use(Toast) // 轻提示
// 展示组件
Vue.use(Collapse) // 折叠面板
/*
* 图片懒加载
* */
Vue.use(Lazyload, {
    preLoad: 1.3,
    error: '@/static/defaultImg.png',
    loading: '@/static/defaultImg.png',
    attempt: 1 // 尝试几次
})
Vue.use(List) // 列表
Vue.use(NoticeBar) // 通告栏
Vue.use(Steps) // 步骤条
Vue.use(Swipe).use(SwipeItem) // 轮播
Vue.use(Tag) // 标记
// 导航组件
Vue.use(NavBar) // 导航栏
Vue.use(Tab) // 标签页
Vue.use(Tabbar).use(TabbarItem) // 标签栏
Vue
    .use(GoodsAction)
    .use(GoodsActionBigBtn)
    .use(GoodsActionMiniBtn) // 商品导航
Vue.use(Card) // 卡片
Vue.use(SubmitBar) // 提交订单栏
