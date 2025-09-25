<script setup>
import { ref, onMounted } from 'vue';

const featuredRecipes = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    // Obtener recetas populares para mostrar en el hero
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    featuredRecipes.value = Array.isArray(data?.meals) ? data.meals.slice(0, 3) : [];
  } catch (error) {
    console.error('Error loading featured recipes:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100">
    <!-- Hero Section con Imagen -->
    <div class="hero min-h-[80vh] relative overflow-hidden">
      <!-- Imagen de fondo -->
      <div class="hero-overlay bg-black/40"></div>
      <div class="hero-content text-center relative z-10">
        <div class="max-w-4xl">
          <!-- Imagen principal del hero -->
          <div class="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Deliciosas recetas de cocina" 
              class="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
          </div>
          
          <h1 class="text-5xl font-bold mb-6 text-white drop-shadow-lg">
            🍳 Recetas Deliciosas
          </h1>
          <p class="text-xl mb-8 text-white/90 drop-shadow-md">
            Descubre miles de recetas increíbles de todo el mundo. 
            Desde platos tradicionales hasta creaciones modernas, 
            encuentra la inspiración perfecta para tu próxima comida.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/categorias" class="btn btn-primary btn-lg shadow-xl">
              📂 Explorar Categorías
            </router-link>
            <button class="btn btn-outline btn-lg bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-900" onclick="document.getElementById('features').scrollIntoView()">
              ✨ Ver Características
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <section id="features" class="py-16 bg-gradient-to-r from-green-100 to-blue-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">¿Por qué elegir nuestra plataforma?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center">
              <div class="text-4xl mb-4">🌍</div>
              <h3 class="card-title justify-center">Recetas Globales</h3>
              <p>Accede a recetas auténticas de diferentes culturas y países alrededor del mundo.</p>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center">
              <div class="text-4xl mb-4">⚡</div>
              <h3 class="card-title justify-center">Navegación Rápida</h3>
              <p>Explora categorías y encuentra recetas específicas sin recargar la página.</p>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center">
              <div class="text-4xl mb-4">📱</div>
              <h3 class="card-title justify-center">Totalmente Responsive</h3>
              <p>Disfruta de la mejor experiencia en cualquier dispositivo, móvil o desktop.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Recipes Section -->
    <section class="py-16 bg-gradient-to-r from-purple-100 to-pink-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Recetas Destacadas</h2>
        <div v-if="isLoading" class="flex justify-center py-10">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="recipe in featuredRecipes" :key="recipe.idMeal" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <figure>
              <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="w-full h-48 object-cover" />
            </figure>
            <div class="card-body">
              <h3 class="card-title">{{ recipe.strMeal }}</h3>
              <p class="text-sm opacity-70">{{ recipe.strCategory }} • {{ recipe.strArea }}</p>
              <div class="card-actions justify-end">
                <router-link :to="`/receta/${recipe.idMeal}`" class="btn btn-primary">
                  Ver Receta
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-indigo-500 to-purple-600">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">¿Listo para cocinar?</h2>
        <p class="text-white/90 mb-8 text-lg">
          Explora nuestras categorías y encuentra la receta perfecta para cualquier ocasión.
        </p>
        <router-link to="/categorias" class="btn btn-accent btn-lg">
          🚀 Comenzar a Explorar
        </router-link>
      </div>
    </section>
  </div>
</template>
