import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './components/LandingPage.vue';
import RingSection from './components/RingSection.vue';
import LoginPage from './components/LoginPage.vue'; // Add LoginPage import
import RegisterPage from './components/RegisterPage.vue'; // Add RegisterPage import

const routes = [
  { path: '/', component: LandingPage },
  { path: '/rings', component: RingSection },
  { path: '/login', component: LoginPage }, // Define route for login
  { path: '/register', component: RegisterPage }, // Define route for register
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
