<template>
  <!-- component -->
  <section class="text-gray-600 body-font relative flex flex-1 h-full">
    <div class="absolute inset-0 bg-gray-300">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="map"
        scrolling="no"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1815.3321612191226!2d-2.1438488044532225!3d40.075130735433355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5d67599ff68f7f%3A0x51dc89bc62923f49!2sCIFP%20N%C2%BA%201!5e0!3m2!1ses!2ses!4v1727893751467!5m2!1ses!2ses"
        style=""
      ></iframe>
    </div>
    <div class="container px-5 py-24 mx-auto flex">
      <div
        class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md"
      >
        <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Contáctanos</h2>
        <p class="leading-relaxed mb-5 text-gray-600">¿Sobre qué asunto nos contactas?</p>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">Tu correo</label>
          <input
            type="email"
            id="email"
            name="email"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class="relative mb-4">
          <label for="message" class="leading-7 text-sm text-gray-600">Tu mensaje</label>
          <textarea
            id="message"
            name="message"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
        <button
          class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Enviar mensaje
        </button>
        <p class="text-xs text-gray-500 mt-3">
          Recuerda que te estás poniendo en contacto con CholloCuenca y no con alguna tienda.
        </p>
      </div>
    </div>
  </section>
</template>
