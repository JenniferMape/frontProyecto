<template>
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

      <!-- Avatar Section -->
      <div class="flex items-center space-x-6">
        <div class="avatar">
          <div class="w-24 h-24 rounded-full">
            <img :src="authStore.user?.avatar_user || defaultAvatar" alt="Tu avatar" />
          </div>
        </div>
        <div>
          <input type="file" @change="replaceAvatar" class="hidden" ref="avatarInput" />
          <button @click="$refs.avatarInput.click()" class="btn btn-outline">Reemplazar</button>
          <button @click="removeAvatar" class="btn btn-outline text-red-500">Quitar</button>
          <p class="text-sm mt-2">Para resultados óptimos, utiliza una imagen cuadrada</p>
        </div>
      </div>

      <button @click="updateAvatar" class="btn btn-sm mt-4" :disabled="!avatar">
        Subir Avatar
      </button>

      <!-- User Details -->
      <div class="mt-10 space-y-6">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Tu nombre de usuario</span>
          </label>
          <input
            v-model="username"
            type="text"
            :placeholder="authStore.user.name_user"
            class="input input-bordered"
          />
          <button @click="changeUsername" class="btn btn-sm btn-outline mt-2">
            Cambiar nombre de usuario
          </button>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Tu email</span>
          </label>
          <input
            v-model="email"
            type="email"
            :placeholder="authStore.user.email_user"
            class="input input-bordered"
          />
          <button @click="changeEmail" class="btn btn-sm btn-outline mt-2">Cambiar email</button>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Tu contraseña</span>
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            class="input input-bordered"
          />
          <button @click="changePassword" class="btn btn-sm btn-outline mt-2">
            Cambiar contraseña
          </button>
        </div>
      </div>

      <!-- Delete Account -->
      <div class="mt-10">
        <button @click="deleteAccount" class="btn btn-error">Eliminar Cuenta</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import defaultAvatar from '@/assets/usuario.png';
import { useToast } from 'vue-toastification';
import { tesloApi } from '@/api/tesloApi';
import axios from 'axios';

// Acceso al store de autenticación
const authStore = useAuthStore();
const toast = useToast();

// Referencias para los campos de perfil
const username = ref(authStore.user?.username || '');
const email = ref(authStore.user?.email || '');
const password = ref('');
const avatar = ref(null); // Para la imagen de avatar
const id = authStore.user.id;

// Cambiar nombre de usuario
const changeUsername = async () => {
  try {
    const { data } = await tesloApi.put('/account', {
      id: id,
      name_user: username.value,
    });
    if (data.status === 200) {
      toast.success('Nombre de usuario actualizado con éxito.');
      authStore.updateUser({ name_user: username.value });
    }
    username.value = '';
  } catch (error) {
    toast.error('Error al cambiar el nombre de usuario.');
  }
};

// Cambiar email
const changeEmail = async () => {
  try {
    const { data } = await tesloApi.put('/account', {
      id: id,
      email_user: email.value,
    });
    if (data.status === 200) {
      toast.success('Email actualizado con éxito.');
      authStore.updateUser({ email: email.value });
    }
    email.value = '';
  } catch (error) {
    toast.error('Error al cambiar el email.');
  }
};

// Cambiar contraseña
const changePassword = async () => {
  try {
    const { data } = await tesloApi.put('/account', {
      id: id,
      password_user: password.value,
    });
    if (data.status === 200) {
      toast.success('Contraseña actualizada con éxito');
    }
  } catch (error) {
    toast.error('Error al cambiar la contraseña.');
  }
};

// Reemplazar avatar
const replaceAvatar = (event) => {
  const file = event.target.files[0];
  if (file) {
    avatar.value = file; // Asignar el archivo seleccionado a la referencia
  }
};

// Quitar el avatar
const removeAvatar = () => {
  avatar.value = null; // Reiniciar la referencia a null
  authStore.updateUser({ avatar_user: null });
};

// Subir el avatar a la API
const updateAvatar = async () => {
  if (!avatar.value) {
    toast.error('Por favor, selecciona un avatar antes de subir.'); // Mensaje si no hay archivo
    return;
  }

  try {
    // Crear un FormData y añadir el archivo seleccionado
    const formData = new FormData();
    formData.append('avatar', avatar.value); // Archivo del avatar

    // Realizar la petición POST a la API con axios
    const response = await axios.post(`http://chollocuenca.com/account/avatar?id=${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Mostrar mensaje de éxito y actualizar la información del usuario
    toast.success('Avatar actualizado con éxito');
    console.log(response)
    authStore.updateUser({ avatar_user: response.data.result });
  } catch (error) {
    console.error('Error al actualizar el avatar', error);
    toast.error('Error al actualizar el avatar.');
  }
};


// Eliminar la cuenta del usuario
const deleteAccount = async () => {
  try {
    await axios.delete('/api/user/delete-account');
    toast.success('Cuenta eliminada correctamente.');
    authStore.logout();
  } catch (error) {
    toast.error('Error al eliminar la cuenta.');
  }
};
</script>

<style scoped></style>
