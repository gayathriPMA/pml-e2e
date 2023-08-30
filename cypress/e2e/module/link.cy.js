
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

  it('should display links screen', () => {
    cy.get('.route-app').first().click()

    // Toggle to "Links" tab and verify the correct component is displayed
    cy.contains('Links').click();
    cy.get('pma-web-link').should('be.visible');

    // Toggle to "Social Links" tab and verify the correct component is displayed
    cy.contains('Social Links').click();
    cy.get('pma-web-social-media').should('be.visible');

    // Toggle to "Design" tab and verify the correct component is displayed
    cy.contains('Design').click();
    cy.get('pma-web-design').should('be.visible');

    // Toggle to "Analytics" tab and verify the correct component is displayed
    cy.contains('Analytics').click();
    cy.get('pma-web-analytics').should('be.visible');

    // Toggle to "Settings" tab and verify the correct component is displayed
    cy.contains('Settings').click();
    cy.get('pma-web-settings').should('be.visible');


  })
})
describe('LinkComponent', () => {
  beforeEach(() => {
    cy.visit('/'); // Replace with the URL of your Angular app
  });

  it('should add a new single link and verify functionality', () => {
    cy.get('.add-link-btn').click();
    cy.get('.group-link').contains('Single Link').click();

    cy.get('.link-bio-title p').should('have.text', 'title');

    cy.get('.link-bio-title input').type('My New Link Title');
    cy.get('.url-input input').type('https://www.example.com');
    cy.get('.link-bio-title p').should('have.text', 'My New Link Title');
    cy.get('.url-input input').should('have.value', 'https://www.example.com');

    cy.get('.link-upload button').should('have.length', 1).click();

    cy.get('.link-upload img').should('be.visible');
    cy.get('.icons-hover mat-icon').eq(0).click();

    cy.get('.video-popup-container').should('be.visible');

    cy.get('.embed-btn').click();
    cy.get('.video-popup-container').should('be.visible');
  });

  it('should reorder links and prioritize link', () => {
    cy.get('.drag-outline').eq(0).should('have.css', 'cursor', 'move');

    cy.get('.drag-outline').eq(1).should('have.css', 'cursor', 'not-allowed');

    cy.get('.drag-outline').eq(2).should('have.css', 'cursor', 'move');

    cy.get('.drag-outline').eq(0).trigger('mousedown').trigger('mousemove', { clientX: 0, clientY: 100 }).trigger('mouseup');

    cy.get('.link-bio-title p').eq(0).should('have.text', 'My New Link Title');

    cy.get('.drag-outline').eq(1).trigger('mousedown').trigger('mousemove', { clientX: 0, clientY: 200 }).trigger('mouseup');

    cy.get('.drag-outline').eq(2).click();
    cy.get('.edit-icon').should('have.text', 'Not Allowed');

    cy.get('.drag-outline').eq(0).trigger('mousedown').trigger('mousemove', { clientX: 0, clientY: 200 }).trigger('mouseup');
    cy.get('.drag-outline').eq(2).trigger('mousedown').trigger('mousemove', { clientX: 0, clientY: 100 }).trigger('mouseup');

    cy.get('.link-bio-title p').eq(0).should('have.text', 'title');
  });

  // Add more test cases as needed
});
