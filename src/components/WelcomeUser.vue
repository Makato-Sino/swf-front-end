<template>
    <div>
        <h3>{{showUsername}}，您好！欢迎使用多租户云工作流管理平台</h3>
    </div>
</template>
<script>
import Cookie from 'js-cookie'
export default {
    computed: {
        showUsername() {
            return Cookie.get('username');
        },
    },
}
</script>
<style lang="less" scoped>

</style>