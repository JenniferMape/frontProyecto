<template>
  <!-- component -->
  <div class="bg-base-100 flex justify-center items-center h-screen">
    <!-- Left: Image -->
    <div class="w-1/2 h-screen hidden lg:block">
      <img alt="CholloCuenca logo" class="w-full h-auto mr-2" src="@/assets/estampado.svg" />
    </div>
    <!-- Right: Login Form -->
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <RouterView />
    </div>
  </div>
</template>
