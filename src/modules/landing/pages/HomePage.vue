<template>
  <NavItems />
  <div class="container mx-auto p-4">
    <!-- Mostrar mensaje cuando no hay ofertas -->
    <div v-if="noOffers" class="flex flex-col items-center text-gray-500 p-4">
      <img src="@/assets/lupa-no-encontrada.svg" alt="No hay ofertas" class="w-32 h-32 mb-4" />
      <p>No hay ofertas disponibles para esta categoría.</p>
    </div>

    <!-- Mostrar lista de ofertas cuando hay productos -->
    <ProductCard v-else v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCategoryStore } from '@/modules/landing/stores/categoryStore';
import { tesloApi } from '@/api/tesloApi';
import ProductCard from '@/modules/products/components/ProductCard.vue';
import type { Offer } from '@/modules/products/interfaces/product.interface';
import NavItems from '@/modules/common/components/NavItems.vue';
const categoryStore = useCategoryStore();
const products = ref<Offer[]>([]);
const noOffers = ref(false); // Variable para manejar el estado sin ofertas

const loadOffers = async () => {
  const category = categoryStore.selectedCategoryId;
  const endpoint = category > 0 ? `/offer?filter=type:offer_category:${category}` : `/offer`;

  try {
    const response = await tesloApi.get(endpoint);
    products.value = response.data.result.map((offer: Offer) => ({
      id: offer.id,
      title_offer: offer.title_offer,
      description_offer: offer.description_offer,
      price_offer: offer.price_offer,
      image_offer: offer.image_offer,
      web_offer: offer.web_offer,
      end_date: offer.end_date_offer,
    }));
    noOffers.value = products.value.length === 0; // Actualiza noOffers si la lista está vacía
  } catch (error: any) {
    if (error.response && error.response?.status === 404) {
      noOffers.value = true;
      products.value = [];
    } else {
      console.error('Error fetching offers:', error);
    }
  }
};

// Observa cambios en selectedCategoryId para recargar las ofertas
watch(() => categoryStore.selectedCategoryId, loadOffers);

// Carga inicial de ofertas
loadOffers();
</script>
