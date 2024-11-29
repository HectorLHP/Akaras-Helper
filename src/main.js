// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify'; // Set up Vuetify
import 'vuetify/styles'; // Import Vuetify styles

// Import authentication logic
import auth from './auth';

// Initialize the app
const app = createApp(App);

// Use Vue Router and Vuetify
app.use(router);
app.use(vuetify);

// Start listening for auth state changes
auth.listenAuthState();

// Mount the app
app.mount('#app');
