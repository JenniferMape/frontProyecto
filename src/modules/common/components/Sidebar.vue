<!-- Sidebar.vue -->
<template>
  <aside class="w-1/4 bg-white shadow-md p-6 rounded-lg">
    <h2 class="font-bold text-xl mb-6">Ajustes</h2>
    <ul class="menu">
      <!-- <li>
        <RouterLink :to="{ name: 'perfil' }" :class="{ active: $route.name === 'perfil' }">
          Perfil
        </RouterLink>
      </li> -->
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
      <!-- <li v-if="isCompany">
        <RouterLink :to="{ name: 'misOfertas' }" :class="{ active: $route.name === 'misOfertas' }">
          Mis Ofertas
        </RouterLink>
      </li>
      <li v-if="!isCompany">
        <RouterLink :to="{ name: 'misCompras' }" :class="{ active: $route.name === 'misCompras' }">
          Mis Compras
        </RouterLink>
      </li> -->
      <!-- <li>
        <RouterLink
          :to="{ name: 'notificaciones' }"
          :class="{ active: $route.name === 'notificaciones' }"
        >
          Notificaciones y mensajes
        </RouterLink>
      </li> -->
      <!-- <li>
        <a href="#" class="active">Perfil</a>
      </li>
      <li><a href="#">Suscripciones</a></li>
      <li><a href="#">Notificaciones mensajes</a></li>
      <li><a href="#">Ofertas favoritas</a></li> -->
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

// Obtener el objeto de ruta actual
const route = useRoute();

const props = defineProps<{
  isCompany: boolean;
}>();
</script>

<style scoped>
.active {
  font-weight: bold;
  color: #1d4ed8; /* Personaliza el color de enlace activo */
}
</style>
