describe('Signin Page', () => {

    //Launch URL
    it('Launch URL', () => {
        cy.visit('https://dev-app.pickmyad.com/auth')
        //cy.get('.lan-btn > [href="https://app.pickmy.link/auth/v3/login"] > .btn-common').click()
     cy.wait(2000)
     cy.get('#mat-select-value-1').click()
     cy.get('#mat-option-2 > .mat-option-text').click()
     cy.get('.google-btn').click()
     cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
       Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
         })
         cy.get('#identifierId').type('gayathri@pickmyad.com')
        cy.get('.VfPpkd-vQzf8d').contains('Next').click()
          cy.wait(5000)
          //cy.get('input[name="password"]').type('Parimale')
         cy.get('body').type('Sajith!0708')
          cy.get('.VfPpkd-vQzf8d').contains('Next').click()
          cy.wait(5000)
        
       })
       cy.url().should('include', '/home')
 
    })
   
})

