import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import vitePreprocessor from "cypress-vite";


export default defineConfig({
  projectId: 'na7e3j',
  experimentalStudio: true,
  e2e: {
    specPattern: "**/*.feature",
    baseUrl: 'http://localhost:5173',
    async setupNodeEvents(
        on: Cypress.PluginEvents,
        config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on('file:preprocessor', vitePreprocessor(config))

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  }
});

