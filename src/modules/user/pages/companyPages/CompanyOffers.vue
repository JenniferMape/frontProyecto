<template>
  <!-- User's Offers -->
  <section class="w-3/4 bg-white shadow-md p-6 rounded-lg ml-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="font-bold text-xl">Mis Ofertas</h2>
      <button @click="goToNewOffer" class="btn btn-primary">Subir Nueva Oferta</button>
    </div>

    <div v-if="paginatedOffers.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="offer in paginatedOffers" :key="offer.id" class="bg-gray-100 p-4 rounded-lg shadow-md">
        <img
          :src="offer.image_offer"
          alt="Imagen de la oferta"
          class="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 class="font-bold text-lg mb-2">{{ offer.title_offer }}</h3>
        <p class="text-sm text-gray-600 mb-1">Categoría: {{ offer.category }}</p>
        <p class="text-sm text-gray-600 mb-1">Fecha: {{ offer.start_date_offer }} - {{ offer.end_date_offer }}</p>
        <a :href="offer.web_offer" target="_blank" class="text-blue-500 hover:underline">Ver Oferta</a>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">No has subido ninguna oferta todavía.</div>

    <!-- Pagination Controls -->
    <div v-if="offers.length > offersPerPage" class="flex justify-between mt-6">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="btn btn-secondary"
      >
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="btn btn-secondary"
      >
        Siguiente
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { tesloApi } from '@/api/tesloApi';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/modules/auth/composables/useAuthAction';

const authStore = useAuthStore();
const companyId = authStore.user?.id;

// Variables para manejar las ofertas y la paginación
const offers = ref([]);
const currentPage = ref(1);
const offersPerPage = 6;

// Función para obtener las ofertas de la compañía
const getOffersByCompany = async (companyId) => {
  try {
    const response = await tesloApi.get(`/offer?filter=type:offer_company:${companyId}`);
    if (response.data.status === 200) {
      offers.value = response.data.result;
    } else {
      console.error('Error al obtener las ofertas:', response.data.message);
    }
  } catch (error) {
    console.error('Error al obtener ofertas:', error.response.data);
  }
};

// Computed para las ofertas paginadas
const paginatedOffers = computed(() => {
  const start = (currentPage.value - 1) * offersPerPage;
  return offers.value.slice(start, start + offersPerPage);
});

// Computed para el total de páginas
const totalPages = computed(() => Math.ceil(offers.value.length / offersPerPage));

// Cambiar de página
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Llamar a la función para obtener las ofertas al montar el componente
getOffersByCompany(companyId);

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
