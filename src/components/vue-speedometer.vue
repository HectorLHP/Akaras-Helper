<template>
  <v-col
    class="mt-11 results-block d-flex justify-center align-center flex-column"
  >
    <vue-speedometer
      :width="420"
      :needleHeightRatio="0.9"
      :value="totalScore"
      :currentValueText="` `"
      :maxValue="6"
      :segments="7"
      :maxSegmentLabels="6"
      :customSegmentStops="[0, 3.5, 4, 4.5, 5, 5.5, 6]"
      :customSegmentLabels="customSegmentLabels"
      :ringWidth="50"
      :needleTransitionDuration="5000"
      needleTransition="easeElastic"
      needleColor="#a7ff83"
      :segmentColors="[
        'red',
        'gold',
        'lightgreen',
        'limegreen',
        'green',
        'lime',
      ]"
    />
    <p v-if="totalScore > 0" class="item-value-text mb-4">
      Ring Rating: {{ totalScore }}
      {{ totalScore === 1 ? 'point' : 'points' }}
    </p>
    <div class="d-flex flex-column align-center">
      <v-btn
        @click="$emit('calculate-value')"
        color="primary"
        large
        class="mb-2"
      >
        Calculate Value
      </v-btn>
      <v-btn @click="$emit('clear-inputs')" color="secondary" large>
        Reset Inputs
      </v-btn>
    </div>
  </v-col>
</template>

<script setup>
import VueSpeedometer from 'vue-speedometer';

// Props
const props = defineProps({
  totalScore: {
    type: Number,
    required: true,
  },
});

// Segment labels for the speedometer
const customSegmentLabels = [
  { text: 'Charsi', position: 'INSIDE', color: '#555', fontSize: '12px' },
  { text: 'Self Use', position: 'INSIDE', color: '#555', fontSize: '10px' },
  { text: 'Good', position: 'INSIDE', color: '#black', fontSize: '12px' },
  { text: 'Great', position: 'INSIDE', color: 'black', fontSize: '12px' },
  { text: 'Elite', position: 'INSIDE', color: 'red', fontSize: '12px' },
  { text: 'Trophy', position: 'INSIDE', color: 'blue', fontSize: '12px' },
];
</script>

<style>
.results-block {
  background-color: transparent;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.item-value-text {
  font: bold 30px papyrus;
  color: rgb(169, 176, 171);
}

.vue-speedometer {
  height: 250px;
}

/* .speedometer {
  width: 100%;
  height: 50vh; 
} */
</style>
