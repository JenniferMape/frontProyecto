// src/modules/auth/composables/usePasswordReset.ts
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export function usePasswordReset() {
  const emailuser = ref('');
  const loading = ref(false);
  const router = useRouter();

  const onSubmit = async () => {
    loading.value = true;
    try {
      // Hacer la solicitud a la API para enviar el enlace de recuperación
      await axios.post('/api/password-reset', { email: emailuser.value });
      alert('Se ha enviado un enlace de recuperación a tu correo electrónico.');
      router.push({ name: 'login' });
    } catch (error) {
      alert('Hubo un error al intentar enviar el enlace de recuperación.');
    } finally {
      loading.value = false;
    }
  };

  return { emailuser, onSubmit, loading };
}
