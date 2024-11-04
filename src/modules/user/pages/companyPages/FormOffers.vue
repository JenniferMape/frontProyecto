<template>
  <!-- Offer Form -->
  <section class="w-3/4 bg-white shadow-md p-6 rounded-lg ml-6">
    <h2 class="font-bold text-xl mb-6">Nueva Oferta</h2>

    <div class="form-control mb-4">
      <label class="label">
        <span class="label-text">Título de la oferta</span>
      </label>
      <input
        v-model="offerTitle"
        type="text"
        class="input input-bordered"
        placeholder="Ej: Descuento en ropa"
      />
    </div>

    <div class="form-control mb-4">
      <label class="label">
        <span class="label-text">Categoría de la oferta</span>
      </label>
      <select v-model="offerCategory" class="select select-bordered">
        <option disabled selected>Selecciona una categoría</option>
        <option v-for="category in categories" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>
    </div>

    <div class="flex gap-4 mb-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Fecha de inicio</span>
        </label>
        <input v-model="startDate" type="date" class="input input-bordered" />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Fecha de finalización</span>
        </label>
        <input v-model="endDate" type="date" class="input input-bordered" />
      </div>
    </div>

    <div class="form-control mb-4">
      <label class="label">
        <span class="label-text">Precio</span>
      </label>
      <input
        v-model="price"
        type="number"
        class="input input-bordered"
        placeholder="Ej: 10.00"
        min="0"
        step="0.01"
      />
    </div>

    <div class="form-control mb-4">
      <label class="label">
        <span class="label-text">Descripción de la oferta</span>
      </label>
      <textarea
        v-model="offerDescription"
        class="textarea textarea-bordered"
        placeholder="Escribe una descripción detallada de la oferta"
        rows="4"
      ></textarea>
    </div>

    <div class="form-control mb-4">
      <label class="label">
        <span class="label-text">Código de descuento</span>
      </label>
      <input
        v-model="discountCode"
        type="text"
        class="input input-bordered"
        placeholder="Ej: DESCUENTO10"
      />
    </div>

    <div class="form-control mb-4">
      <label class="label">
        <span class="label-text">Imagen de la oferta</span>
      </label>
      <input type="file" @change="uploadOfferImage" ref="offerImageInput" class="hidden" />
      <button @click="$refs.offerImageInput.click()" class="btn btn-outline">Subir Imagen</button>
    </div>

    <div class="form-control mb-4">
      <label class="label">
        <span class="label-text">Página web de la oferta</span>
      </label>
      <input
        v-model="offerWebsite"
        type="url"
        class="input input-bordered"
        placeholder="Ej: https://ejemplo.com"
      />
    </div>

    <div class="form-control mb-4">
      <label class="label">
        <span class="label-text">Dirección de la oferta</span>
      </label>
      <input
        v-model="offerAddress"
        type="text"
        class="input input-bordered"
        placeholder="Ej: Calle Falsa 123"
      />
    </div>

    <button @click="createOfferPayload" class="btn btn-primary mt-4">Publicar Oferta</button>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { tesloApi } from '@/api/tesloApi';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/modules/auth/composables/useAuthAction';

const router = useRouter();
const authStore = useAuthStore();

const toast = useToast();
const offerTitle = ref('');
const offerCategory = ref('');
const startDate = ref('');
const endDate = ref('');
const price = ref('');
const offerDescription = ref('');
const discountCode = ref('');
const offerImage = ref(null);
const offerWebsite = ref('');
const offerAddress = ref('');
const id = authStore.user?.id;

const categories = [
  { value: '1', label: 'Alimentación' },
  { value: '2', label: 'Automoción' },
  { value: '3', label: 'Electrónica' },
  { value: '4', label: 'Hogar' },
  { value: '5', label: 'Moda' },
  { value: '6', label: 'Ocio y Cultura' },
  { value: '7', label: 'Salud' },
];

// Manejo de imagen de la oferta
const uploadOfferImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    offerImage.value = file;
  }
};

// Función para formatear fechas
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19).replace('T', ' '); // Formato "YYYY-MM-DD HH:mm:ss"
};

// Crear objeto de la oferta y hacer la petición al backend
const createOfferPayload = async () => {
  // Verificar si todos los campos obligatorios están completados
  if (
    !offerTitle.value ||
    !offerCategory.value ||
    !startDate.value ||
    !endDate.value ||
    !price.value ||
    !offerDescription.value ||
    !offerWebsite.value
  ) {
    toast.error('Por favor, completa todos los campos obligatorios.');
    return;
  }

  // Crear un objeto FormData para manejar los datos, incluyendo la imagen
  const formData = new FormData();
  formData.append('id_company_offer', id);
  formData.append('id_category_offer', offerCategory.value);
  formData.append('title_offer', offerTitle.value);
  formData.append('price_offer', price.value);
  formData.append('description_offer', offerDescription.value);
  formData.append('start_date_offer', formatDateTime(startDate.value)); 
  formData.append('end_date_offer', formatDateTime(endDate.value)); 
  formData.append('discount_code_offer', discountCode.value || null);
  formData.append('web_offer', offerWebsite.value || null);
  formData.append('address_offer', offerAddress.value || null);

  // Agregar imagen si existe
  if (offerImage.value) {
    formData.append('image_offer', offerImage.value);
  }

  try {
    // Realizar la petición POST al backend
    const response = await tesloApi.post('/offer', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });

    // Manejo de la respuesta
    if (response.status === 201) { 
      const result = response.data; 
      toast.success('Oferta publicada con éxito');
      router.push({ name: 'companyOffers' });
    } else {
      toast.error(`Error: ${response.data.error}`); 
    }
  } catch (error) {
    toast.error('Hubo un error al enviar la oferta. Inténtalo nuevamente.');
    console.error('Error en la solicitud:', error);
  }
};


</script>