<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const meal = ref(null);
const isLoading = ref(true);
const errorMessage = ref(null);

function buildIngredientsList(mealData) {
  const items = [];
  for (let index = 1; index <= 20; index += 1) {
    const ingredient = mealData[`strIngredient${index}`];
    const measure = mealData[`strMeasure${index}`];
    if (ingredient && ingredient.trim()) {
      const line = measure && measure.trim() ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim();
      items.push(line);
    }
  }
  return items;
}

async function fetchMealDetails(id) {
  isLoading.value = true;
  errorMessage.value = null;
  meal.value = null;
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`;
    const response = await fetch(url);
    const data = await response.json();
    const mealData = Array.isArray(data?.meals) ? data.meals[0] : null;
    if (!mealData) {
      throw new Error('Receta no encontrada');
    }
    meal.value = {
      ...mealData,
      ingredients: buildIngredientsList(mealData)
    };
  } catch (error) {
    errorMessage.value = 'No se pudo cargar el detalle de la receta.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => fetchMealDetails(props.id));
watch(() => props.id, (newValue) => {
  if (newValue) fetchMealDetails(newValue);
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100">
    <!-- Hero Section para Detalle de Receta -->
    <div v-if="meal" class="hero bg-gradient-to-r from-red-500/20 to-orange-500/20 py-16">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <h1 class="text-4xl font-bold mb-4">{{ meal.strMeal }}</h1>
          <div class="flex flex-wrap justify-center gap-4 text-sm opacity-80">
            <span class="badge badge-primary">{{ meal.strCategory }}</span>
            <span class="badge badge-secondary">{{ meal.strArea }}</span>
          </div>
        </div>
      </div>
    </div>

    <section class="py-8">
      <div class="container mx-auto px-4">
        <div v-if="isLoading" class="flex justify-center py-20">
          <div class="text-center">
            <span class="loading loading-spinner loading-lg"></span>
            <p class="mt-4 text-lg">Cargando receta...</p>
          </div>
        </div>
        
        <div v-else-if="errorMessage" class="alert alert-error max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
        
        <div v-else-if="meal" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Imagen de la Receta -->
          <div class="card bg-base-100 shadow-xl">
            <figure class="relative">
              <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full h-96 object-cover" />
              <div class="absolute top-4 right-4">
                <div class="badge badge-accent badge-lg">{{ meal.strCategory }}</div>
              </div>
            </figure>
            <div class="card-body">
              <h2 class="card-title text-2xl">{{ meal.strMeal }}</h2>
              <div class="flex flex-wrap gap-2">
                <div class="badge badge-outline">{{ meal.strCategory }}</div>
                <div class="badge badge-outline">{{ meal.strArea }}</div>
              </div>
            </div>
          </div>

          <!-- Información de la Receta -->
          <div class="space-y-6">
            <!-- Ingredientes -->
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title text-xl mb-4">🛒 Ingredientes</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div v-for="(ingredient, index) in meal.ingredients" :key="index" class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full"></div>
                    <span class="text-sm">{{ ingredient }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Instrucciones -->
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title text-xl mb-4">👨‍🍳 Instrucciones</h3>
                <div class="prose max-w-none">
                  <p class="whitespace-pre-line leading-relaxed">{{ meal.strInstructions }}</p>
                </div>
              </div>
            </div>

            <!-- Enlaces Externos -->
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title text-xl mb-4">🔗 Enlaces Útiles</h3>
                <div class="flex flex-wrap gap-4">
                  <a v-if="meal.strSource" class="btn btn-outline btn-sm" :href="meal.strSource" target="_blank" rel="noreferrer">
                    📖 Fuente Original
                  </a>
                  <a v-if="meal.strYoutube" class="btn btn-error btn-sm" :href="meal.strYoutube" target="_blank" rel="noreferrer">
                    🎥 Ver en YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
