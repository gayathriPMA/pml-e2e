/// <reference types = "cypress"/>
describe('AdminSidenav', () => {

    it('Login', () => {

        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {

            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })

            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.get('#captchaimg').should('be.visible');
            cy.pause();
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()

        })

        //should have the correct initial state
        cy.url().should('include', '/campaigns');

//should have the correct initial state
//should have the correct initial state
//should have the correct initial state
//should have the correct initial state
//should have the correct initial state
cy.url().should('include', '/campaigns');

function clickAndVerifyUrl(linkText) {
    cy.contains('a.deactive_btn, a.active_btn', linkText).click();
    cy.url().should('include', linkText.toLowerCase());
}

const links = ['Campaigns', 'Influencers', 'Settings'];

links.forEach((linkText) => {
    clickAndVerifyUrl(linkText);
    sidenavactive(linkText);
});

function sidenavactive(link) {
    // Get the link element with the provided link text
    const activeLink = cy.contains('a.deactive_btn, a.active_btn', link);

    // Check if the link is active
    activeLink.should('have.class', 'active_btn');

    // Check if other links are inactive (do not have the class "active_btn")
    cy.get('.platform-top a.deactive_btn').each((linkElement) => {
        if (linkElement.text() !== link) {
            cy.wrap(linkElement).should('not.have.class', 'active_btn');
        }
    });
}
        // //it('should logout when Logout link is clicked', () => {
        //should logout when Logout link is clicked
        cy.get('.platform-logout').should('be.visible')

        // Mock the UserService.creatorLogout() API call to return a success message
        cy.intercept('POST', '/api/creator/logout', { message: 'Logout successful' }).as(
            'logoutRequest'
        );

        // Click the Logout link
        //cy.get('a.deactive_btn, a.active_btn').click();

        // Wait for the logout API call to complete
        cy.wait('@logoutRequest');

        // Assert that the user is redirected to the auth URL
        cy.url().should('include', 'https://dev-app.pickmyad.com/auth/admin/login');




        // Add more test cases to cover other functionalities of the component as needed.

    });

})







