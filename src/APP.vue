<template>
    <div id="app">
        <header-com></header-com>
        <router-view></router-view>
    </div>
</template>

<script>
    import headerCom from '@/components/header';
    export default {
        name: 'app',
        data() {
            return {};
        },
        components: {
            'header-com': headerCom
        }
    }
</script>