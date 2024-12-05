<template>
  <v-app id="homepage">
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
            :disabled="true"
            color="primary"
            class="mb-2 disabled-btn"
            large
            outlined
          >
            Amulet Value Calculator (coming soon)
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
#homepage {
  background-image: url('/images/background2.png'); /* Ensure path is correct */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
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

.disabled-btn {
  white-space: normal; /* Prevent text from overflowing */
  cursor: not-allowed; /* Indicate disabled state */
}
</style>
