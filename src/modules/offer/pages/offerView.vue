<template>
  <div class="container mx-auto p-4">
    <div class="card bg-base-100 shadow-xl">
      <!-- Imagen principal -->
      <figure class="p-4">
        <img
          :src="offerImageUrl || 'default-image.jpg'"
          alt="Imagen de la oferta"
          class="rounded-lg object-cover max-w-xs max-h-48"
        />
      </figure>

      <!-- Información de la oferta -->
      <div class="card-body p-6">
        <h2 class="card-title text-2xl font-bold">{{ offerTitle }}</h2>

        <div class="text-2xl font-semibold text-orange-500 mb-2">
          {{ newPrice }}
          <span class="line-through text-gray-500 text-lg ml-2">{{ originalPrice }}</span>
          <span class="text-lg text-green-600">(-{{ discountPercentage }}%)</span>
        </div>

        <p class="text-gray-600">{{ offerCategoryLabel }}</p>

        <!-- Botón para ir al enlace de la oferta -->
        <div class="card-actions mt-4">
          <a
            :href="offerWebsite"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary w-full"
            :class="{ 'btn-disabled': !offerWebsite }"
            :aria-disabled="!offerWebsite"
          >
            Ir al chollo
          </a>
        </div>
        <!-- Detalles adicionales de la oferta -->
        <div class="bg-base-200 rounded-lg p-4 mt-6">
          <h3 class="font-semibold text-lg">Descripción de la oferta</h3>
          <p class="text-gray-600 mt-2">{{ offerDescription }}</p>
        </div>

        <!-- Información adicional -->
        <div class="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h4 class="font-semibold text-md">Fecha de inicio:</h4>
            <p>{{ formattedStartDate }}</p>
          </div>
          <div>
            <h4 class="font-semibold text-md">Fecha de finalización:</h4>
            <p>{{ formattedEndDate }}</p>
          </div>
          <div>
            <h4 class="font-semibold text-md">Código de descuento:</h4>
            <p>{{ discountCode || 'No disponible' }}</p>
          </div>
          <div>
            <h4 class="font-semibold text-md">Dirección:</h4>
            <p>{{ offerAddress || 'No disponible' }}</p>
          </div>
        </div>
        <router-link class="btn btn-secondary mt-4 w-full" :to="{ name: 'home' }"
          >Volver</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';
import { tesloApi } from '@/api/tesloApi';
import type { Offer } from '@/modules/products/interfaces/product.interface';

interface Category {
  value: number;
  label: string;
}
// Props
const props = defineProps({
  offerId: {
    type: String,
    required: true,
  },
});

// Reactive data
const offerTitle = ref<string>('');
const offerCategoryLabel = ref<string>('');
const formattedStartDate = ref<string>('');
const formattedEndDate = ref<string>('');
const newPrice = ref<number>(0);
const originalPrice = ref<number>(0);
const discountPercentage = ref<number>(0);
const offerDescription = ref<string>('');
const discountCode = ref<string>('');
const offerImageUrl = ref<string | null>(null);
const offerWebsite = ref<string>('');
const offerAddress = ref<string>('');

// Categories (you can expand this as needed)
const categories: Category[] = [
  { value: 1, label: 'Alimentación' },
  { value: 2, label: 'Automoción' },
  { value: 3, label: 'Electrónica' },
  { value: 4, label: 'Hogar' },
  { value: 5, label: 'Moda' },
  { value: 6, label: 'Ocio y Cultura' },
  { value: 7, label: 'Salud' },
];

// Methods
const loadOfferData = async () => {
  try {
    const response = await tesloApi.get(`/offer?filter=type:offer_id:${props.offerId}`);
    const offer: Offer = response.data.result;

    offerTitle.value = offer.title_offer || 'Título no disponible';
    offerCategoryLabel.value =
      categories.find((cat) => cat.value === offer.id_category_offer)?.label ||
      'Categoría no disponible';
    formattedStartDate.value = formatDate(offer.start_date_offer);
    formattedEndDate.value = formatDate(offer.end_date_offer);
    newPrice.value = offer.new_price_offer || 0;
    originalPrice.value = offer.original_price_offer || 0;
    discountPercentage.value = calculateDiscountPercentage(
      offer.new_price_offer,
      offer.original_price_offer,
    );
    offerDescription.value = offer.description_offer || 'Descripción no disponible';
    discountCode.value = offer.discount_code_offer || 'Sin código disponible';
    offerImageUrl.value = offer.image_offer ? offer.image_offer : null;
    offerWebsite.value = offer.web_offer || 'Sitio web no disponible';
    offerAddress.value = offer.address_offer || 'Dirección no disponible';
  } catch (error) {
    const toast = useToast();
    toast.error('Error al cargar los datos de la oferta');
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES');
};

const calculateDiscountPercentage = (newPrice: number, originalPrice: number): number => {
  if (newPrice <= 0 || originalPrice <= 0) return 0;
  return Math.round(((originalPrice - newPrice) / originalPrice) * 100);
};

onMounted(async () => {
  await nextTick();
  // Subir el scroll al inicio de la página
  window.scrollTo({ top: 0, behavior: 'smooth' });
  loadOfferData();
});

const resetData = () => {
  offerTitle.value = '';
  offerCategoryLabel.value = '';
  formattedStartDate.value = '';
  formattedEndDate.value = '';
  newPrice.value = 0;
  originalPrice.value = 0;
  discountPercentage.value = 0;
  offerDescription.value = '';
  discountCode.value = '';
  offerImageUrl.value = null;
  offerWebsite.value = '';
  offerAddress.value = '';
};

onUnmounted(() => {
  resetData();
});

watch(
  () => props.offerId,
  async (newOfferId, oldOfferId) => {
    if (newOfferId !== oldOfferId) {
      await nextTick();
      window.scrollTo({ top: 0 });
      resetData();
      loadOfferData();
    }
  },
);
</script>
