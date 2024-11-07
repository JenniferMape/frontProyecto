<template>
  <!-- Offer Form -->
  <section class="w-3/4 bg-white shadow-md p-6 rounded-lg ml-6">
    <h2 class="font-bold text-xl mb-6">{{ isEditMode ? 'Editar Oferta' : 'Nueva Oferta' }}</h2>

    <!-- Campos del formulario -->
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

      <!-- Contenedor centrado para la vista previa de la imagen -->
      <div v-if="offerImageUrl" class="flex justify-center mb-4">
        <img
          :src="offerImageUrl"
          alt="Vista previa de la imagen de la oferta"
          class="w-40 h-40 object-cover rounded-md shadow-md"
        />
      </div>

      <!-- Botón de subir imagen que ocupa todo el ancho -->
      <div class="flex flex-col space-y-2">
        <button @click="triggerFileInput" class="btn btn-outline w-full">
          {{ offerImageUrl ? 'Cambiar Imagen' : 'Subir Imagen' }}
        </button>
        <button v-if="offerImageUrl" @click="removeImage" class="btn btn-error btn-outline w-full">
          Eliminar Imagen
        </button>
      </div>

      <!-- Input de archivo para subir la imagen -->
      <input type="file" @change="handleImageChange" ref="offerImageInput" class="hidden" />
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

    <!-- Botón para crear o actualizar oferta -->
    <button @click="handleOfferAction" class="btn btn-primary mt-4">
      {{ isEditMode ? 'Guardar Cambios' : 'Publicar Oferta' }}
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { tesloApi } from '@/api/tesloApi';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/modules/auth/composables/useAuthAction';

// Setup variables
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// Local state
const offerTitle = ref('');
const offerCategory = ref('');
const startDate = ref('');
const endDate = ref('');
const price = ref('');
const offerDescription = ref('');
const discountCode = ref('');
const offerImage = ref(null);
const offerImageUrl = ref(null);
const offerImageInput = ref(null);
const offerWebsite = ref('');
const offerAddress = ref('');
const id = authStore.user?.id;

// Categories
const categories = [
  { value: '1', label: 'Alimentación' },
  { value: '2', label: 'Automoción' },
  { value: '3', label: 'Electrónica' },
  { value: '4', label: 'Hogar' },
  { value: '5', label: 'Moda' },
  { value: '6', label: 'Ocio y Cultura' },
  { value: '7', label: 'Salud' },
];

// Props
const props = defineProps({
  offerId: {
    type: String,
    default: null,
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
});

// Create a local reactive variable for isEditMode
const isEditMode = ref(props.isEditMode);

// Watch for changes to isEditMode prop
watch(
  () => props.isEditMode,
  (newVal) => {
    isEditMode.value = newVal;
  },
);

// Load offer data on mounted
onMounted(() => {
  if (props.isEditMode && props.offerId) {
    loadOfferData();
  }
});

function triggerFileInput() {
  // Activa el input de archivo
  offerImage.value = null;
  offerImageUrl.value = null;
  offerImageInput.value.click();
}

function handleImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    offerImage.value = file;
    offerImageUrl.value = URL.createObjectURL(file); // Crea una URL para la vista previa de la imagen
  }
}

function removeImage() {
  // Elimina la imagen seleccionada
  offerImage.value = null;
  offerImageUrl.value = null;
}
// Load offer data
const loadOfferData = async () => {
  try {
    const response = await tesloApi.get(`/offer?filter=type:offer_id:${props.offerId}`);
    const offer = response.data.result;

    offerTitle.value = offer.title_offer;
    offerCategory.value = offer.id_category_offer;
    startDate.value = offer.start_date_offer.split(' ')[0]; // Solo toma la fecha (yyyy-MM-dd)
    endDate.value = offer.end_date_offer.split(' ')[0];
    price.value = offer.price_offer;
    offerDescription.value = offer.description_offer;
    discountCode.value = offer.discount_code_offer;
    offerWebsite.value = offer.web_offer;
    offerAddress.value = offer.address_offer;
  } catch (error) {
    toast.error('Error al cargar los datos de la oferta');
  }
};

// Handle image upload
const uploadOfferImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    offerImage.value = file;
  }
};

// Format date
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

// Handle offer action
const handleOfferAction = () => {
  isEditMode.value ? updateOfferPayload() : createOfferPayload();
};

// Create offer payload
const createOfferPayload = async () => {
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

  if (offerImage.value) {
    formData.append('image_offer', offerImage.value);
  }

  try {
    const response = await tesloApi.post('/offer', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.status === 201) {
      toast.success('Oferta publicada con éxito');
      router.push({ name: 'companyOffers' });
    } else {
      toast.error(`Error: ${response.data.error}`);
    }
  } catch (error) {
    toast.error('Hubo un error al enviar la oferta.');
  }
};

// Update offer payload
const updateOfferPayload = async () => {
  // Datos del formulario en un objeto
  const data = {
    id: props.offerId,
    id_category_offer: offerCategory.value,
    title_offer: offerTitle.value,
    price_offer: price.value,
    description_offer: offerDescription.value,
    start_date_offer: formatDateTime(startDate.value),
    end_date_offer: formatDateTime(endDate.value),
    discount_code_offer: discountCode.value || null,
    web_offer: offerWebsite.value || null,
    address_offer: offerAddress.value || null,
  };

  // Si hay una imagen seleccionada, convertirla a base64 o añadir la URL
  if (offerImage.value) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result.split(',')[1]; // Obtener solo la parte base64
      const imageData = { image_offer: imageBase64 }; // Aquí puedes ajustar según cómo deseas manejar la imagen

      // Agregar la imagen al objeto de datos
      const payload = { ...data, ...imageData };

      try {
        const response = await tesloApi.put('/offer', JSON.stringify(payload), {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          console.log('Oferta actualizada con éxito');
          // Realizar alguna acción después de la actualización exitosa
        } else {
          console.error('Error al actualizar la oferta');
        }
      } catch (error) {
        console.error('Hubo un error con la solicitud:', error);
      }
    };

    reader.readAsDataURL(offerImage.value); // Leer la imagen como base64
  } else {
    // Si no hay imagen, solo enviar los datos
    try {
      const response = await tesloApi.put('/offer', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Oferta actualizada con éxito');
        // Realizar alguna acción después de la actualización exitosa
      } else {
        console.error('Error al actualizar la oferta');
      }
    } catch (error) {
      console.error('Hubo un error con la solicitud:', error);
    }
  }
};
</script>
