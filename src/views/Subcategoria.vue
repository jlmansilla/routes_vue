<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  subcategoria: {
    type: String,
    required: true
  }
});

const recipeList = ref([]);
const isLoading = ref(true);
const errorMessage = ref(null);

async function fetchRecipesByCategory(categoryName) {
  isLoading.value = true;
  errorMessage.value = null;
  recipeList.value = [];
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`;
    const response = await fetch(url);
    const data = await response.json();
    recipeList.value = Array.isArray(data?.meals) ? data.meals : [];
  } catch (error) {
    errorMessage.value = 'No se pudieron cargar las recetas. Intenta nuevamente.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => fetchRecipesByCategory(props.subcategoria));
watch(() => props.subcategoria, (newValue) => {
  if (newValue) fetchRecipesByCategory(newValue);
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
    <!-- Botón de navegación de vuelta -->
    <div class="container mx-auto px-4 pt-8">
      <router-link to="/categorias" class="btn btn-outline btn-sm">
        ← Volver a Categorías
      </router-link>
    </div>

    <!-- Hero Section para Subcategoría -->
    <div class="hero bg-gradient-to-r from-green-500/20 to-teal-500/20 py-12">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold mb-4">🍽️ {{ props.subcategoria }}</h2>
          <p class="text-lg text-base-content/80">
            Descubre todas las recetas disponibles en esta categoría
          </p>
        </div>
      </div>
    </div>

    <!-- Grid de Recetas -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div v-if="isLoading" class="flex justify-center py-20">
          <div class="text-center">
            <span class="loading loading-spinner loading-lg"></span>
            <p class="mt-4 text-lg">Cargando recetas...</p>
          </div>
        </div>
        
        <div v-else-if="errorMessage" class="alert alert-error max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
        
        <div v-else-if="recipeList.length === 0" class="text-center py-20">
          <div class="text-6xl mb-4">🍽️</div>
          <h3 class="text-2xl font-bold mb-2">No hay recetas disponibles</h3>
          <p class="text-base-content/70">No se encontraron recetas para esta categoría.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="meal in recipeList" :key="meal.idMeal" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <figure class="relative overflow-hidden">
              <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-white font-bold text-lg drop-shadow-lg">{{ meal.strMeal }}</h3>
              </div>
            </figure>
            <div class="card-body">
              <div class="card-actions justify-end">
                <router-link :to="`/receta/${meal.idMeal}`" class="btn btn-primary btn-sm">
                  Ver Detalle
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
