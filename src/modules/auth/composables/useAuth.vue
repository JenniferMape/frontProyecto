import { defineStore } from 'pinia';
import { ref } from 'vue';
import tesloApi from '@/api/tesloApi';
import type { User } from '../interfaces/user.interface';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  const checkAuthStatus = async (): Promise<void> => {
    isLoading.value = true;
  
    const storedToken = localStorage.getItem('authToken');
  
    if (!storedToken) {
      logout();
      return;
    }
  
    const { ok, message } = await authStore.checkAuth(storedToken);
  
    if (ok) {
      toast.success(message);
    } else {
      toast.error(message);
      logout();
    }
  
    isLoading.value = false;
  };
  

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('authToken');
  };

  return {
    user,
    token,
    checkAuth,
    logout,
  };
});



