<template>
  <!-- Profile Form -->
  <section class="w-3/4 bg-base-100 shadow-md p-6 rounded-lg ml-6">
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
        <button @click="removeAvatar(id)" class="btn btn-outline btn-error">Quitar</button>
        <p class="text-sm mt-2">Para resultados óptimos, utiliza una imagen cuadrada</p>
      </div>
    </div>

    <button @click="updateAvatar(avatar, id)" class="btn btn-sm mt-4" :disabled="!avatar">
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
          :placeholder="authStore.user?.name_user"
          :class="
            usernameError
              ? 'input input-bordered input-error'
              : username
                ? 'input input-bordered input-success'
                : 'input input-bordered'
          "
        />
        <div v-if="usernameError" class="text-red-500 text-sm">
          El nombre de usuario no puede estar vacío.
        </div>
        <button
          @click="handleChangeUsername"
          class="btn btn-sm btn-secondary mt-2"
          :disabled="usernameError"
        >
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
          :placeholder="authStore.user?.email_user"
          :class="
            emailError
              ? 'input input-bordered input-error'
              : email
                ? 'input input-bordered input-success'
                : 'input input-bordered'
          "
        />
        <div v-if="emailError" class="text-red-500 text-sm">
          Por favor, ingresa un email válido.
        </div>
        <button
          @click="handleChangeEmail"
          class="btn btn-sm btn-secondary mt-2"
          :disabled="emailError"
        >
          Cambiar email
        </button>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Tu contraseña</span>
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          :class="
            passwordError
              ? 'input input-bordered input-error'
              : password
                ? 'input input-bordered input-success'
                : 'input input-bordered'
          "
        />
        <div v-if="passwordError" class="text-red-500 text-sm">
          La contraseña debe tener al menos 8 caracteres.
        </div>
        <button
          @click="handleChangePassword"
          class="btn btn-sm btn-secondary mt-2"
          :disabled="passwordError"
        >
          Cambiar contraseña
        </button>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Tu CIF</span>
        </label>
        <input
          v-model="cif"
          type="text"
          placeholder="Introduce tu CIF"
          :class="
            cifError
              ? 'input input-bordered input-error'
              : cif
                ? 'input input-bordered input-success'
                : 'input input-bordered'
          "
        />
        <div v-if="cifError" class="text-red-500 text-sm">Por favor, ingresa un CIF válido.</div>
        <button @click="handleChangeCIF" class="btn btn-sm btn-secondary mt-2" :disabled="cifError">
          Cambiar CIF
        </button>
      </div>
    </div>

    <!-- Delete Account -->
    <!-- <div class="mt-10">
      <button @click="deleteAccount(id)" class="btn btn-error">Eliminar Cuenta</button>
    </div> -->
 
      <!-- Delete Account -->
      <div class="mt-10">
      <button @click="showDeleteModal = true" class="btn btn-error">Eliminar Cuenta</button>
    </div>
  
 </section>
  <!-- Confirm Delete Modal -->
  <div v-if="showDeleteModal" class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Confirmar eliminación de cuenta</h3>
      <p class="py-4">¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
      <div class="modal-action">
        <button @click="confirmDeleteAccount" class="btn btn-error">Confirmar</button>
        <button @click="showDeleteModal = false" class="btn">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import defaultAvatar from '@/assets/usuario.png';
import { useToast } from 'vue-toastification';
import {
  changeUsername,
  changeEmail,
  changePassword,
  deleteAccount,
  removeAvatar,
  updateAvatar,
  changeCIF,
} from '@/modules/user/composables/useProfile';

// Acceso al store de autenticación
const authStore = useAuthStore();
const toast = useToast();
// Referencias para los campos de perfil
const username = ref(authStore.user?.username || '');
const email = ref(authStore.user?.email || '');
const password = ref('');
const avatar = ref(null);
const cif = ref('');
const id = authStore.user?.id;
const showDeleteModal = ref(false);

// Variables de error y estado de color
const usernameError = ref(false);
const emailError = ref(false);
const passwordError = ref(false);
const cifError = ref(false);

// Expresiones regulares
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cifRegex = /^[A-Z]\d{8}$/;

// Reemplazar avatar
const replaceAvatar = (event) => {
  const file = event.target.files[0];
  if (file) {
    avatar.value = file; // Asignar el archivo seleccionado a la referencia
  }
};

// Watchers para validación en tiempo real
watch(username, (newValue) => {
  usernameError.value = !newValue || newValue.trim() === '';
});

watch(email, (newValue) => {
  emailError.value = !newValue || !emailRegex.test(newValue);
});

watch(password, (newValue) => {
  passwordError.value = !newValue || newValue.length < 8;
});

watch(cif, (newValue) => {
  cifError.value = !newValue || !cifRegex.test(newValue);
});

// Funciones de cambio
const handleChangeUsername = async () => {
  if (usernameError.value) {
    toast.error('Por favor, ingresa un nombre de usuario válido.');
    return;
  }
  await changeUsername(username.value, id);
  username.value = '';
};

const handleChangeEmail = async () => {
  if (emailError.value) {
    toast.error('Por favor, ingresa un email válido.');
    return;
  }
  await changeEmail(email.value, id);
  email.value = '';
};

const handleChangePassword = async () => {
  if (passwordError.value) {
    toast.error('La contraseña debe tener al menos 8 caracteres.');
    return;
  }
  await changePassword(password.value, id);
  password.value = '';
};

const handleChangeCIF = async () => {
  if (cifError.value) {
    toast.error('Por favor, ingresa un CIF válido.');
    return;
  }
  await changeCIF(cif.value, id);
  cif.value = '';
};
// Función para confirmar la eliminación
const confirmDeleteAccount = async () => {
  await deleteAccount(id);
  showDeleteModal.value = false;
};
</script>

<style scoped>
.input-error {
  border-color: red; /* Cambia el color del borde a rojo */
}
</style>
