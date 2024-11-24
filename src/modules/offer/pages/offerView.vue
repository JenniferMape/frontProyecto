<template>
  <header class="shadow">
    <NavBar>
      <template #logo>
        <LogoNav />
      </template>
      <template #search-bar>
        <div class="flex-grow hidden lg:block"></div>
      </template>
      <template #auth-buttons>
        <AuthButtons />
      </template>

      <template #theme-toggle>
        <ThemeToggle />
      </template>
    </NavBar>
    <NavItems />
  </header>
  <div class="container mx-auto p-4 relative">
    <!-- Tarjeta de la oferta -->
    <div class="card bg-base-100 shadow-xl">
      <!-- Botón de volver en la esquina superior izquierda -->
      <button
        @click="goBack"
        class="btn btn-ghost absolute top-6 left-6 text-secondary text-sm font-bold flex items-center z-10"
      >
        <!-- Icono de flecha -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a1 1 0 0 1-.707-.293l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 1.414L4.414 10l6.293 6.293A1 1 0 0 1 10 18Z"
            clip-rule="evenodd"
          />
        </svg>
        Volver
      </button>

      <div class="card-actions absolute top-6 right-6 flex items-center z-10">
        <div
          v-if="authStore.isClient"
          class="tooltip"
          :data-tip="isFavorite ? '¡Oferta favorita!' : 'Agregar a favoritos'"
        >
          <button
            @click="toggleFavorite"
            class="btn btn-ghost text-secondary text-sm font-bold flex items-center"
            :class="{ 'text-red-500': isFavorite, 'text-gray-500': !isFavorite }"
            aria-label="Marcar como favorita"
          >
            <!-- Icono de corazón -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              :stroke="isFavorite ? 'none' : 'currentColor'"
              :fill="isFavorite ? 'red' : 'none'"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                :d="
                  isFavorite
                    ? 'M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z'
                    : 'M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z'
                "
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Imagen principal -->
      <figure class="p-4 flex justify-center">
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
          {{ newPrice }}€
          <span class="line-through text-gray-500 text-lg ml-2">{{ originalPrice }} €</span>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ------------------------
// Importaciones
// ------------------------
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { useToast } from 'vue-toastification';
import { tesloApi } from '@/api/tesloApi';
import { useRouter } from 'vue-router';
import type { Offer } from '@/modules/products/interfaces/product.interface';

// Componentes
import NavBar from '@/modules/common/components/NavBar/NavBar.vue';
import LogoNav from '@/modules/common/components/NavBar/components/LogoNav.vue';
import AuthButtons from '@/modules/common/components/NavBar/components/AuthButtons/AuthButtons.vue';
import ThemeToggle from '@/modules/common/components/NavBar/components/ThemeToggle.vue';
import NavItems from '@/modules/common/components/NavItems.vue';

// ------------------------
// Definición de Props
// ------------------------
const props = defineProps({
  offerId: {
    type: Number,
    required: true,
  },
});
// Setup variables
const authStore = useAuthStore();
const router = useRouter();
// ------------------------
// Datos reactivos
// ------------------------
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
const isFavorite = ref<boolean>(false);
const userId = authStore.user?.id;
const favoriteId = ref<number | null>(null);

// Categorías
const categories = [
  { value: 1, label: 'Alimentación' },
  { value: 2, label: 'Automoción' },
  { value: 3, label: 'Electrónica' },
  { value: 4, label: 'Hogar' },
  { value: 5, label: 'Moda' },
  { value: 6, label: 'Ocio y Cultura' },
  { value: 7, label: 'Salud' },
];

// ------------------------
// Métodos
// ------------------------
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
// Función para volver atrás
const goBack = () => {
  router.back(); // Va a la página anterior del historial
};

// ------------------------
// Ciclo de vida
// ------------------------
onMounted(async () => {
  await nextTick();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  loadOfferData();
  checkIfFavorite();
});

onUnmounted(() => {
  resetData();
});

// ------------------------
// Observadores
// ------------------------
watch(
  () => props.offerId,
  async (newOfferId, oldOfferId) => {
    if (newOfferId !== oldOfferId) {
      await nextTick();
      window.scrollTo({ top: 0 });
      resetData();
      loadOfferData();
      checkIfFavorite();
    }
  },
);

// ------------------------
// Métodos adicionales
// ------------------------
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

// ------------------------
// Manejo de Favoritos
// ------------------------
const checkIfFavorite = async () => {
  try {
    const response = await tesloApi.get(`/favorite/${userId}`);
    const favorites = response.data.result; // Asumiendo que el backend devuelve un array de favoritos

    const favorite = favorites.find(
      (fav: { id_offer_favorite: number }) => fav.id_offer_favorite === Number(props.offerId),
    );

    if (favorite) {
      isFavorite.value = true;
      favoriteId.value = favorite.id; // Guardar el ID único del favorito
    } else {
      isFavorite.value = false;
      favoriteId.value = null;
    }
  } catch (error) {
    console.error('Error al verificar si es favorito:', error);
  }
};

const toggleFavorite = async () => {
  try {
    const favoriteData = {
      id_user_favorite: Number(userId),
      id_offer_favorite: Number(props.offerId),
    };

    const response = await tesloApi.post(`/favorite`, favoriteData);
    const { status, result, message } = response.data;

    if (status === 201) {
      // Favorito agregado
      isFavorite.value = true;
      favoriteId.value = result.id; // ID del favorito agregado
    } else if (status === 200) {
      // Favorito eliminado
      isFavorite.value = false;
      favoriteId.value = null; // Ya no hay un favorito asociado
    } else {
      console.warn('Respuesta inesperada del servidor:', response.data);
    }
  } catch (error) {
    console.error('Error al procesar favorito:', error);
  }
};
</script>
