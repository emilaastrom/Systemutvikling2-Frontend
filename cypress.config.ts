import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Adjust as necessary for your project
    setupNodeEvents(on, config) {
      // Node event listeners can be implemented here
    },
  },
});
