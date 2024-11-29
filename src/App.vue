<template>
  <v-app>
    <div>
      <!-- Main app container -->
      <v-container fluid>
        <!-- You can add a header here if you'd like -->

        <!-- Render the routed views here -->
        <router-view />
      </v-container>
    </div>
  </v-app>
</template>

<script setup>
// No additional logic needed here for now
</script>

<style>
/* Apply background styling directly to the wrapper element */


/* Make the Vuetify app layout transparent */

.v-application {
  background-color: transparent;
  box-shadow: none;
}
.v-container {
  padding: 0 !important; /* Remove the default padding */
}
</style>
