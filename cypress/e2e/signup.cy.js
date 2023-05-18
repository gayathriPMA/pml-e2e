

/*describe('Signup Page',()=>{
    it('Launch URL',()=>{
        cy.visit('http://localhost:9090/')
         //Checking New URL with assert
         cy.url()
         .should('eq', 'http://localhost:9090/auth/login')
         cy.get('.mat-form-field-infix').click()
         cy.get('#mat-option-0 > .mat-option-text').click()
         cy.get('.h-signin').click()
         //Checking new url with assert
         cy.url()
         .should('eq','http://localhost:9090/auth/signup')
         //Fill signup form
         cy.get('#mat-input-1').type('Gayathri')
         cy.get('#mat-input-2').type('gayathri@pickmyad.com')
         cy.get('#mat-input-3').type('7016104846')
         cy.get('#mat-select-value-3').click()
         cy.get('#mat-option-3 > .mat-option-text').click()
         cy.get('.mat-button-wrapper > .ng-star-inserted').contains('Create an account').click()




    })
})*/

//Pickmy.link signup screen
//import { slowCypressDown } from 'cypress-slow-down'
//slowCypressDown(1000)
describe('Signup Page', () => {
    //Before hook
    beforeEach(() => {
        cy.visit('http://localhost:9090/auth/v3/login')
        cy.get('.already-txt > span').click()
        
        //Checking new URL
        cy.url()
            .should('eq', 'http://localhost:9090/auth/v3/signup')
        //To check UI in Iphone 
        cy.viewport('iphone-se2')
    })
    //After hook
    after(() => {
        //wait for time
        cy.wait(500)

    })
    it('User not able to finish signup and move to OTP screen without entering mandatory fields', () => {

        //Error message validation
        cy.get('#ProfileNameInput1').focus().blur()
        cy.get('#mat-error-1')
            .should('have.text', ' Profile name is required ')
        cy.get('#mat-input-2').focus().blur()
        cy.get('#mat-error-2')
            .should('have.text', 'Full name is required ')
        cy.get('#mat-input-3').focus().blur()
        cy.get('#mat-error-6')
        .should('have.text', 'Invalid WhatsApp number ')
        cy.get('#mat-input-4').focus().blur()
        cy.get('#mat-error-4')
            .should('have.text', 'Email Address is required ')
        cy.get('.sign-in-btn-v3').click({ force: true })
    })


    it('User able to finish signup and move to OTP screen by entering mandatory fields', () => {
        //Fill signup form 
        cy.get('#ProfileNameInput1').type('GayathriPMA')
        cy.get('#mat-input-2').type('Gayathri')
        cy.get('.iti__selected-dial-code').click()
        cy.get('#iti-item-in').click()
        cy.get('#mat-input-3').type('7016104800')
        cy.get('#mat-input-4').invoke('emailRegEx')
        .should('match', /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{1,14})+$/)
        //cy.get('#mat-input-4').type('gayathri@pickmy.com')
        cy.get('#mat-select-value-1').click()
        cy.get('#mat-option-3 > .mat-option-text').click()
        cy.get('.sign-in-btn-v3').click({ force: false })
        //Checking moving to next screen
        cy.contains('ENTER OTP')
        //Going back to signup screen
        cy.go(-1)
       cy.location('pathname').should('eq', '/auth/v3/login')


    })



})