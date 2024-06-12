// cypress/support/index.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to fill OTP fields
         * @example cy.fillOTP('#oneTimePassword', '123456')
         */
        fillOTP(selector: string, otpValue: string): Chainable<void>;
    }
}
