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
      <v-btn v-if="!user" @click="goToRegister" color="secondary" large outlined>
        Register
      </v-btn>

      <!-- Logout button visible only when user is logged in -->
      <v-btn v-if="user" text @click="logout" color="secondary" large outlined>
        Logout
      </v-btn>
    </v-app-bar>

    <!-- Feedback Button -->
    <feedback-form ref="feedbackForm" />
    <div class="feedback-button-wrapper">
      <v-btn @click="openFeedbackForm" class="feedback-button">
        Give Feedback
      </v-btn>
    </div>

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
import FeedbackForm from './components/FeedbackForm.vue'; // Import the feedback form

// Import PostHog to track events
import posthog from 'posthog-js';

export default {
  components: { FeedbackForm }, // Register the feedback form component
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
    openFeedbackForm() {
      this.$refs.feedbackForm.openDialog(); // Open the feedback form dialog
      posthog.capture('feedback_form_opened', { // Track when the feedback form is opened
        userId: this.user ? this.user.uid : 'guest',
      });
    },
  },
  created() {
    // Handle user authentication state
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
};
</script>

<style>
/* Apply background styling directly to the wrapper element */
.nav-bar {
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

/* Position the feedback button at the bottom right */
.feedback-button-wrapper {
  position: fixed;
  bottom: 20px; /* Distance from the bottom of the screen */
  right: 20px;  /* Distance from the right of the screen */
  z-index: 9999;
}

/* Style the button */
.feedback-button {
  width: auto;  /* Ensures button does not stretch */
  padding: 10px 20px;  /* Adjust padding if necessary */
  height: auto;  /* Ensures height is appropriate */
}
</style>
