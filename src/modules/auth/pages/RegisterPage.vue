<template>
  <!-- Formulario de Registro -->
  <div class="card bg-base-100 w-full shadow-2xl">
    <form class="card-body p-6 grid grid-cols-1 gap-4" @submit.prevent="registerUser">
      <h2 class="card-title text-lg mb-2 col-span-full text-neutral">¡Te estábamos esperando!</h2>

      <!-- Checkbox para seleccionar cuenta de empresa -->
      <div class="form-control col-span-full">
        <label class="label cursor-pointer">
          <span class="label-text text-neutral">¿Va a ser una cuenta de empresa?</span>
          <input
            type="checkbox"
            id="typeUser"
            v-model="typeUser"
            class="checkbox checkbox-primary"
          />
        </label>
      </div>

      <div class="form-control col-span-full" v-if="typeUser">
        <label class="input input-bordered flex items-center gap-2 text-neutral">
          CIF
          <input type="text" id="cif" v-model="cif" placeholder="A123456" autocomplete="off" />
        </label>
      </div>

      <!-- Username Input -->
      <div class="form-control col-span-full">
        <label class="input input-bordered flex items-center gap-2 text-neutral">
          Nombre de usuario
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Nombre de usuario"
            autocomplete="off"
          />
        </label>
      </div>

      <div class="form-control col-span-full">
        <label class="input input-bordered flex items-center gap-2 text-neutral">
          Email
          <input type="email" id="email" v-model="email" placeholder="Email" autocomplete="off" />
        </label>
      </div>

      <!-- Password Input -->
      <div class="form-control col-span-full">
        <label class="input input-bordered flex items-center gap-2 text-neutral">
          Contraseña
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Contraseña"
            autocomplete="off"
          />
        </label>
      </div>

      <!-- Confirm Password Input -->
      <div class="form-control col-span-full">
        <label class="input input-bordered flex items-center gap-2 text-neutral">
          Confirma la contraseña
          <input
            type="password"
            id="password2"
            v-model="password2"
            placeholder="Confirma la contraseña"
            autocomplete="off"
          />
        </label>
      </div>

      <!-- Botón de Registro -->
      <div class="form-control col-span-full mt-4">
        <button class="btn btn-primary w-full" type="submit">¡Regístrate ahora!</button>
      </div>

      <!-- Enlace para Iniciar Sesión -->
      <div class="mt-4 text-center col-span-full">
        <RouterLink class="hover:underline" :to="{ name: 'login' }">
          ¿Ya tienes cuenta?
        </RouterLink>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
// Importamos la lógica desde el archivo `useRegisterForm.js`
import { useRegisterForm } from '@/modules/auth/composables/useRegisterForm';

// Obtenemos todas las referencias y la función para registrar el usuario
const { typeUser, cif, username, email, password, password2, registerUser } = useRegisterForm();
</script>
