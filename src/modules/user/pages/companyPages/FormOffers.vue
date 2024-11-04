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

    <button @click="submitOffer" class="btn btn-primary mt-4">Publicar Oferta</button>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const offerTitle = ref('');
const offerCategory = ref('');
const startDate = ref('');
const endDate = ref('');
const discountCode = ref('');
const offerImage = ref(null);
const offerWebsite = ref('');
const offerAddress = ref('');

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

// Enviar oferta
const submitOffer = () => {
  if (
    !offerTitle.value ||
    !offerCategory.value ||
    !startDate.value ||
    !endDate.value ||
    !offerWebsite.value
  ) {
    toast.error('Por favor, completa todos los campos obligatorios.');
    return;
  }

  // Lógica para enviar la oferta al backend
  toast.success('Oferta publicada con éxito');
};
</script>

<style scoped>
.input-error {
  border-color: red;
}
</style>
