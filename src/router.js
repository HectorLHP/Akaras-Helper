import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import RingSection from './components/RingSection.vue';
import LoginPage from './components/LoginPage.vue'; // Add LoginPage import
import RegisterPage from './components/RegisterPage.vue'; // Add RegisterPage import
import TermsConditions from './components/TermsConditions.vue';
import PrivacyPolicy from './components/PrivacyPolicy.vue';

const routes = [
  {
    path: '/home', // This will now be the landing page
    name: 'Home',
    component: HomePage, // Make sure HomePage is correctly imported
  },
  {
    path: '/',
    redirect: '/home', // Redirect any access to / to /home
  },
  ,
  { path: '/rings', component: RingSection },
  { path: '/login', component: LoginPage }, // Define route for login
  { path: '/register', component: RegisterPage }, // Define route for register
  { path: '/terms-and-conditions', component: TermsConditions },
  { path: '/privacy-policy', component: PrivacyPolicy },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
