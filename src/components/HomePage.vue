<template>
  <v-app id="app">
    <v-container class="d-flex flex-column justify-center align-center" fluid>      

      <!-- Buttons to navigate to other pages -->
      <v-row class="mt-16">
        <v-col class="d-flex flex-column">
          <v-btn
            @click="$router.push('/rings')"
            color="primary"
            class="mb-2"
            large
            outlined
          >
            Ring Value Calculator
          </v-btn>

          <v-btn
            @click="$router.push('/')"
            color="primary"
            class="mb-2"
            large
            outlined
          >
            <span style="white-space: normal"> Amulet Value Calculator (soon) </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script></script>

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
