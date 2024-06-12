import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import * as OTPAuth from "otpauth";

Given('I am on the login page', () => {
    cy.visit('/login');
});

When("I fill in a valid OTP code", function () {

    const otp = OTPAuth.TOTP.generate({
        secret: OTPAuth.Secret.fromBase32(
            OTPAuth.Secret.fromUTF8("E2E_ONETIMEPASSWORD_SECRET").base32
        ),
    });

    cy.fillOTP('#oneTimePassword', otp)
});

When("I fill in an invalid OTP code", function () {
    const invalidOtpCode = "000000";
    cy.fillOTP('#oneTimePassword', invalidOtpCode)
});

Then('I should be redirected to the dashboard', () => {
    cy.url().should('contain', '/businesses');
    cy.get('.ant-notification-notice-error').should('not.exist');
});

Then('I should see a login failure message', () => {
    cy.get('.ant-notification-notice-error').should('be.visible');
    cy.get('.ant-notification-notice').should('contain', 'Failed to login');
});
