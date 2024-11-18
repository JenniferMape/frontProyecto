<template>
  <div class="flex bg-base-100 shadow-lg rounded-lg overflow-hidden mb-4 h-40">
    <!-- Imagen del producto -->
    <div class="w-1/3">
      <img
        class="w-full h-full object-cover"
        :src="product.image_offer"
        :alt="product.title_offer"
      />
    </div>

    <!-- Contenido de la tarjeta -->
    <div class="w-2/3 p-4 flex flex-col justify-between">
      <!-- Sección del tiempo en la esquina superior derecha -->
      <div class="flex justify-between">

        <h2 class="text-md font-bold text-neutral line-clamp-1">{{ product.title_offer }}</h2>
        <span class="text-sm text-gray-400 ml-auto">Fin oferta: {{ formattedTime }}</span>
      </div>

      <!-- Título del producto -->

      <!-- Precio -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-lg font-semibold text-primary">{{ product.price_offer }}€</span>
        </div>
      </div>

      <!-- Descripción del producto -->
      <p class="text-sm text-gray-600 line-clamp-2">{{ product.description_offer }}</p>

      <!-- Sección acciones -->
      <div class="flex justify-between items-center mt-2">
        <!-- Botón para ver la oferta -->
        <!-- <a :href="product.web_offer" target="_blank" class="btn btn-warning btn-sm">Ir al chollo</a> -->
        <router-link :to="{ name: 'OfferDetail', params: { offerId: product.id } }" class="btn btn-warning btn-sm">
          Ver oferta
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Recibir los datos del producto
const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      title_offer: 'Título del producto',
      description_offer: 'Descripción corta del producto...',
      price_offer: '100.95',
      image_offer: 'https://via.placeholder.com/150',
      web_offer: 'https://due-home.com/aparadores-de-comedor/aparador-baltik.html',
      start_date:'01/01/2000',
      end_date:'01/'
    }),
  },
});

// Formatear la fecha
const formattedTime = computed(() => {
  const endDate = new Date(props.product.end_date);

  // Extraer el día, mes y año
  const day = String(endDate.getDate()).padStart(2, '0');
  const month = String(endDate.getMonth() + 1).padStart(2, '0'); // Los meses son 0 indexados
  const year = endDate.getFullYear();

  // Retornar en formato dd/mm/yyyy
  return `${day}/${month}/${year}`;
});
</script>

<style scoped>
.h-40 {
  height: 12rem; 
}
</style>
