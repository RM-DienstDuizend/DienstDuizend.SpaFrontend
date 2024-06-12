import {defineConfig} from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import {addCucumberPreprocessorPlugin} from "@badeball/cypress-cucumber-preprocessor";
import {createEsbuildPlugin} from "@badeball/cypress-cucumber-preprocessor/esbuild";
import * as OTPAuth from "otpauth";

async function setupNodeEvents(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
    // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
    await addCucumberPreprocessorPlugin(on, config);

    const filePreprocessor = createBundler({
        // Typescript cannot match the esbuild inside the package with the official esbuild peer dependency.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        plugins: [createEsbuildPlugin(config)],
    });

    on('file:preprocessor', (file) => {
        file.shouldWatch = false;
        return filePreprocessor(file);
    });

    // Make sure to return the config object as it might have been modified by the plugin.
    return config;
}

export default defineConfig({
    projectId: 'na7e3j',
    e2e: {
        baseUrl: "http://localhost:5173",
        specPattern: "**/*.feature",
        defaultCommandTimeout: 10000,
        setupNodeEvents,
    },
});