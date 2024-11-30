<template>
  <v-app id="app">
    <v-container class="d-flex flex-column justify-center align-center" fluid>
      <v-row class="mb-5">
        <v-col cols="12" class="text-center">
          <h1 class="display-2">Register</h1>
        </v-col>
      </v-row>

      <!-- Card container for the form -->
      <v-row class="d-flex justify-center">
        <v-col cols="12">
          <v-card class="bg-transparent mx-auto px-6 py-8" max-width="344">
            <v-form
              ref="registerForm"
              v-model="isValid"
              @submit.prevent="register"
            >
              <!-- Email input field -->
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="[emailRules]"
                required
                variant="solo"
                clearable
                class="mb-2"
              />

              <!-- Password input field -->
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="[passwordRules]"
                required
                variant="solo"
                clearable
                class="mb-2"
              />

              <!-- Register button -->
              <v-btn
                :disabled="!isValid"
                color="primary"
                size="large"
                type="submit"
                variant="elevated"
                block
                class="mb-4"
              >
                Register!
              </v-btn>

              <!-- Login redirection button -->
              <v-btn
                color="primary"
                class="resize-button mb-4"
                @click="goToLogin"
                text
                block
              >
                <span style="white-space: normal"
                  >Already have an account? Login here!</span
                >
              </v-btn>
              <v-btn block color="grey-darken-1" @click="$router.push('/')">
                Back to Menu
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { registerUser } from '../auth'; // Import register function from auth.js

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      isValid: false,
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
      ],
      passwordRules: [(v) => !!v || 'Password is required'],
    };
  },
  methods: {
    register() {
      registerUser(this.email, this.password);
    },
    goToLogin() {
      this.$router.push('/login'); // Navigate to the login page
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
  color: rgb(197, 204, 221);
}

.resize-button {
  white-space: normal; /* Allow the text to wrap */
  min-height: 40px; /* Minimum height to maintain button consistency */
  height: auto;
}
</style>
