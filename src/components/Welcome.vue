<template>
    <!-- <div class="middle" :style="backgroundDiv"> -->
    <div>
        <!-- <img src="../assets/background.png" style="width: auto; height: 40px;"> -->
        <h1>{{showUsername}},欢迎你！</h1>
    </div>
</template>
<script>
import Cookie from 'js-cookie'
export default {
    data() {
      return {
        backgroundDiv: {
            backgroundImage: 'url(' + require('../assets/background.jpeg') + ')'
        },
        url: '../assets/background.jpeg',
      }
    },
    computed: {
        showUsername() {
            return Cookie.get('username');
        },
    },
}
</script>
<style lang="less" scoped>
.middle {
    border: 0px;
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    border-top: 1px;
    background: no-repeat center top;
    background-size: 100% 100%;
}
</style>