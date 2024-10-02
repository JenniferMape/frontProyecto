<template>
  <div class="flex bg-base-100 shadow-lg rounded-lg overflow-hidden mb-4 h-40">
    <!-- Imagen del producto -->
    <div class="w-1/3">
      <img class="w-full h-full object-cover" :src="product.image" :alt="product.title" />
    </div>

    <!-- Contenido de la tarjeta -->
    <div class="w-2/3 p-4 flex flex-col justify-between">
      <!-- Sección del tiempo en la esquina superior derecha -->
      <div class="flex justify-between">
        <span class="text-sm text-gray-400 ml-auto">{{ product.time }}</span>
      </div>

      <!-- Título del producto -->
      <h2 class="text-md font-bold text-gray-900 line-clamp-1">{{ product.title }}</h2>

      <!-- Precio y tienda -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <!-- Precio -->
          <span class="text-lg font-semibold text-primary">{{ product.price }}€</span>
          <!-- Precio original tachado (opcional) -->
          <span v-if="product.oldPrice" class="text-sm line-through text-gray-500"
            >{{ product.oldPrice }}€</span
          >
        </div>
      </div>

      <!-- Descripción del producto -->
      <p class="text-sm text-gray-600 line-clamp-2">{{ product.description }}</p>

      <!-- Sección acciones -->
      <div class="flex justify-between items-center mt-2">
        <div class="flex items-center space-x-2">
          <!-- Avatar del Vendedor -->
          <img :src="product.storeAvatar" alt="avatar" class="w-8 h-8 rounded-full object-cover" />
          <!-- Vendedor -->
          <span class="text-xs text-orange-500">{{ product.store }}</span>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Comentarios -->
          <div class="flex items-center space-x-1">
            <i class="far fa-comment-alt text-gray-500"></i>
            <span class="text-sm">{{ product.comments }}</span>
          </div>

          <!-- Botón para ver la oferta -->
          <button class="btn btn-warning btn-sm">Ir al chollo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      title: 'Título del producto',
      description: 'Descripción corta del producto...',
      price: '100.95',
      oldPrice: '120.00',
      store: 'Coolmod',
      time: 'hace 32m',
      image: 'https://via.placeholder.com/150',
      userName: 'Tatsuya',
      userAvatar: 'https://via.placeholder.com/50',
      comments: 10,
    }),
  },
});
</script>

<style scoped>
.h-40 {
  height: 10rem; /* Ajusta la altura */
}
</style>
