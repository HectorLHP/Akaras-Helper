<!-- <template>
  <div class="amulets-section">
    <h1>Diablo 2 Amulet Value Calculator</h1>

    <form @submit.prevent="calculateValue" class="stat-form">
      <div v-for="stat in amuletStats" :key="stat">
        <label :for="stat">{{ displayNames[stat] || stat }}</label>
        <input
          type="number"
          :id="stat"
          v-model.number="amuletStats[stat]"
          :disabled="amuletStats[stat] === 0 && suffixCount >= 3"
          class="stat-input"
        />
      </div>
      <p v-if="suffixCount >= 3" class="warning">
        You can select up to 3 suffixes only.
      </p>
    </form>
    <button @click="calculateValue">Calculate Amulet Value</button>
    <p v-if="totalScore > 0" class="item-value-text">
      Total Amulet Value: {{ totalScore }}
    </p>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

// Stats for amulets
const amuletStats = reactive({
  fcr: 0,
  strength: 0,
  dexterity: 0,
  life: 0,
  mana: 0,
  allRes: 0,
  classSkills: 0, // Example for "+skills"
});

// Display names for amulet stats
const displayNames = {
  fcr: 'Faster Cast Rate',
  strength: 'Strength',
  dexterity: 'Dexterity',
  life: 'Life',
  mana: 'Mana',
  allRes: 'All Resistances',
  classSkills: '+Skills',
};

const suffixCount = computed(() => {
  return Object.keys(amuletStats).filter((stat) => amuletStats[stat] > 0)
    .length;
});

const totalScore = ref(0);

// Dummy function to calculate value
const calculateValue = () => {
  totalScore.value = Object.values(amuletStats).reduce(
    (sum, val) => sum + val,
    0
  ); // Replace with actual logic
};
</script>

<style scoped>
/* Add styles specific to the Amulets section here */
.amulets-section {
  margin-top: 10px;
}
</style> -->
