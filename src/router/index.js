import { createRouter, createWebHistory } from 'vue-router';

import Inicio from '../views/Inicio.vue';
import Categorias from '../views/Categorias.vue';
import Subcategoria from '../views/Subcategoria.vue';
import DetalleReceta from '../views/DetalleReceta.vue';
import PerfilAutor from '../views/PerfilAutor.vue';

const routes = [
  { path: '/', component: Inicio, alias: '/inicio' },
  { path: '/categorias', component: Categorias },
  { 
    path: '/categorias/:subcategoria', 
    component: Subcategoria, 
    props: true 
  },
  {
    path: '/receta/:id',
    component: DetalleReceta,
    props: true
  },
  {
    path: '/autor/:nombre',
    component: PerfilAutor,
    props: true
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;