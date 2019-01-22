/**
 * Created For: 异步加载动态路由，处理加载状态
 * Author: Mason.
 * Date: 2019/01/15 11:40.
 */
import LoadingComponent from '@/components/common/BaseCustomLoading'
import ErrorComponent from '@/components/common/BaseErrorComponent'

export const AsyncComponent = (AsyncComponent) => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: AsyncComponent,
    // 异步组件加载时使用的组件
    loading: LoadingComponent,
    // 加载失败时使用的组件
    error: ErrorComponent,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 3000
})
