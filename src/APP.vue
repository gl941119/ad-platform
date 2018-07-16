<template>
    <div id="app">
        <share-layout></share-layout>
        <header-com></header-com>
        <router-view></router-view>
        <custom-share></custom-share>
        <instant-buy></instant-buy>
    </div>
</template>

<script>
    import headerCom from '@/components/header';
    import shareLayoutCom from '@/components/index-com/share-layout';
    import customShareCom from '@/components/common/custom-share';
    export default {
        name: 'app',
        data() {
            return {};
        },
        components: {
            'header-com': headerCom,
            'share-layout': shareLayoutCom,
            'custom-share': customShareCom,
        }
    }
</script>
