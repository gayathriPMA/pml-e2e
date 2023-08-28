/// <reference types = "cypress"/>

describe('Signin Page Test', () => {
    beforeEach(() => {
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
    });

    it('should display the company logo', () => {
        cy.get('.logo > img')
            .should('be.visible')
            .and('have.attr', 'src', 'assets/images/influencer/onboard/pickmyad_logo.svg')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
    });

    it('should have "Sign in as Admin" heading', () => {
        cy.contains('SIGN IN AS - ADMIN')
            .should('be.visible')
            .should('have.css', 'font-size', '24px')
            .should('have.css', 'font-family', 'Figtree, sans-serif')
            .should('have.css', 'font-weight', '700')
            .should('have.css', 'text-transform', 'uppercase')
            .should('have.css', 'color', 'rgb(55, 55, 55)')
            .should('have.css', 'padding-bottom', '30px')
            .should('have.css', 'line-height', '30px')
            .should('have.css', 'letter-spacing', '0')
            .should('have.css', 'margin', '0px 0px 16px')
    });

    it('should click "Continue with Google" button', () => {
        cy.get('.mat-button-wrapper') // Replace 'button.mat-button' with the appropriate selector for the button
            .should('be.visible')
            .contains(' Continue with Google ');
        cy.get('.mat-button-wrapper img')
            .should('have.attr', 'src', 'assets/images/brand/settings/google-icon.svg')
        cy.get('.google-btn')
            .should('be.visible')
            .should('have.prop', 'tagName', 'BUTTON')
            .should('have.css', 'background-color', 'rgb(255, 255, 255)')
            .should('have.text', ' Continue with Google ')
            .should('have.css', 'font-size', '14px')
            .should('have.css', 'font-family', 'Figtree, sans-serif')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'display', 'flex')
            .should('have.css', 'height', '44px')
            .should('have.css', 'align-items', 'center')
            .should('have.css', 'justify-content', 'center')
            .should('have.css', 'border-radius', '10px')
            .should('have.css', 'border-width', '0.8px')
            .should('have.css', 'border-style', 'solid')
            .should('have.css', 'border-color', 'rgb(13, 12, 34)')
            .should('have.css', 'cursor', 'pointer')
            .should('have.css', 'text-align', 'center')
            .should('have.css', 'margin', '0px')
            .should('have.css', 'min-width', '64px')
            .should('have.css', 'line-height', '36px')
            .should('have.css', 'padding', '0px 16px')
            .should('have.css', 'font-weight', '500')
            .focus()
            .should('be.focused')
            .scrollIntoView()
            .should('be.visible')
            .click()

        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            // cy.get('#captchaimg').should('be.visible');
            // cy.pause();
            // cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
        })


    });
});

