describe('Sign In with Google', () => {
    beforeEach(() => {
      cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false }) // Visit the login page before each test
    })
  
    it('should sign in successfully with a Google account', () => {
      cy.get('.google-btn').click() // Click the "Sign In with Google" button
  
      // Switch to the Google sign-in popup window
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen') // Stub the window.open method to track the popup window
  
        // Perform assertions on the popup window
        cy.get('@windowOpen').should('be.calledOnce')
          .and('be.calledWith', 'https://accounts.google.com/o/oauth2/v2/auth/') // Assert the URL of the Google sign-in page
  
        // Simulate successful authentication by setting a dummy token
        // const token = 'dummy_token'
        // cy.wrap(win).invoke('handleGoogleSignIn', token) // Replace "handleGoogleSignIn" with your actual method name
  
        // Assert that the user is redirected to the dashboard or home page after successful sign-in
    //     cy.url().should('include', '/dashboard') // Or any other page where the user is redirected after signing in
    //     cy.get('.welcome-message').should('have.text', 'Welcome, John Doe') // Replace with the appropriate welcome message element
      })
    })
  
    // it('should handle sign-in cancellation', () => {
    //   cy.get('.google-signin-button').click() // Click the "Sign In with Google" button
  
    //   // Switch to the Google sign-in popup window
    //   cy.window().then((win) => {
    //     cy.stub(win, 'open').as('windowOpen') // Stub the window.open method to track the popup window
  
    //     // Perform assertions on the popup window
    //     cy.get('@windowOpen').should('be.calledOnce')
    //       .and('be.calledWith', 'https://accounts.google.com/...') // Assert the URL of the Google sign-in page
  
    //     // Simulate cancellation by closing the popup window
    //     cy.wrap(win).invoke('handleGoogleSignIn', null) // Replace "handleGoogleSignIn" with your actual method name
  
    //     // Assert that the user remains on the login page after sign-in cancellation
    //     cy.url().should('include', '/login') // Or any other page where the user should be redirected
    //     cy.get('.login-heading').should('have.text', 'Login') // Replace with the appropriate login page element
    //   })
    // })
  })
  