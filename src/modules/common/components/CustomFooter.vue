<template>
  <footer
    class="sticky bottom-0 p-4 text-center transition-opacity duration-300"
    :class="{ 'opacity-100': showFooter, 'opacity-0': !showFooter }"
  >
    <p>&copy; 2024 CholloCuenca. Todos los derechos reservados.</p>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

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

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>
