<template>
  <v-app>
    <v-app-bar
      :elevation="20"
      app
      scroll-behavior="hide"
      scroll-threshold="10"
      class="nav-bar"
      color="black"
    >
      <v-btn color="secondary" @click="$router.push('/')"> Home </v-btn>
      <v-toolbar-title>Akara's Helper</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- Welcome message visible only when user is logged in -->
      <v-btn v-if="user" text color="secondary" large outlined>
        Welcome, {{ user.displayName || 'User' }}
      </v-btn>

      <!-- Login and Register buttons visible only when no user is logged in -->
      <v-btn v-if="!user" @click="goToLogin" color="secondary" large outlined>
        Login
      </v-btn>
      <v-btn
        v-if="!user"
        @click="goToRegister"
        color="secondary"
        large
        outlined
      >
        Register
      </v-btn>

      <!-- Logout button visible only when user is logged in -->
      <v-btn v-if="user" text @click="logout" color="secondary" large outlined>
        Logout
      </v-btn>
    </v-app-bar>

    <div>
      <v-container fluid>
        <router-view />
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { auth } from './auth'; // Ensure the path is correct
import { onAuthStateChanged } from 'firebase/auth'; // Import from Firebase directly

export default {
  data() {
    return {
      user: null, // Store user info here
    };
  },
  methods: {
    logout() {
      auth.signOut(); // Sign out the user
    },
    goToLogin() {
      this.$router.push('/login'); // Route to the login page
    },
    goToRegister() {
      this.$router.push('/register'); // Route to the register page
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
};
</script>

<style>
/* Apply background styling directly to the wrapper element */

/* Make the Vuetify app layout transparent */

.nav-bar {
  /* background-image: url('/images/background3.png') !important; */
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  height: 64px; /* Adjust to match your toolbar's height */
}

.v-application {
  background-color: transparent;
  box-shadow: none;
}
.v-container {
  padding: 0 !important; /* Remove the default padding */
}
</style>
