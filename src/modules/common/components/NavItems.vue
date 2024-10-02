<!-- NavItems.vue -->
<template>
  <nav class="w-full py-4 shadow-lg bg-base-100 text-base-content">
    <div class="container mx-auto flex justify-center items-center">
      <div class="flex space-x-4 text-sm font-medium">
        <router-link
          v-for="item in navItems"
          :key="item.text"
          :to="item.route"
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
  { text: 'Ofertas Destacadas', route: { name: 'home' } },
  { text: 'Moda', route: { name: 'home' } },
  { text: 'Electrónica', route: { name: 'home' } },
  { text: 'Alimentación', route: { name: 'home' } },
  { text: 'Salud', route: { name: 'home' } },
  { text: 'Hogar', route: { name: 'home' } },
  { text: 'Ocio y cultura', route: { name: 'home' } },
  { text: 'Automoción', route: { name: 'home' } },
];
</script>
