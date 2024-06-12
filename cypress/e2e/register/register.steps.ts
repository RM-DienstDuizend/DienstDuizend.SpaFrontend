import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the register page', () => {
    cy.visit('/register');
});

When('I accept the terms of service', () => {
    cy.get("input#acceptedTermsOfService").check()
});

Then('I should successfully registered', () => {
    cy.get('.ant-notification-notice-success').should('be.visible');
    cy.get('.ant-notification-notice').should('contain', 'Created account');
});

Then('I should get validation errors', function () {
    cy.contains('Email field is required').should('be.visible');
    cy.contains('First Name field is required').should('be.visible');
    cy.contains('Last Name field is required').should('be.visible');
    cy.contains('Password field is required').should('be.visible');
    cy.contains('Confirm Password field is required').should('be.visible');
    cy.contains('You must accept the terms of service before continuing').should('be.visible');
});


Then('I should see the validation message {string}', (errorMessage: string) => {
    // Verify that the validation message is shown
    cy.get('.ant-form-item-explain-error')
        .contains(errorMessage).should('be.visible');
});