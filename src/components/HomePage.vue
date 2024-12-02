<template>
  <v-app id="app">
    <v-container class="d-flex flex-column justify-center align-center" fluid>
      <!-- Main header -->
      <v-row class="mb-5">
        <v-col cols="12" class="text-center">
          <h1 class="display-2">
            Welcome to the Diablo 2 Item Value Calculator
          </h1>
        </v-col>
      </v-row>

      <!-- Buttons to navigate to other pages -->
      <v-row class="d-flex align-center justify-center">
        <v-col cols="6" class="d-flex flex-column">
          <v-btn
            @click="$router.push('/rings')"
            color="primary"
            class="mb-2"
            large
            outlined
          >
            Rings
          </v-btn>

          <v-btn
            @click="$router.push('/')"
            color="primary"
            class="mb-2 "
            large
            outlined
            
          >
          <span style="white-space: normal;">            
            Amulets (soon)
          </span>
          </v-btn>
        </v-col>

        <!-- Login, Register, and Guest Access -->

        <v-col cols="6" class="d-flex flex-column">
          <v-btn
            @click="goToLogin"
            color="secondary"
            class="mb-2"
            large
            outlined
          >
            Login
          </v-btn>

          <v-btn
            @click="goToRegister"
            color="secondary"
            class="mb-2"
            large
            outlined
          >
            Register
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    goToLogin() {
      this.$router.push('/login'); // Route to login page
    },
    goToRegister() {
      this.$router.push('/register'); // Route to register page
    },    
  },
};
</script>

<style scoped>
/* You can still add custom styling here if needed */

#app {
  background-image: url('/images/background2.png'); /* Update the path if necessary */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Ensure it covers the full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
 
}
.landing-page {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: #ffcc00; /* Diablo-themed color */
}

</style>
