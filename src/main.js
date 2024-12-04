// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify'; // Vuetify
import 'vuetify/styles'; // Vuetify styles

import auth from './auth';
import posthog from 'posthog-js';

// Initialize PostHog
posthog.init('phc_RybCEvUVi4UsYkFzuFEaqcWZf437LN4AJt7upjfPOCO', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always',
  capture_pageview: true,
});

router.afterEach((to) => {
  posthog.capture('$pageview', { path: to.path });
});

const app = createApp(App);

// Use Router, Vuetify, and PostHog
app.use(router);
app.use(vuetify);

// Start listening for auth state changes
auth.listenAuthState();

// Mount the app to the DOM
app.mount('#app');
