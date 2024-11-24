<template>
  <div class="bg-base-200 min-h-screen">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <footer>
      <CustomFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
import CustomFooter from '@/modules/common/components/CustomFooter.vue';
</script>
