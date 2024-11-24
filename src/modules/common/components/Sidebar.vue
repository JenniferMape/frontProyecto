<!-- Sidebar.vue -->
<template>
  <aside class="w-1/4 bg-base-100 shadow-md p-6 rounded-lg">
    <h2 class="font-bold text-xl mb-6">Ajustes</h2>
    <ul class="menu">
      <li v-if="isCompany">
        <RouterLink
          :to="{ name: 'companyProfile' }"
          :class="{ active: $route.name === 'companyProfile' }"
        >
          Perfil
        </RouterLink>
      </li>
      <li v-else>
        <RouterLink
          :to="{ name: 'clientProfile' }"
          :class="{ active: $route.name === 'clientProfile' }"
        >
          Perfil
        </RouterLink>
      </li>
      <li v-if="isCompany">
        <RouterLink
          :to="{ name: 'companyOffers' }"
          :class="{ active: $route.name === 'companyOffers' }"
        >
          Mis Ofertas
        </RouterLink>
      </li>
      <li v-else>
        <RouterLink
          :to="{ name: 'favoritesOffers' }"
          :class="{ active: $route.name === 'favoritesOffers' }"
        >
          Mis Favoritos
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  isCompany: boolean;
}>();
</script>
