<template>
  <div class="container mx-auto p-4">
    <section class="bg-white shadow-md p-6 rounded-lg ml-6">
      <h2 class="font-bold text-xl mb-6">Detalles de la Oferta</h2>

      <!-- Título de la oferta -->
      <div class="mb-4">
        <h3 class="font-semibold text-lg">Título:</h3>
        <p>{{ offerTitle }}</p>
      </div>

      <!-- Categoría de la oferta -->
      <div class="mb-4">
        <h3 class="font-semibold text-lg">Categoría:</h3>
        <p>{{ offerCategoryLabel }}</p>
      </div>

      <!-- Fechas de la oferta -->
      <div class="flex gap-4 mb-4">
        <div>
          <h3 class="font-semibold text-lg">Fecha de inicio:</h3>
          <p>{{ formattedStartDate }}</p>
        </div>

        <div>
          <h3 class="font-semibold text-lg">Fecha de finalización:</h3>
          <p>{{ formattedEndDate }}</p>
        </div>
      </div>

      <!-- Precio -->
      <div class="mb-4">
        <h3 class="font-semibold text-lg">Precio:</h3>
        <p>{{ price | currency }}</p>
      </div>

      <!-- Descripción de la oferta -->
      <div class="mb-4">
        <h3 class="font-semibold text-lg">Descripción:</h3>
        <p>{{ offerDescription }}</p>
      </div>

      <!-- Código de descuento -->
      <div class="mb-4">
        <h3 class="font-semibold text-lg">Código de descuento:</h3>
        <p>{{ discountCode || 'No disponible' }}</p>
      </div>

      <!-- Imagen de la oferta -->
      <div v-if="offerImageUrl" class="flex justify-center mb-4">
        <img
          :src="offerImageUrl"
          alt="Imagen de la oferta"
          class="w-40 h-40 object-cover rounded-md shadow-md"
        />
      </div>

      <!-- Página web de la oferta -->
      <div class="mb-4">
        <h3 class="font-semibold text-lg">Página web:</h3>
        <p>
          <a :href="offerWebsite" target="_blank" class="text-blue-500">{{
            offerWebsite || 'No disponible'
          }}</a>
        </p>
      </div>

      <!-- Dirección de la oferta -->
      <div class="mb-4">
        <h3 class="font-semibold text-lg">Dirección:</h3>
        <p>{{ offerAddress || 'No disponible' }}</p>
      </div>

      <button @click="goBack" class="btn btn-secondary mt-4 w-full">Volver</button>
    </section>
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
const price = ref('');
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
    price.value = offer.price_offer || 0;
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

const goBack = () => {
  const router = useRouter();
  router.push({ name: 'companyOffers' });
};

// Load offer data on component mount
onMounted(() => {
  loadOfferData();
});
</script>
