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

      <!-- Donate Button (Triggers the modal) -->
      <v-btn color="primary" @click="showModal = true">Buy me a coffee</v-btn>

      <!-- Conditional Buttons based on Authentication -->
      <template v-if="user">
        <v-btn text color="secondary" large outlined>
          Welcome, {{ userEmail }}
        </v-btn>
        <v-btn text @click="logout" color="secondary" large outlined>
          Logout
        </v-btn>
      </template>
      <template v-else>
        <v-btn @click="goToLogin" color="secondary" large outlined>
          Login
        </v-btn>
        <v-btn @click="goToRegister" color="secondary" large outlined>
          Register
        </v-btn>
      </template>
    </v-app-bar>

    <!-- PayPal Donation Modal -->
    <v-dialog v-model="showModal" max-width="500px">
      <v-card>
        <v-card-title class="headline">Support Our Project</v-card-title>
        <v-card-text>
          <p>Thank you for considering a donation! You can donate via PayPal using the link below:</p>
          <v-btn
            color="primary"
            :href="paypalLink"
            target="_blank"
            block
            class="mt-4"
          >
            Donate via PayPal
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="showModal = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Feedback Button -->
    <feedback-form ref="feedbackForm" />
    <div class="feedback-button-wrapper">
      <v-btn @click="openFeedbackForm" class="feedback-button">
        Give Feedback
      </v-btn>
    </div>

    <!-- Contact Us Text -->
    <div class="contact-text">Contact us at Akarashelper@gmail.com</div>
    <footer>
      <a class="privacy" href="/privacy-policy">Privacy Policy</a> | <a class="tos" href="/terms-and-conditions">Terms of Service</a>
    </footer>

    <v-container fluid>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import { auth } from './auth'; // Ensure the path is correct
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import FeedbackForm from './components/FeedbackForm.vue';
import posthog from 'posthog-js';

export default {
  components: { FeedbackForm },
  data() {
    return {
      user: null, // Holds user object
      userEmail: null, // Holds user email
      showModal: false, // Controls visibility of the modal
      paypalLink: "https://www.paypal.com/donate/?hosted_button_id=NMP34339FZV9J", // Your PayPal donation link
    };
  },
  methods: {
    logout() {
      auth.signOut(); // Sign out the user
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    openFeedbackForm() {
      this.$refs.feedbackForm.openDialog();      
    },
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.userEmail = user ? user.email : null;
    });
  },
};
</script>

<style scoped>
/* Apply background styling directly to the wrapper element */
.nav-bar {
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  height: 64px;
}

.v-application {
  background-color: transparent;
  box-shadow: none;
}

.v-container {
  padding: 0 !important;
}

/* Feedback Button Styling */
.feedback-button-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.feedback-button {
  width: auto;
  padding: 10px 20px;
  height: auto;
}

/* Contact Us Text */
.contact-text {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8); 
  text-align: center;
  padding: 10px;
  border-radius: 5px;
}

.privacy {
  position: absolute;
  bottom: 5px;
  left: 20px;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
}

.tos {
  position: absolute;
  bottom: 5px;
  left: 150px;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
}

.v-dialog .v-card {
  padding: 20px;
}
</style>
