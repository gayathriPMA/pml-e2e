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
    // it('should open YouTube connect URL when connectYt() is called', () => {
    //     cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms');
    //     cy.window().then((win) => {
    //         cy.stub(win, 'open').as('openStub');
    //     });
    //     cy.get('[data-cy="connect-yt-btn"]').click();
    //     cy.get('@openStub').should(
    //         'be.calledWith',
    //         'https://youtube-connect-url.com', // Replace with the expected YouTube connect URL
    //         '_self'
    //     );
    // });
    // it('should initialize Instagram API when connectInsta() is called', () => {
    //     cy.visit('/your-component-route'); // Replace with the actual route of the component
    //     cy.window().then((win) => {
    //         cy.stub(win.fapi, 'fbInitialize').as('fbInitializeStub');
    //     });
    //     cy.get('[data-cy="connect-insta-btn"]').click();
    //     cy.get('@fbInitializeStub').should('be.calledWith', 'your-profileName_v3'); // Replace with the expected encoded profile name
    // });
    // it('should set ytsaveCancelBtns to true and clear channelAlreadyTakenErr when ytInputChange() is called', () => {
    //     cy.visit('/your-component-route'); // Replace with the actual route of the component
    //     cy.get('[data-cy="yt-input"]').type('your-youtube-channel-url'); // Replace with the desired YouTube channel URL
    //     cy.get('[data-cy="yt-input"]').should('have.value', 'your-youtube-channel-url');
    //     cy.get('[data-cy="yt-save-cancel-btns"]').should('be.visible');
    //     cy.get('[data-cy="channel-taken-error"]').should('not.exist');
    // });
    // it('should set instasaveCancelBtns to true and clear profileAlreadyTakenErr when instaInputChange() is called', () => {
    //     cy.visit('/your-component-route'); // Replace with the actual route of the component
    //     cy.get('[data-cy="insta-input"]').type('your-instagram-profile-url'); // Replace with the desired Instagram profile URL
    //     cy.get('[data-cy="insta-input"]').should('have.value', 'your-instagram-profile-url');
    //     cy.get('[data-cy="insta-save-cancel-btns"]').should('be.visible');
    //     cy.get('[data-cy="profile-taken-error"]').should('not.exist');
    // });
    it('should submit YouTube channel URL and navigate to the profile page when submitYtURL() is called with a valid URL', () => {
        cy.get(':nth-child(3) > .cdk-drag > .route-app > .link-bio').click()
       
        cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms'); 
        //cy.intercept('POST', '/your-api-endpoint', { status: 200, body: { /* Response data */ } }).as('submitYtURL');
        cy.get('#mat-input-4').type('https://www.youtube.com/@review_towards_peace'); 
        cy.get('.submit-btnv3').click()
        //cy.wait('@submitYtURL');
        cy.get('.success-pop > .mat-focus-indicator').click()
        cy.get('.mat-button-wrapper > .ng-star-inserted').click()
        cy.url().should('include', '/v3/yt/gayu'); // Replace with the expected profile name
    });
    it('should submit Instagram profile URL and navigate to the profile page when submitInstaURL() is called with a valid URL', () => {
        cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms'); 
        //cy.intercept('POST', '/your-api-endpoint', { status: 200, body: { /* Response data */ } }).as('submitInstaURL');
        cy.get('#mat-input-7').type('https://www.instagram.com/mitai_sastri'); 
        cy.get('.submit-btnv3').click();
        //cy.wait('@submitInstaURL');
        cy.get('.success-pop > .mat-focus-indicator').click()
        cy.get('.mat-button-wrapper > .ng-star-inserted').click()
        cy.url().should('include', '/v3/insta/gayu'); 
    });
    it('should clear ytURL and hide save/cancel buttons when ytCancel() is called', () => {
        cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms'); 
        cy.get('#mat-input-4').type('review_towards_peace'); 
        cy.get('.abort-btnv3').click();
        cy.get('#mat-input-4').should('have.value', '');
        cy.get('.acess-btn').should('not.exist');
    });
    it('should clear instaURL and hide save/cancel buttons when instCancel() is called', () => {
        cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms'); 
        cy.get('#mat-input-7').type('mitai_sastri'); 
        cy.get('.abort-btnv3').click();
        cy.get('#mat-input-7').should('have.value', '');
        cy.get('.acess-btn').should('not.exist');
    });
    it('should show an error message for an invalid YouTube URL', () => {
        cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms'); 
        cy.get('#mat-input-4').type('invalid-youtube-url');
        cy.get('.submit-btnv3').click();
        cy.get('.db-notification').should('be.visible');
    });
    it('should show an error message for an invalid Instagram URL', () => {
        cy.visit('https://dev-app.pickmyad.com/influencer/profile/gayu/brand-collab/platforms')
        cy.get('#mat-input-7').type('mitai_sastri');
        cy.get('.submit-btnv3').click();
        cy.get('.db-notification').should('be.visible');
      });
      
      // add_platforms.spec.js
  
    it('should trigger delete function when YouTube delete icon is clicked', () => {
      // Assume the component already has a YouTube channel added.
      // Click the delete icon for the YouTube channel
      cy.get('[data-mat-icon-name="url-clear"]').first().click();
  
      // Assert that the YouTube channel is removed (you can assert UI changes or API calls)
      // For example, you could check if the YouTube channel list is empty after the deletion.
      cy.get('mat-input-6').should('have.value','')
    });
  
    it('should trigger delete function when Instagram delete icon is clicked', () => {
      // Assume the component already has an Instagram channel added.
      // Click the delete icon for the Instagram channel
      cy.get('[data-mat-icon-name="url-clear"]').first().click();
  
      // Assert that the Instagram channel is removed (you can assert UI changes or API calls)
      // For example, you could check if the Instagram channel list is empty after the deletion.
      cy.get('mat-input-7').should('have.value', ' ');
    });
   // add_platforms.spec.js

    it('should display an error message when duplicate YouTube channel is submitted', () => {
      // Assume the component already has some YouTube channels added.
      // Submit a duplicate YouTube channel URL
      const duplicateYoutubeUrl = 'https://www.youtube.com/@mukeshv6044';
      cy.get('#mat-input-4').type(duplicateYoutubeUrl);
      cy.get('.submit-btnv3').click();
  
      // Assert that an error message is displayed
      cy.get('.channelErr').should('be.visible');
    });
  
    it('should display an error message when duplicate Instagram channel is submitted', () => {
      // Assume the component already has some Instagram channels added.
      // Submit a duplicate Instagram channel URL
      const duplicateInstagramUrl = 'https://www.instagram.com/sagaexports/';
      cy.get('#mat-input-7').type(duplicateInstagramUrl);
      cy.get('.submit-btnv3').click();
  
      // Assert that an error message is displayed
      cy.get('.channelErr').should('be.visible');
    });
  });
   
    it('Brand collaboration', () => {

        cy.get(':nth-child(3) > .cdk-drag > .route-app > .link-bio').click()
        cy.get('#mat-input-6').type('https://www.youtube.com/@VexTrexKidsCartoon')
        cy.get('.submit-btnv3').click()
        cy.get('.success-pop > .mat-focus-indicator').click()
        cy.get('.mat-button-wrapper > .ng-star-inserted').click()
        cy.get(':nth-child(2) > a > .platform').click()
        cy.get(':nth-child(1) > .profile-edit-cate > .mat-focus-indicator').click()
        cy.get('#mat-input-5').click()
        cy.get('#mat-checkbox-42 > .mat-checkbox-layout > .mat-checkbox-label').click()
        cy.get('.profile-edit-save').click()
        cy.get(':nth-child(4) > .profile-edit-cate > .mat-focus-indicator').click()
        cy.get('.gender-cards > :nth-child(4)').click()
        cy.get('.yes-btnv3').click()
        cy.get(':nth-child(5) > .profile-edit-cate > .mat-focus-indicator').click()
        cy.get('#mat-checkbox-78 > .mat-checkbox-layout').click()



    })


