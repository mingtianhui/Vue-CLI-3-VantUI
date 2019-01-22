/**
* 页面加载超时
*/
<template>
    <div></div>
</template>

<script>
    export default {
        name: 'PageError',
        created () {
            this.$createDialog({
                type: 'alert',
                content: `<p class="text-ct">页面加载超时，
请刷新重试！<p>`,
                onConfirm: () => {
                    this.$router.go(0)
                }
            }).show()
        }
    }
</script>
