import {When} from "@badeball/cypress-cucumber-preprocessor";

When('I fill in the {string} field with {string}', (label: string, value: string) => {
    cy.contains('.ant-form-item-label', label)
        .closest('.ant-form-item')
        .find('input')
        .type(value);
});

When("I click the {string} button",  (label: string) => {
    cy.contains('button', label)
        .click();
})