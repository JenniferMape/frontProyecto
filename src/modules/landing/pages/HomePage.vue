<template>
  <div class="container mx-auto p-4">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
import ProductCard from '@/modules/products/components/ProductCard.vue';

const products = [
  {
    id: 1,
    title: 'Procesador AMD Ryzen 5 5600 4.4GHz Socket AM4 Boxed',
    description: 'Características Plataforma: Computadora de escritorio...',
    price: '100.95',
    oldPrice: '120.00',
    store: 'Coolmod',
    time: 'hace 32m',
    image: 'https://via.placeholder.com/150',
    storeAvatar: 'https://via.placeholder.com/50',
    comments: 10,
  },
  {
    id: 2,
    title: '20 días-Japón-Tokio, Hakone, Kioto, Hiroshima, Osaka y Okinawa.',
    description: 'Muy buen precio para este viaje a Japón...',
    price: '1375',
    store: 'viajarcaribe',
    time: 'hace 1h 10m',
    image: 'https://via.placeholder.com/150',
    storeAvatar: 'https://via.placeholder.com/50',
    comments: 20,
  },
  {
    id: 3,
    title: 'Apple iPhone 14 Pro Max 128GB',
    description: 'El nuevo iPhone con un increíble rendimiento y cámara...',
    price: '1299.99',
    oldPrice: '1399.99',
    store: 'Apple Store',
    time: 'hace 2h',
    image: 'https://via.placeholder.com/150',
    storeAvatar: 'https://via.placeholder.com/50',
    comments: 34,
  },
  {
    id: 4,
    title: 'TV Samsung 65" QLED 4K Smart TV',
    description: 'Disfruta de una calidad de imagen impresionante...',
    price: '899.00',
    oldPrice: '999.99',
    store: 'MediaMarkt',
    time: 'hace 4h',
    image: 'https://via.placeholder.com/150',
    storeAvatar: 'https://via.placeholder.com/50',
    comments: 42,
  },
  {
    id: 5,
    title: 'PlayStation 5 Edición Digital',
    description: 'Consola de última generación con gráficos impresionantes...',
    price: '499.99',
    store: 'Game',
    time: 'hace 3h 30m',
    image: 'https://via.placeholder.com/150',
    storeAvatar: 'https://via.placeholder.com/50',
    comments: 55,
  },
  {
    id: 6,
    title: 'Nike Air Max 270 React',
    description: 'Zapatillas deportivas cómodas y con estilo...',
    price: '149.99',
    store: 'Nike',
    time: 'hace 50m',
    image: 'https://via.placeholder.com/150',
    storeAvatar: 'https://via.placeholder.com/50',
    comments: 18,
  },
  {
    id: 7,
    title: 'Laptop Dell XPS 13 9310',
    description: 'Laptop ultraligera con pantalla InfinityEdge...',
    price: '1499.99',
    oldPrice: '1599.99',
    store: 'Dell Store',
    time: 'hace 5h',
    image: 'https://via.placeholder.com/150',
    storeAvatar: 'https://via.placeholder.com/50',
    comments: 22,
  },
  {
    id: 8,
    title: 'Cámara Sony Alpha 7 III',
    description: 'Cámara mirrorless de fotograma completo...',
    price: '1999.99',
    store: 'Sony',
    time: 'hace 6h 15m',
    image: 'https://via.placeholder.com/150',
    storeAvatar: 'https://via.placeholder.com/50',
    comments: 75,
  },
  {
    id: 9,
    title: 'Reloj Garmin Fenix 6 Pro',
    description: 'Reloj multideporte con GPS y funciones avanzadas...',
    price: '499.99',
    store: 'Garmin',
    time: 'hace 1h 45m',
    image: 'https://via.placeholder.com/150',
    storeAvatar: 'https://via.placeholder.com/50',
    comments: 28,
  },
  {
    id: 10,
    title: 'Mochila Herschel Little America',
    description: 'Mochila de alta calidad ideal para viajes...',
    price: '99.99',
    store: 'Amazon',
    time: 'hace 2h 20m',
    image: 'https://via.placeholder.com/150',
    storeAvatar: 'https://via.placeholder.com/50',
    comments: 12,
  },
];
</script>
