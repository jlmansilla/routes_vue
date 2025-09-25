<script setup>
import { ref, onMounted } from 'vue';

const categoryList = ref([]);
const isLoadingCategories = ref(true);
const errorMessage = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    categoryList.value = Array.isArray(data?.categories) ? data.categories : [];
  } catch (error) {
    errorMessage.value = 'No se pudieron cargar las categorías. Intenta nuevamente.';
  } finally {
    isLoadingCategories.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
    <!-- Hero Section para Categorías -->
    <div class="hero bg-gradient-to-r from-blue-500/20 to-purple-500/20 py-16">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <h1 class="text-4xl font-bold mb-4">📂 Categorías de Recetas</h1>
          <p class="text-lg text-base-content/80">
            Explora diferentes tipos de comida y descubre recetas increíbles organizadas por categorías.
          </p>
        </div>
      </div>
    </div>

    <!-- Categorías Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div v-if="isLoadingCategories" class="flex justify-center py-20">
          <div class="text-center">
            <span class="loading loading-spinner loading-lg"></span>
            <p class="mt-4 text-lg">Cargando categorías...</p>
          </div>
        </div>
        
        <div v-else-if="errorMessage" class="alert alert-error max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="category in categoryList"
            :key="category.idCategory"
            class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <figure class="relative overflow-hidden">
              <img 
                :src="category.strCategoryThumb" 
                :alt="category.strCategory" 
                class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <h2 class="text-white font-bold text-lg drop-shadow-lg">{{ category.strCategory }}</h2>
              </div>
            </figure>
            <div class="card-body">
              <p class="text-sm opacity-80 line-clamp-3">
                {{ (category.strCategoryDescription || '').slice(0, 120) }}
                {{ (category.strCategoryDescription || '').length > 120 ? '...' : '' }}
              </p>
              <div class="card-actions justify-end mt-4">
                <router-link 
                  class="btn btn-primary btn-sm" 
                  :to="`/categorias/${encodeURIComponent(category.strCategory)}`"
                >
                  Ver Recetas
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>