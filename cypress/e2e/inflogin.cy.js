describe('Signin Page', () => {

    //Launch URL
    it('Launch URL', () => {
        cy.visit('https://dev-app.pickmy.link/')
        cy.get('.lan-btn > [href="https://app.pickmy.link/auth/v3/login"] > .btn-common').click()
     cy.wait(2000)

     cy.get('.google-btn').click()
     cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
        https://accounts.google.com/o/oauth2/v2/auth/
       Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
         })
         cy.get('#identifierId').type('cherath@amwhiz.com')
        cy.get('.VfPpkd-vQzf8d').contains('Next').click()
          cy.wait(5000)
          //cy.get('input[name="password"]').type('Parimale')
         cy.get('body').type('cherath@123')
          cy.get('.VfPpkd-vQzf8d').contains('Next').click()
          cy.wait(5000)
         cy.url().should('include', '/home')

       })
       
    })
   
})

