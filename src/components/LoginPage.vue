<template>
  <v-app id="app">
    <v-container class="d-flex flex-column justify-center align-center" fluid>
      <v-row class="mb-5">
        <v-col cols="12" class="text-center">
          <h1 class="display-2">Login</h1>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col cols="12">
          <v-card class="bg-transparent mx-auto px-6 py-8" max-width="344">
            <v-form ref="loginForm" v-model="isValid" @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="emailRules"
                required
                variant="solo"
                clearable
                class="mb-2"
              />

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="passwordRules"
                required
                variant="solo"
                clearable
                class="mb-2"
              />

              <v-btn
                :disabled="!isValid"
                color="primary"
                size="large"
                type="submit"
                variant="elevated"
                block
                class="mb-4"
              >
                Login
              </v-btn>

              <v-btn
                color="primary"
                class="resize-button mb-4"
                @click="goToRegister"
                text
                block
              >
                <span style="white-space: normal">
                  Don't have an account? Register here.
                </span>
              </v-btn>

              <v-btn block color="grey-darken-1" @click="$router.push('/')">
                Back to Menu
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar for displaying messages -->
    <v-snackbar
      v-model="snackbarVisible"
      :timeout="5000"
      top
      color="error"
      :multi-line="true"
    >
      {{ loginStatus }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { loginUser } from '../auth'; // Import login function from auth.js
import validator from 'validator'; // Import validator.js

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      isValid: false,
      loginStatus: '', // Message to display in the Snackbar
      snackbarVisible: false, // Controls visibility of the Snackbar
      emailRules: [
        (v) => (v && v.trim() !== '') || 'Email is required',
        (v) =>
          validator.isEmail(v || '') || 'Please enter a valid email address',
      ],
      passwordRules: [(v) => (v && v.trim() !== '') || 'Password is required'],
    };
  },
  methods: {
    async login() {
      this.loginStatus = ''; // Reset message
      this.snackbarVisible = false; // Hide Snackbar initially

      // Validate form before attempting login
      if (!this.$refs.loginForm.validate()) {
        this.loginStatus = 'Please fill out all required fields correctly.';
        this.snackbarVisible = true;
        return;
      }

      // Attempt login
      try {
        const user = await loginUser(this.email, this.password);
        this.loginStatus = `Welcome back, ${user.email}!`; // Show success message
        this.snackbarVisible = true;

        // Wait for the snackbar to display, then redirect
        setTimeout(() => {
          this.$router.push('/home'); // Redirect after showing the message
        }, 2000); // Delay of 2 seconds (adjust as needed)
      } catch (error) {
        this.loginStatus = `Login failed: ${error.message}`; // Show error message
        this.snackbarVisible = true;
      }
    },
    goToRegister() {
    this.$router.push('/register'); // Navigate to the login page
  },
  },
};
</script>

<style scoped>
/* Add your custom styling here */
#app {
  background-image: url('/images/d2background1.png'); /* Update the path if necessary */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Ensure it covers the full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.display-2 {
  color: aliceblue;
}
</style>
