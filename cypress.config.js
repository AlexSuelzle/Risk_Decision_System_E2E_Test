const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://risk-decision-system.herokuapp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    randomNumber: generateRandomNumber(),
    companyName: generateRandomCompanyName(),
    randomDecision: generateRandomDecision(),
  },
});

//generate random mandatory number
function generateRandomNumber() {
  return 'M' + Math.floor(Math.random() * 1000000).toString().padStart(4, '0');
}

//generate random company name
function generateRandomCompanyName() {
  const randomWords = generateRandomWords(2)
  return randomWords.join(' ') + ' Corp.';
}
function generateRandomWords(numWords) {
  const words = ['Kilo', 'Mega', 'Giga', 'Tera', 'Peta', 'Exa', 'Zetta', 'Yotta', 'Bronto', 'Geopeta', 'Yottapeta', 'Zettabronto', 'Geoyotta', 'Brontobronto', 'Geobronto', 'Geogeo', 'Geobronto', 'Geoyotta']
  const randomIndexes = []
  while (randomIndexes.length < numWords) {
    const randomIndex = Math.floor(Math.random() * words.length)
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex)
    }
  }
  return randomIndexes.map(index => words[index]);
}

//generate random decision
function generateRandomDecision() {
  return Math.random() < 0.7; // Randomly decide whether to save or go back to dashboard
}
