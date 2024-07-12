const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://risk-decision-system.herokuapp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  });
