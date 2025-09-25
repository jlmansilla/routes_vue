<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const login = () => {
  // Simulamos login exitoso
  localStorage.setItem('isAuthenticated', 'true');
  router.push('/admin');
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <button @click="login">Iniciar Sesión</button>
  </div>
</template>