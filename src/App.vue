<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    </div>
</template>

<style lang="less">
    @import "less/base/common.less";
</style>
<style>
    @import "less/base/sprites.css";
</style>
