// logic.js

// Prefix and Suffix categories
export const prefixStats = [
  'attackRating',
  'mana',
  'coldRes',
  'fireRes',
  'lightningRes',
  'poisonRes',
  'allRes',
  'manaRegen',
];

export const suffixStats = [
  'fcr',
  'lifeLeech',
  'manaLeech',
  'strength',
  'dexterity',
  'life',
  'lifeReplenish',
  'minDamage',
  'maxDamage',
];

// Max values

export const maxValues = {
  fcr: 10,
  lifeLeech: 8,
  manaLeech: 6,
  strength: 20,
  dexterity: 15,
  life: 40,
  mana: 90,
  lifeReplenish: 9,
  attackRating: 120,
  minDamage: 9,
  maxDamage: 12,
  coldRes: 30,
  fireRes: 30,
  lightningRes: 30,
  poisonRes: 30,
  allRes: 11,
  manaRegen: 10,
};

export function calculateItemValue(itemStats) {
  let prefixScore = 0;
  let suffixScore = 0;

  // Calculate prefix points
  prefixStats.forEach((stat) => {
    const inputValue = parseFloat(itemStats[stat]) || 0;
    prefixScore += calculatePoints(inputValue, maxValues[stat]);
  });

  // Calculate suffix points
  suffixStats.forEach((stat) => {
    const inputValue = parseFloat(itemStats[stat]) || 0;
    suffixScore += calculatePoints(inputValue, maxValues[stat]);
  });

  const totalScore = prefixScore + suffixScore;

  console.log('Prefix Score:', prefixScore);
  console.log('Suffix Score:', suffixScore);
  console.log('Total Score:', totalScore);

  return totalScore; // Return combined score
}

export function calculatePoints(value, max) {
  if (value >= (2 / 3) * max) {
    return 1; // 1 point if the value is 2/3 of max or more
  } else if (value >= (1 / 3) * max) {
    return 0.5; // 0.5 points if the value is between 1/3 and 2/3 of max
  } else {
    return 0; // 0 points if the value is less than 1/3 of max
  }
}

// export const getRingRating = (value) => {
//   console.log('Ring value:', value); // Add this line to inspect the value
//   if (value >= 6) {
//     return 'Trophy';
//   } else if (value >= 5.5) {
//     return 'Jackpot';
//   } else if (value >= 5) {
//     return 'Amazing';
//   } else if (value >= 4.5) {
//     return 'Great find';
//   } else if (value >= 4) {
//     return 'Decent ring';
//   } else {
//     return 'Charsi';
//   }
// };
