<template>
  <!-- Formulario de Inicio de Sesión -->
  <div class="card bg-base-100 w-full shadow-2xl">
    <form class="card-body p-6 grid grid-cols-1 gap-4" @submit.prevent="onLogin">
      <h2 class="card-title text-lg mb-2 col-span-full text-white">Si ya eres usuario:</h2>
      <div class="form-control col-span-full">
        <label class="input input-bordered flex items-center gap-2 text-white">
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
        <label class="input input-bordered flex items-center gap-2 text-white">
          Password
          <input
            v-model="passworduser"
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
</template>

<script setup lang="ts">
import { useLoginForm } from '@/modules/auth/composables/useLoginForm';
import { RouterLink } from 'vue-router';

// // Desestructuramos las variables y funciones del composable
const { emailuser, passworduser, onLogin, loading } = useLoginForm();
</script>
