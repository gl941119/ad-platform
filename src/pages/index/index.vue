<template>
  <div>
      <custom-carousel></custom-carousel>
  </div>
</template>
<script>
import customCarousel from '@/components/custom-carousel';
    export default {
        data() {
            return {}
        },
        components: {
            'custom-carousel': customCarousel,
        }
    }
</script>
