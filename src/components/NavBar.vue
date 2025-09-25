<template>
  <nav class="navbar bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg h-16">
    <div class="navbar-start">
      <router-link to="/" class="btn btn-ghost normal-case text-lg text-white font-bold px-2 hover:bg-white/20 flex items-center gap-2">
        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          🍳
        </div>
        Recetas
      </router-link>
    </div>
    
    <div class="navbar-center flex-1">
      <div class="flex space-x-4">
        <router-link to="/" class="text-white hover:text-yellow-300 font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/20">
          🏠 Inicio
        </router-link>
        <router-link to="/categorias" class="text-white hover:text-yellow-300 font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/20">
          📂 Categorías
        </router-link>
      </div>
    </div>
    
    <div class="navbar-end">
      <div class="flex items-center gap-3">
        <div class="badge badge-warning badge-sm text-black">API Gratuita</div>
        <a class="btn btn-warning btn-sm text-black" href="https://www.themealdb.com/api.php" target="_blank" rel="noreferrer">
          🔗 API
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.router-link-active {
  @apply text-yellow-300 font-bold bg-white/20;
}

/* Asegurar que el texto sea visible */
.navbar {
  color: white;
}

.navbar a {
  color: white !important;
}

.navbar .btn {
  color: white !important;
}

.navbar .menu a {
  color: white !important;
}
</style>