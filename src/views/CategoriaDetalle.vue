<script setup>
const props = defineProps({
    id: {
        type: String,
        default: null
    },
    techId: {
        type: String,
        default: null
    },
    filtro: {
        type: String,
        default: 'Todas'
    }
});
</script>

<template>
  <div>
    <h1>Categoría Detalle</h1>
    <p v-if="id">ID de la categoría: {{ id }}</p>
    <p v-if="techId">Tech ID: {{ techId }}</p>
    <p>Filtro: {{ filtro }}</p>
  </div>
</template>