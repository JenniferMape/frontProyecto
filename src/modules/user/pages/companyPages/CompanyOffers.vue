<template>
  <!-- User's Offers -->
  <section class="w-3/4 bg-white shadow-md p-6 rounded-lg ml-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="font-bold text-xl">Mis Ofertas</h2>
      <button @click="goToNewOffer" class="btn btn-primary">Subir Nueva Oferta</button>
    </div>

    <div v-if="offers.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="offer in offers" :key="offer.id" class="bg-gray-100 p-4 rounded-lg shadow-md">
        <img
          :src="offer.imageUrl"
          alt="Imagen de la oferta"
          class="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 class="font-bold text-lg mb-2">{{ offer.title }}</h3>
        <p class="text-sm text-gray-600 mb-1">Categoría: {{ offer.category }}</p>
        <p class="text-sm text-gray-600 mb-1">Fecha: {{ offer.startDate }} - {{ offer.endDate }}</p>
        <a :href="offer.website" target="_blank" class="text-blue-500 hover:underline"
          >Ver Oferta</a
        >
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">No has subido ninguna oferta todavía.</div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Datos simulados de ofertas (puedes reemplazarlo con datos de API en el futuro)
const offers = ref([
  {
    id: 1,
    title: 'Descuento en Ropa',
    category: 'Ropa',
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    imageUrl: 'https://via.placeholder.com/150',
    website: 'https://ejemplo.com',
  },
  // Más ofertas pueden ser añadidas aquí
]);

const router = useRouter();
const goToNewOffer = () => {
  router.push({ name: 'formOffer' });
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
