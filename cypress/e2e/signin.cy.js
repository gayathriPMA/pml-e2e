describe('Signin Page', () => {

    //Launch URL
    it('Launch URL', () => {
        cy.visit('https://dev-app.pickmy.link/auth/v3/login')

        //Checking New URL with assert
        cy.url()
            .should('eq', 'http://localhost:9090/auth/login')
        cy.get('.mat-form-field-infix').click()
        cy.get('#mat-option-0 > .mat-option-text').click()

        //Test UI
        cy.get('.logo').should('be.visible')
        cy.get('.powered-txt-r').should('be.visible')
        cy.get('.sign-v3-limg').should('be.visible')
        cy.get('.sign-up-v3-container').should('be.visible')
        cy.get('.already-txt').should('be.visible')
        cy.get('h3').contains(' SIGN IN ')

        //To check button disabled without input
        cy.get('.sign-in-btn-v3').should('be.disabled')

        //To check alert message
        cy.get('#mat-input-0').focus().blur()
        cy.get('#mat-error-0')
            .should('have.text', 'WhatsApp number / Email Address is required')

        //To check invalid credentials
        cy.get('#mat-input-0').type('0000000000000')

        //To check button enabled
        cy.get('.sign-in-btn-v3').should('be.enabled')

        cy.get('.sign-in-btn-v3').click()
        cy.get('#mat-error-1')
            .should('have.text', 'Incorrect Email Address or Mobile Number')
        cy.get('#mat-input-0').focus().clear()



        //Entering registered number
        cy.get('#mat-input-0').type('9999955555')
        cy.get('.sign-in-btn-v3').click()

        //Entering OTP
        cy.get('input').first().focus()
        cy.get('#mat-input-2').type('100512').type('{enter}')
        // cy.get('.signbtn-v3').click()


    })
})


/*

//New Signin screen
describe('Signin Page', () => {
//Launch URL
    it('Launch URL', () => {
        cy.visit('http://localhost:9090/auth/v3/login')
//Entering Registered number
        cy.get('#mat-input-0').type('7016104846')
        cy.get('.mat-button-wrapper > .ng-star-inserted').contains('NEXT').click()
    })
})
*/