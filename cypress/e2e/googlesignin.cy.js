describe('Signin Page', () => {

    //Launch URL
    it('Launch URL', () => {
        //cy.visit(Cypress.config('baseUrl'))// cy.visit('https://dev-app.pickmy.link/auth/v3/signup')
        //cy.request(Cypress.env('EXTERNAL_API')) // points to a dynamic env var
        cy.visit('http://localhost:9090/auth/v3/login')
        cy.wait(2000)

        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            cy.get('#identifierId').type('cherath@amwhiz.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(5000)
            //cy.get('input[name="password"]').type('Parimale')
            cy.get('body').type('cherath@123')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.url().should('include', '/home')

        })
       // cy.origin("https://accounts.google.com/signin/v2/challenge/", () => {
         //   cy.get('.password').type('Sajith!0708')
        //})

    })
    
   // it('Launch URL', () => {
        //cy.visit('https://dev-app.pickmy.link/auth/v3/signup')
      //  cy.visit('http://localhost:8080/influencer/profile')
        //cy.wait(2000)
    //})
})

