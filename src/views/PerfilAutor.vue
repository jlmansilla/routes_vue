<script setup>
const props = defineProps({
  nombre: {
    type: String,
    required: true
  }
});
</script>

<template>
  <section class="container-app py-8">
    <div class="card bg-base-100 shadow p-6">
      <h1 class="text-3xl font-bold mb-2">Perfil de {{ props.nombre }}</h1>
      <p class="opacity-80">La API de TheMealDB no provee autores, este perfil es de ejemplo.</p>
    </div>
  </section>
</template>
