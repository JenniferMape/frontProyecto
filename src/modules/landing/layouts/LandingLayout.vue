<template>
  <div class="bg-base-200 min-h-screen">
    <!-- Aplicar la clase aquí -->
    <header class="shadow"></header>
    <NavBar />
    <main class="container mx-auto p-4">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>

    <CustomFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavBar from '../components/NavBar.vue';
import CustomFooter from '../components/CustomFooter.vue';

const showFooter = ref(false);

const checkScroll = () => {
  const scrollY = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Muestra el footer solo si se ha llegado al final de la página
  showFooter.value = scrollY >= documentHeight;
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});
</script>
