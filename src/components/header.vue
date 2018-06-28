<template>
  <header class="header">
    <div class="header-content clearfix">
        <div class="header-content-logo">AFD</div>
        <div class="header-content-tab">AFD</div>
    </div>
  </header>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/css/global.scss';
    .header {
        width: 100%;
        background-color: #13161F;
        &-content {
            width: 1200px;
            height: 64px;
            margin: 0 auto;
            color: #fff;
            @include content-flex();
            &-logo {

            }
            &-tab {
            }
        }
    }
</style>