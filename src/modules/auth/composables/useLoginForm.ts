import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { AuthResponse } from '../interfaces';
import { tesloApi } from '@/api/tesloApi';
import { useToast } from 'vue-toastification';

export function useLoginForm() {
  const emailuser = ref('');
  const password = ref('');
  const rememberMe = ref(false);
  const errorMessage = ref<string | null>(null);
  const loading = ref(false);
  const router = useRouter();
  const toast = useToast();

  const onLogin = async (): Promise<void> => {
    if (!emailuser.value || !password.value) {
      errorMessage.value = 'Por favor ingrese el nombre de usuario y la contraseña.';
      toast.error(errorMessage.value);
      return;
    }

    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await tesloApi.post<AuthResponse>('/register/login', {
        email_user: emailuser.value,
        password_user: password.value,
      });

      const data = response.data;
      localStorage.setItem('authToken', data.result.token);
      toast.success('Inicio de sesión exitoso');
      router.push({ name: 'home' });
    } catch (error: any) {
      if (error.response) {
        errorMessage.value = error.response.data.message || 'Error en el inicio de sesión.';
        toast.error(errorMessage.value);
      } else {
        errorMessage.value = 'Error al conectarse con el servidor.';
        toast.error(errorMessage.value);
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    emailuser,
    password,
    rememberMe,
    errorMessage,
    loading,
    onLogin,
  };
}
