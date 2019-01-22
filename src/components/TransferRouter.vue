/**
* Created For: 路由中转
* Author: Mason.
* Date: 2019/01/15 15:29.
*/
<template>
    <div style="height: 100%">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less" scoped></style>
