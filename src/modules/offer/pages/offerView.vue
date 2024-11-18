<template>
  <div class="container mx-auto p-4">
    <div class="card bg-base-100 shadow-xl">
      <!-- Imagen principal -->
      <figure class="p-4">
        <img
          :src="offerImageUrl || 'default-image.jpg'"
          alt="Imagen de la oferta"
          class="rounded-lg object-cover"
        />
      </figure>

      <!-- Información de la oferta -->
      <div class="card-body p-6">
        <h2 class="card-title text-2xl font-bold">{{ offerTitle }}</h2>

        <div class="text-2xl font-semibold text-orange-500 mb-2">
          {{ newPrice | currency }}
          <span class="line-through text-gray-500 text-lg ml-2">{{
            originalPrice | currency
          }}</span>
          <span class="text-lg text-green-600">(-{{ discountPercentage }}%)</span>
        </div>

        <p class="text-gray-600">{{ offerCategoryLabel }}</p>

        <!-- Botón para ir al enlace de la oferta -->
        <div class="card-actions mt-4">
          <a :href="offerWebsite" target="_blank" class="btn btn-primary w-full"> Ir al chollo </a>
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
        <button
          @click="goBack"
          class="btn btn-secondary mt-6 w-full hover:bg-primary transition-colors duration-200"
        >
          Volver
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { tesloApi } from '@/api/tesloApi';
import { useRouter } from 'vue-router';

// Props
const props = defineProps({
  offerId: {
    type: String,
    required: true,
  },
});

// Reactive data
const offerTitle = ref('');
const offerCategoryLabel = ref('');
const formattedStartDate = ref('');
const formattedEndDate = ref('');
const newPrice = ref('');
const originalPrice = ref('');
const discountPercentage = ref('');
const offerDescription = ref('');
const discountCode = ref('');
const offerImageUrl = ref(null);
const offerWebsite = ref('');
const offerAddress = ref('');

// Categories (you can expand this as needed)
const categories = [
  { value: '1', label: 'Alimentación' },
  { value: '2', label: 'Automoción' },
  { value: '3', label: 'Electrónica' },
  { value: '4', label: 'Hogar' },
  { value: '5', label: 'Moda' },
  { value: '6', label: 'Ocio y Cultura' },
  { value: '7', label: 'Salud' },
];

// Methods
const loadOfferData = async () => {
  try {
    const response = await tesloApi.get(`/offer?filter=type:offer_id:${props.offerId}`);
    const offer = response.data.result;

    offerTitle.value = offer.title_offer || 'No disponible';
    offerCategoryLabel.value =
      categories.find((cat) => cat.value === offer.id_category_offer)?.label || 'No disponible';
    formattedStartDate.value = formatDate(offer.start_date_offer);
    formattedEndDate.value = formatDate(offer.end_date_offer);
    newPrice.value = offer.new_price_offer || 0;
    originalPrice.value = offer.original_price_offer || 0;
    discountPercentage.value = calculateDiscountPercentage(offer.new_price_offer, offer.original_price_offer);
    offerDescription.value = offer.description_offer || 'No disponible';
    discountCode.value = offer.discount_code_offer || 'No disponible';
    offerImageUrl.value = offer.image_offer || null;
    offerWebsite.value = offer.web_offer || 'No disponible';
    offerAddress.value = offer.address_offer || 'No disponible';
  } catch (error) {
    const toast = useToast();
    toast.error('Error al cargar los datos de la oferta');
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES');
};

const calculateDiscountPercentage = (newPrice, originalPrice) => {
  if (!newPrice || !originalPrice) return 0;
  return Math.round(((originalPrice - newPrice) / originalPrice) * 100);
};


const goBack = () => {
  const router = useRouter();
  router.push({ name: 'home' });
};

// Load offer data on component mount
onMounted(() => {
  loadOfferData();
});
</script>
