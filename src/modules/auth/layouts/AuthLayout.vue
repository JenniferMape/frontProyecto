<template>
  <!-- component -->
  <div class="bg-base-200 flex justify-center items-center h-screen">
    <!-- Image -->
    <div class="w-1/2 h-screen hidden lg:block">
      <img alt="CholloCuenca logo" class="w-full h-auto mr-2" src="@/assets/estampado.svg" />
    </div>
    <!-- Login Form -->
    <div class="lg:p-6 md:p-52 sm:20 p-6 w-full lg:w-1/2">
      <div class="max-w-3xl w-full px-8">
        <!-- Imagen del logo -->
        <div class="flex items-center justify-center mb-6">
          <img alt="CholloCuenca logo" class="w-10 h-auto mr-2" src="@/assets/chollo-cuenca.svg" />
          <h2 class="text-3xl font-bold text-white mb-2 col-span-full text-shadow">CholloCuenca</h2>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
