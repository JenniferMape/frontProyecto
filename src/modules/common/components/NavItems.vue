<!-- NavItems.vue -->
<template>
  <nav class="w-full py-4 shadow-lg bg-base-100 text-base-content">
    <div class="container mx-auto flex justify-center items-center">
      <div class="flex space-x-4 text-sm font-medium">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="selectCategory(item.id)"
          class="px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition text-primary"
        >
          {{ item.text }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/modules/landing/stores/categoryStore'

const categoryStore = useCategoryStore();

const navItems = [
  { id: 0, text: 'Ofertas Destacadas' },
  { id: 1, text: 'Alimentación' },
  { id: 2, text: 'Automoción' },
  { id: 3, text: 'Electrónica' },
  { id: 4, text: 'Hogar' },
  { id: 5, text: 'Moda' },
  { id: 6, text: 'Ocio y cultura' },
  { id: 7, text: 'Salud' },
];


function selectCategory(id: number) {
  categoryStore.setCategory(id); // Actualiza la categoría seleccionada en el store
}
</script>
