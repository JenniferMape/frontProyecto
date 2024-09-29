<template>
  <div class="container mx-auto flex justify-between items-center p-4">
    <!-- Logo a la izquierda -->
    <img alt="CholloCuenca logo" class="w-10 h-auto mr-2" src="@/assets/chollo-cuenca.svg" />
    <router-link to="/" class="text-xl font-bold">CholloCuenca</router-link>

    <!-- Campo de búsqueda centrado -->
    <form action="/search" method="get" class="relative flex-grow max-w-md mx-auto">
      <label class="input input-bordered flex items-center gap-2 w-full">
        <input
          type="text"
          class="grow pl-8 pr-2 w-full"
          placeholder="Buscar..."
          aria-label="Buscar"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="absolute left-2 h-4 w-4 opacity-70"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </form>

    <!-- Sección de autenticación -->
    <template v-if="!authStore.isAuthenticated">
      <div class="flex items-center">
        <div v-if="!authStore.isAuthenticated">
          <router-link to="/auth/login" class="btn btn-primary ml-4">
            Regístrate / Inicia sesión
          </router-link>
        </div>
      </div>
    </template>
    <!-- Mostrar el avatar y el letrero si está autenticado -->
    <template v-if="authStore.isAuthenticated">
      <div class="flex items-center">
        <!-- Letrero "Hola [Nombre]" -->
        <span class="mr-2">Hola, {{ authStore.user?.name_user || 'Usuario' }}</span>

        <!-- Avatar -->
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                :alt="authStore.user?.name_user || 'Usuario'"
                :src="
                  authStore.user?.avatar_user ||
                  'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                "
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a class="justify-between">Perfil</a>
            </li>
            <li><a>Ajustes</a></li>
            <li @click="authStore.logout()"><a>Cerrar Sesión</a></li>
          </ul>
        </div>
      </div>
    </template>
  </div>

  <!-- Menú de navegación -->
  <nav class="container mx-auto flex space-x-4 p-4">
    <RouterLink
      v-for="item in navItems"
      :key="item.text"
      :to="item.route.name"
      class="link link-hover"
    >
      {{ item.text }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/modules/auth/stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();

// Items del menú de navegación
const navItems = [
  { text: 'Características', route: { name: 'features' } },
  { text: 'Precios', route: { name: 'pricing' } },
  { text: 'Contacto', route: { name: 'contact' } },
];
</script>
