<template>
  <div class="container mx-auto flex justify-between items-center p-4">
    <!-- Logo a la izquierda -->
    <img alt="CholloCuenca logo" class="w-10 h-auto mr-2" src="@/assets/chollo-cuenca.svg" />
    <router-link to="/" class="text-2xl font-bold text-white mb-2 col-span-full text-shadow"
      >CholloCuenca</router-link
    >
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
    <template v-if="!authStore.isAuthenticated">
      <div class="flex items-center">
        <div v-if="!authStore.isAuthenticated">
          <router-link to="/auth/login" class="btn btn-primary ml-4">
            Regístrate / Inicia sesión
          </router-link>
        </div>
      </div>
    </template>

    <template v-if="authStore.isAuthenticated">
      <div class="flex items-center">
        <span class="mr-2">Hola, {{ authStore.user?.name_user || 'Usuario' }}</span>

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
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <router-link to="profile" class="justify-between"> Perfil </router-link>
            </li>
            <li><a>Ajustes</a></li>
            <li @click="authStore.logout()"><a>Cerrar Sesión</a></li>
          </ul>
        </div>
      </div>
      <label class="swap swap-rotate">
        <input
          type="checkbox"
          class="theme-controller"
          value="synthwave"
          v-model="darkTheme"
          @change="toggleTheme"
        />
        <!-- icono sol -->
        <svg
          class="swap-off h-10 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -5 34 34"
        >
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
          />
        </svg>

        <!-- icono luna -->
        <svg
          class="swap-on h-10 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -5 44 44"
        >
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
          />
        </svg>
      </label>
    </template>
  </div>

  <!-- Menú de navegación -->
  <nav class="w-full py-4 shadow-lg bg-base-100 text-base-content">
    <div class="container mx-auto flex justify-center items-center">
      <div class="flex space-x-4 text-sm font-medium">
        <RouterLink
          v-for="item in navItems"
          :key="item.text"
          :to="item.route.name"
          class="px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition text-primary"
        >
          {{ item.text }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { ref, watch } from 'vue';
import defaultAvatar from '@/assets/usuario.png';

const router = useRouter();
const authStore = useAuthStore();

// Items del menú de navegación
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
const darkTheme = ref(false);

const toggleTheme = () => {
  if (darkTheme.value) {
    document.documentElement.setAttribute('data-theme', 'darkTheme');
  } else {
    document.documentElement.setAttribute('data-theme', 'lightTheme');
  }
};

watch(darkTheme, (newValue) => {
  toggleTheme();
});
</script>
