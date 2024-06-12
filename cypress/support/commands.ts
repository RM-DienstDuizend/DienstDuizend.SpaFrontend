Cypress.Commands.addAll({
    fillOTP(selector, otpValue) {
        Cypress._.times(otpValue.length, (i) => {
            cy.get(`${selector} input`, { log: false })
                .eq(i, { log: false })
                .type(otpValue[i], { log: false });
        });

        cy.log(`filled in otp code: ${otpValue}`);
    },
})

export {};