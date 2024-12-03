<template>
  <v-app id="ringApp">
    <v-container id="container" class="d-flex flex-column justify-center" fluid>
      <!-- Title -->
      <!-- <v-row id="title-row" justify="center">
        <img
          src="/images/RingsBanner2.png"
          alt="Rare Rings"
          class="title-image"
        />
      </v-row> -->
      <!-- Back to Landing Page Button -->
      <v-row justify="center">
        
      </v-row>

      <!-- Dropdown for Ring Type -->

      <v-row id="ring-type-row">
        <v-col cols="12" class="d-flex flex-row">
          <v-select
            v-model="selectedRingType"
            :items="ringTypes"
            label="Select Ring Type"
            variant="solo"
            class="ring-type-dropdown"
          />
        </v-col>
      </v-row>

      <!-- Main Section -->

      <v-row id="main-row" align="start">
        <!-- Inputs Section -->

        <v-col cols="12" class="d-flex flex-row input-columns">
          <!-- Suffix Stats -->

          <div class="d-flex flex-column suffix-column mr-4">
            <h3>Suffix Stats</h3>
            <div v-for="stat in suffixStats">
              <v-text-field
                :label="displayNames[stat] || stat"
                v-model="itemStats[stat]"
                :placeholder="`Max value: ${maxValues[stat]}`"
                :disabled="(itemStats[stat] || 0) === 0 && suffixCount >= 3"
                :max="maxValues[stat]"
                type="number"
                variant="solo"
                class="stat-input"
              />
            </div>
          </div>

          <!-- Prefix Stats -->

          <div class="d-flex flex-column prefix-column">
            <h3>Prefix Stats</h3>
            <div v-for="stat in prefixStats">
              <v-text-field
                :label="displayNames[stat] || stat"
                v-model="itemStats[stat]"
                :placeholder="`Max value: ${maxValues[stat]}`"
                :disabled="(itemStats[stat] || 0) === 0 && prefixCount >= 3"
                :max="maxValues[stat]"
                type="number"
                variant="solo"
                class="stat-input"
              />
            </div>
          </div>
        </v-col>

        <!-- Speedometer and Buttons -->

        <Speedometer
          :totalScore="totalScore"
          @calculate-value="calculateValue"
          @clear-inputs="clearInputs"
        />

        <!-- INSTRUCTIONS -->
        <v-col
        
        class="d-flex flex-column justify-center mt-10 ml-4"
        >
        <v-sheet class="bg-grey-darken-2 pa-6" rounded>
          
            <h4>INFO</h4>
            <p>
              This is just a guide for approximate value, in some cases a 3.5
              points ring can be exactly what you need, and a 5 points ring can
              be barely usable/sellable
              <!-- Some stats are more important than others and some combinations are not really worth much. A 4 point ring can be very sought after if it has the right stats. For example: 10fcr, 20str, 15dex, 11@ would be very valuable even if it's missing 2 prefixes. 
              And a 5 points ring could be barely usable/sellable. For example: 10fcr, 6ml, 9min dmg, 60mana, 30psn res, could be hard to sell since melee characters  -->
            </p>
            <ul>
              <li>
                <strong>4 Points:</strong> Usable, borderline sellable with the
                right stats.
              </li>
              <li><strong>4.5 Points:</strong> Good.</li>
              <li>
                <strong>5 Points:</strong> Great. High demand if desirable
                stats.
              </li>
              <li><strong>5.5 Points:</strong> Elite. Very valuable.</li>
              <li><strong>6 Points:</strong> Top-tier, trophy item.</li>
            </ul>
          
        </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import Speedometer from './vue-speedometer.vue';
import {
  maxValues,
  prefixStats,
  suffixStats,
  calculateItemValue,
} from './logic.js';

// Reactive data

const itemStats = reactive({
  attackRating: null,
  manaLeech: null,
  fcr: null,
  lifeLeech: null,
  coldRes: null,
  fireRes: null,
  lightningRes: null,
  poisonRes: null,
  allRes: null,
  strength: null,
  dexterity: null,
  life: null,
  mana: null,
  lifeReplenish: null,
  minDamage: null,
  maxDamage: null,
}); // Holds the user inputs
const totalScore = ref(0);

// Ring types for dropdown
const ringTypes = ['Rare Ring', 'Blood Ring', 'Caster Ring'];
const selectedRingType = ref('Rare Ring'); // Default type

// Display names for the stats
const displayNames = {
  fcr: 'FCR',
  strength: 'Strength',
  dexterity: 'Dexterity',
  life: 'Life',
  mana: 'Mana',
  lifeReplenish: 'Life Replenishment',
  lifeLeech: 'Life Leech',
  manaLeech: 'Mana Leech',
  coldRes: 'Cold Res',
  fireRes: 'Fire Res',
  lightningRes: 'Lightning Res',
  poisonRes: 'Poison Res',
  attackRating: 'Attack Rating',
  allRes: 'All Res',
  minDamage: 'Min Damage',
  maxDamage: 'Max Damage',
  manaRegen: 'Mana Regen',
};

// Computed properties to count prefixes and suffixes

const prefixCount = computed(() => {
  return Object.keys(itemStats).filter(
    (stat) => prefixStats.includes(stat) && (itemStats[stat] || 0) > 0 // Treat null or empty string as 0
  ).length;
});

const suffixCount = computed(() => {
  return Object.keys(itemStats).filter(
    (stat) => suffixStats.includes(stat) && (itemStats[stat] || 0) > 0 // Treat null or empty string as 0
  ).length;
});

// Watch for changes in itemStats to enforce max values
watch(
  itemStats,
  (newStats) => {
    for (const stat in newStats) {
      if ((newStats[stat] || 0) > maxValues[stat]) {
        itemStats[stat] = maxValues[stat]; // Reset to max if exceeded
      }
    }
  },
  { deep: true }
);

// Function to calculate the item's total value
const calculateValue = () => {
  totalScore.value = calculateItemValue(itemStats);
};

// Function to reset all input fields
const clearInputs = () => {
  Object.keys(itemStats).forEach((stat) => {
    itemStats[stat] = null;
  });
  totalScore.value = 0;
};
</script>

<style scoped>
#ringApp {
  background-image: url('/images/background5.png'); /* Make sure the image path is correct */
  background-size: cover; /* Ensures the image covers the entire area */
  background-position: center center; /* Center the background image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  min-height: 100vh; /* Ensure it covers at least the full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevents scrollbars if the background is larger than the screen */
  padding: 30px;
}
.title-image {
  max-width: 100%; /* Ensure the image fits within its container */
  height: 100px; /* Maintain aspect ratio */
  margin-bottom: 10px; /* Optional spacing */
}

.ring-type-dropdown {
  margin-bottom: 20px;
  max-width: 150px;
  height: 55px;
  max-height: 35px;
}

h3 {
  margin-bottom: 5px;
  color: rgb(232, 222, 222);
}

/* Ensure higher specificity for hint messages */

/* .stat-input >>> .v-messages__message {
  color: #b01a1a !important;
  font-size: 14px;
  font-style: italic; 
} */

.stat-input {
  height: 50px;
  margin-bottom: 10px;
}

.input-columns {
  max-width: 400px;
}

.item-value-text {
  font: bold 30px papyrus;
  color: rgb(169, 176, 171);
  margin-top: 0px;
}


</style>
