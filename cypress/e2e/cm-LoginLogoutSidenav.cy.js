/// <reference types = "cypress"/>

describe('AdminSidenav', () => {
    const loginUrl = 'https://dev-app.pickmyad.com/auth/admin/login';
    const loggedInUrl = '/campaigns';
    it('Login and verify Sidenav', () => {
        cy.visit(loginUrl, { failOnStatusCode: false });
        // Login with Google
        cy.get('.google-btn').click();
        cy.origin('https://accounts.google.com/o/oauth2/v2/auth/', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            cy.wait(20000)
            cy.get('#identifierId').type('gayathri@pickmyad.com');
            cy.get('.VfPpkd-vQzf8d').contains('Next').click();
            cy.get('#captchaimg').should('be.visible');
            cy.pause();
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000); // Adjust the wait time if needed, or replace with cy.contains or cy.get with { timeout: ... }
            cy.get('body').type('Sajith!0708');
            cy.get('.VfPpkd-vQzf8d').contains('Next').click();
        });

        // Verify that the user is logged in and redirected to the correct page
        cy.url().should('include', loggedInUrl);

        // List of links in the sidenav
        const links = ['Campaigns', 'Influencers', 'Settings'];

        // Verify each link in the sidenav
        links.forEach((linkText) => {
            clickAndVerifyUrl(linkText);
            verifySidenavActive(linkText);
        });


        // Mock the logout request and alias it as @logoutRequest
        cy.intercept('GET', '/api/v1/auth/logout', {
            message: 'Logout successful. You have been successfully logged out!',
        }).as('logoutRequest');
        // Verify Logout link and log out the user
        cy.get('.platform-logout').should('be.visible').click();
        // Wait for the logout API call to complete
        cy.wait('@logoutRequest');
        // Assert that the user is redirected to the auth URL
        cy.url().should('include', '/auth/login');
    });

    function clickAndVerifyUrl(linkText) {
        cy.contains('a.deactive_btn, a.active_btn', linkText).click();
        cy.url().should('include', linkText.toLowerCase());
    }

    function verifySidenavActive(link) {
        // Get the link element with the provided link text
        const activeLink = cy.contains('a.deactive_btn, a.active_btn', link);

        // Check if the link is active
        activeLink.should('have.class', 'active_btn');

        // Check if other links are inactive (do not have the class "active_btn")
        cy.get('.platform-top a.deactive_btn').each((linkElement) => {
            cy.wrap(linkElement).should('not.have.class', 'active_btn').and('not.contain', link);
        });
    }
});
