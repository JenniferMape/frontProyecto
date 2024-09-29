<template>
  <div class="max-w-lg w-full px-8">
    <!-- Imagen del logo -->
    <div class="flex items-center justify-center mb-6">
      <img alt="CholloCuenca logo" class="w-10 h-auto mr-2" src="@/assets/chollo-cuenca.svg" />
      <h1 class="text-lg">CholloCuenca</h1>
    </div>

    <!-- Formulario de Inicio de Sesión -->
    <div class="card bg-base-90 w-full shadow-2xl">
      <form class="card-body p-6 grid grid-cols-1 gap-4" @submit.prevent="onLogin">
        <h2 class="card-title text-lg mb-2 col-span-full">Si ya eres usuario:</h2>
        <div class="form-control col-span-full">
          <label class="input input-bordered flex items-center gap-2">
            Email
            <input
              v-model="emailuser"
              type="email"
              placeholder="ejemplo@ejemplo.com"
              class="grow"
              required
              id="emailuser"
              name="emailuser"
              autocomplete="on"
            />
          </label>
        </div>
        <div class="form-control col-span-full">
          <label class="input input-bordered flex items-center gap-2">
            Password
            <input
              v-model="password"
              type="password"
              id="password"
              name="password"
              placeholder="min 8 caracteres"
              class="grow"
              required
              autocomplete="off"
            />
          </label>
          <!-- Forgot Password Link -->
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">¿Olvidaste tu contraseña?</a>
          </label>
        </div>
        <!-- Botón de Inicio de Sesión -->
        <div class="form-control mt-6">
          <button class="btn btn-primary" type="submit">Inicia Sesión</button>
        </div>

        <!-- Enlace para Registrarse -->
        <div class="mt-6 text-center">
          <RouterLink class="hover:underline" :to="{ name: 'register' }">
            ¡Regístrate aqui!
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginForm } from '@/modules/auth/composables/useLoginForm';
import { RouterLink } from 'vue-router';

// // Desestructuramos las variables y funciones del composable
const { emailuser, password, onLogin, loading } = useLoginForm();
</script>
