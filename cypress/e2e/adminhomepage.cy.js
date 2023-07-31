//Check homepage side nav
describe("Check side nav", () => {
    beforeEach(() => {
        cy.wait(2000)
    })
    it('Should successfully login using mail id', () => {

        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)

        })

        it("Should test side nav UI", () => {


            cy.get('.platform-top').should('be.visible')
            cy.get('.mat-drawer-inner-container').should('be.visible');
            cy.get('.mat-drawer-inner-container').contains('Settings').click();
            cy.url().should('include', '/settings/container');
            cy.get('.brand-logo > :nth-child(1) > .kyc-title').should('be.visible');
            cy.get('.mat-drawer-inner-container').contains('Dashboard').click();
            cy.url().should('include', '/dashboard');
            cy.get('.mat-drawer-inner-container').contains('Campaigns').click();
            cy.url().should('include', '/campaigns');
            cy.get('.platform-top')
                .find(':nth-child(1)')
                .filter(':contains("Dashboard"), :contains("Campaigns"), :contains("Settings")')
                .should('be.visible');
            cy.get('.platform-logout')
            cy.get('body')
                .should('have.css', 'font-family')
                .and('contain', 'Figtree, sans-serif')
        })
    })
})
