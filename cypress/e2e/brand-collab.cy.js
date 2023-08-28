/// <reference types = "cypress"/>

describe('Brand Collaboration', () => {
  beforeEach(() => {
    cy.visit('https://dev-app.pickmyad.com/auth')
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
      cy.get('body').type('Sajith!0708')
      cy.get('.VfPpkd-vQzf8d').contains('Next').click()
      cy.wait(5000)

    })
    cy.url().should('include', '/home')

  })

  it('should submit channel URL and navigate to the profile page when submitYtURL() is called with a valid URL', () => {
    cy.get('.route-app').first().click()
    //cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms'); 
    //cy.intercept('POST', '/your-api-endpoint', { status: 200, body: { /* Response data */ } }).as('submitYtURL');
    cy.get('#mat-input-3').clear().type('https://www.youtube.com/@review_towards_peace');
    cy.get('.submit-btnv3').click()
    //cy.wait('@submitYtURL');
    cy.get('.success-pop > .mat-focus-indicator').click()
    cy.get('.mat-button-wrapper > .ng-star-inserted').click()
    cy.url().should('include', '/gayu'); // Replace with the expected profile name

    //should submit Instagram profile URL and navigate to the profile page when submitInstaURL() is called with a valid URL', () => {
    // cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms');
    //cy.intercept('POST', '/your-api-endpoint', { status: 200, body: { /* Response data */ } }).as('submitInstaURL');
    cy.get('#mat-input-6').clear().type('https://www.instagram.com/mitai_sastri');
    cy.get('.submit-btnv3').click();
    //cy.wait('@submitInstaURL');
    cy.get('.success-pop > .mat-focus-indicator').click()
    cy.get('.mat-button-wrapper > .ng-star-inserted').click()
    cy.url().should('include', '/gayu');

    //should trigger delete function when YouTube delete icon is clicked
    // Assume the component already has a YouTube channel added.
    // Click the delete icon for the YouTube channel
    cy.get('[data-mat-icon-name="url-clear"]').first().click();
    cy.get('#mat-input-9').type('DISCONNECT')
    cy.get('.delete-acc > .mat-button-wrapper').click()


    // Assert that the YouTube channel is removed 
    // if the YouTube channel list is empty after the deletion.
    cy.get('#mat-input-7').should('have.value', '')

    //should trigger delete function when Instagram delete icon is clicked
    // Assume the component already has an Instagram channel added.
    // Click the delete icon for the Instagram channel
    cy.get('[data-mat-icon-name="url-clear"]').first().click();
    cy.get('#mat-input-10').type('DISCONNECT')
    cy.get('.delete-acc > .mat-button-wrapper').click()

    // Assert that the Instagram channel is removed 
    // check if the Instagram channel list is empty after the deletion.
    cy.get('#mat-input-8').should('have.value', '');


    //should clear ytURL and hide save/cancel buttons when clear is clicked
    //cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms');
    cy.get('#mat-input-7').type('review_towards_peace');
    cy.get('.abort-btnv3').click();
    cy.get('#mat-input-7').should('have.value', '');
    cy.get('mat-focus-indicator submit-btnv3 mat-button mat-button-base').should('not.exist');

    //should clear instaURL and hide save/cancel buttons when clear is clicked
    //cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms');
    cy.get('#mat-input-8').type('mitai_sastri');
    cy.get('.abort-btnv3').click();
    cy.get('#mat-input-8').should('have.value', '');
    cy.get('mat-focus-indicator submit-btnv3 mat-button mat-button-base').should('not.exist');

    //should show an error message for an invalid YouTube URL
    //cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms');
    cy.get('#mat-input-7').type('invalid-youtube-url');
    cy.get('.submit-btnv3').click();
    cy.get('.db-notifi').should('be.visible');

    //should show an error message for an invalid Instagram URL
    //cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms')
    cy.get('#mat-input-8').type('mitai_sastri');
    cy.get(':nth-child(4) > .acess-btn > .useflex > .submit-btnv3 > .mat-button-wrapper > .ng-star-inserted').click();
    cy.get('.db-notifi').should('be.visible');


    //should display an error message when duplicate YouTube channel is submitted
    // Assume the component already has some YouTube channels added
    // Submit a duplicate YouTube channel URL
    const duplicateYoutubeUrl = 'https://www.youtube.com/@mukeshv6044';
    cy.get('#mat-input-7').type(duplicateYoutubeUrl);
    cy.get('.submit-btnv3').click();

    // Assert that an error message is displayed
    cy.get('.channelErr').should('be.visible');


    //should display an error message when duplicate Instagram channel is submitted
    // Assume the component already has some Instagram channels added.
    // Submit a duplicate Instagram channel URL
    const duplicateInstagramUrl = 'https://www.instagram.com/sagaexports/';
    cy.get('#mat-input-8').type(duplicateInstagramUrl);
    cy.get('.submit-btnv3').click();

    // Assert that an error message is displayed
    cy.get('.channelErr').should('be.visible');
  })
})
