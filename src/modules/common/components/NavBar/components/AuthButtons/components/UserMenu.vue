<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img
          :alt="authStore.user?.name_user || 'Usuario'"
          :src="authStore.user?.avatar_user || defaultAvatar"
        />
      </div>
    </div>
    <ul
      tabindex="0"
      class="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
    >
      <li>
        <router-link :to="{ name: 'profile' }">Perfil</router-link>
      </li>
      <!-- <li><a>Ajustes</a></li> -->
      <li @click="authStore.logout()"><a>Cerrar Sesión</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import defaultAvatar from '@/assets/usuario.png';

const authStore = useAuthStore();
</script>
