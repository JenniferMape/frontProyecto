<template>
  <!-- Main Content -->
  <div class="container mx-auto flex mt-10 px-6">
    <!-- Sidebar -->
    <aside class="w-1/4 bg-white shadow-md p-6 rounded-lg">
      <h2 class="font-bold text-xl mb-6">Ajustes</h2>
      <ul class="menu">
        <li>
          <a href="#" class="active">Perfil</a>
        </li>
        <li><a href="#">Suscripciones</a></li>
        <li><a href="#">Notificaciones mensajes</a></li>
        <li><a href="#">Ofertas favoritas</a></li>
      </ul>
    </aside>

    <!-- Profile Form -->
    <section class="w-3/4 bg-white shadow-md p-6 rounded-lg ml-6">
      <h2 class="font-bold text-xl mb-6">Perfil</h2>
      <div class="flex items-center space-x-6">
        <div class="avatar">
          <div class="w-24 h-24 rounded-full">
            <img :src="authStore.user?.avatar_user || defaultAvatar" alt="Tu avatar" />
          </div>
        </div>
        <div>
          <button class="btn btn-outline">Reemplazar</button>
          <button class="btn btn-outline text-red-500">Quitar</button>
          <p class="text-sm mt-2">Para resultados óptimos, utiliza una imagen cuadrada</p>
        </div>
      </div>

      <!-- User Details -->
      <div class="mt-10 space-y-6">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Tu nombre de usuario</span>
          </label>
          <input type="text" placeholder="Nombre de usuario" class="input input-bordered" />
          <button class="btn btn-sm btn-outline mt-2">Cambiar nombre de usuario</button>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">¿Tienes algo que decir?</span>
          </label>
          <textarea class="textarea textarea-bordered" placeholder="Descripción"></textarea>
          <button class="btn btn-sm btn-outline mt-2">Cambiar descripción</button>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Tu email</span>
          </label>
          <input type="email" placeholder="Email" class="input input-bordered" />
          <button class="btn btn-sm btn-outline mt-2">Cambiar email</button>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Establecer contraseña</span>
          </label>
          <input type="password" placeholder="Contraseña" class="input input-bordered" />
          <button class="btn btn-sm btn-outline mt-2">Agregar contraseña</button>
          <p class="text-sm mt-2">
            Debido a que te registraste usando una red social, no tienes contraseña. Aquí puedes
            agregar una.
          </p>
        </div>
      </div>

      <!-- Delete Account -->
      <div class="mt-10">
        <button class="btn btn-error">Eliminar Cuenta</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import defaultAvatar from '@/assets/usuario.png';

const authStore = useAuthStore();
</script>

<style scoped></style>
