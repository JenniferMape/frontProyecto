<!-- NavItems.vue -->
<template>
  <nav class="w-full py-4 shadow-lg bg-base-100 text-base-content">
    <div class="container mx-auto flex justify-center items-center">
      <div class="flex space-x-4 text-sm font-medium">
        <router-link
          v-for="item in navItems"
          :key="item.text"
          :to="item.route.name"
          class="px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition text-primary"
        >
          {{ item.text }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navItems = [
  { text: 'Ofertas Destacadas', route: { name: 'features' } },
  { text: 'Moda', route: { name: 'pricing' } },
  { text: 'Electrónica', route: { name: 'contact' } },
  { text: 'Alimentación', route: { name: 'contact' } },
  { text: 'Salud', route: { name: 'contact' } },
  { text: 'Hogar', route: { name: 'contact' } },
  { text: 'Ocio y cultura', route: { name: 'contact' } },
  { text: 'Automoción', route: { name: 'contact' } },
];
</script>
