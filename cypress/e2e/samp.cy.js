cy.get('.table-layout').should('have.length', 3);

    // Additional example commands
    cy.get('.sidebar').should('be.visible'); // Assert that the sidebar is visible
    cy.get('#search-input').type('Cypress').should('have.value', 'Cypress'); // Type in a search input and assert its value
    // Example navigation within the dashboard
    cy.get('.sidebar').contains('Settings').click();
    cy.url().should('include', '/settings');
    cy.get('.settings-page').should('be.visible');
  
    cy.get('.sidebar').contains('Dashboard').click();
    cy.url().should('include', '/dashboard');
    cy.get('.reports-page').should('be.visible');
  
    // Example interaction with forms or inputs
    cy.get('#search-input').type('Cypress');
    cy.get('#search-button').click();
    cy.get('.search-results').should('contain', 'Search results for "Cypress"');
    cy.get('.search-results').find('.result').should('have.length', 5);
  
    cy.get('#filter-select').select('Option 2');
    cy.get('.filtered-data').should('contain', 'Filtered data for Option 2');
  
    // Example logout action
    cy.get('.profile-dropdown').click();
    cy.contains('Logout').click();
    cy.url().should('include', '/login');

    it('Checks a CRM table page after login', () => {
        cy.visit('/crm/table');
        cy.contains('CRM Table').should('be.visible');
        cy.get('.crm-table').should('be.visible');
      
        // Example actions or assertions on the CRM table page
        cy.get('.crm-table').find('tr').should('have.length', 10);
        
        cy.get('.crm-table').contains('John Doe').should('be.visible');
        cy.get('.crm-table').contains('John Doe').parent('tr').within(() => {
          cy.get('.edit-button').click();
        });
      
        cy.url().should('include', '/crm/edit');
        cy.get('.edit-page').should('be.visible');
        //Create
        cy.get('#first-name-input').clear().type('Jane');
        cy.get('#last-name-input').clear().type('Doe');
        cy.get('#save-button').click();
        
        cy.url().should('include', '/crm/table');
        cy.get('.crm-table').contains('Jane Doe').should('be.visible');
        
        // Example sorting and filtering assertions
        cy.get('.sort-button').click();
        cy.get('.crm-table').find('tr').first().contains('Alice').should('be.visible');
      
        cy.get('#filter-input').type('New York');
        cy.get('.filter-button').click();
        cy.get('.crm-table').find('tr').should('have.length', 2);
        cy.get('.crm-table').contains('New York').should('be.visible');
      
        // Example pagination assertions
        cy.get('.pagination').contains('Next').click();
        cy.get('.crm-table').find('tr').should('have.length', 5);
        cy.get('.pagination').contains('Prev').click();
        cy.get('.crm-table').find('tr').should('have.length', 10);
        
        // Example deletion action
        cy.get('.crm-table').contains('Jane Doe').parent('tr').within(() => {
          cy.get('.delete-button').click();
        });
        
        cy.get('.confirm-dialog').should('be.visible');
        cy.get('.confirm-dialog').contains('Yes').click();
        
        cy.url().should('include', '/crm/table');
        cy.get('.crm-table').contains('Jane Doe').should('not.exist');
      
// Example additional assertions on table data
cy.get('.data-table').contains('John Doe').parent('tr').within(() => {
    cy.get('.email').should('have.attr', 'href').and('include', '@');
    cy.get('.status').should('have.class', 'active');
    cy.get('.actions').find('.edit-button').should('be.visible');
    cy.get('.actions').find('.delete-button').should('be.visible');
  });

  cy.get('.data-table').contains('New York').parent('tr').within(() => {
    cy.get('.address').invoke('text').should('contain', 'New York');
    cy.get('.phone').invoke('text').should('match', /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/);
    cy.get('.data-table').find('tr').each((row) => {
        cy.wrap(row).find('.name').should('not.be.empty');
        cy.wrap(row).find('.age').invoke('text').should('match', /^\d+$/);
        cy.wrap(row).find('.actions').should('have.class', 'actions');
      });
    
      cy.get('.data-table').contains('Los Angeles').parent('tr').within(() => {
        cy.get('.status').invoke('text').then((text) => {
          expect(text.trim()).to.equal('Active');
          // Example search action and assertion
  cy.get('#search-input').type('Doe');
  cy.get('.search-button').click();
  cy.get('.crm-table').contains('Jane Doe').should('be.visible');

  // Example row selection action and assertion
  cy.get('.crm-table').contains('John Doe').parent('tr').click();
  cy.get('.crm-table').contains('John Doe').parent('tr').should('have.class', 'selected');

  // Example column assertion
  cy.get('.crm-table').find('.email').each((emailColumn) => {
    cy.wrap(emailColumn).invoke('text').should('match', /^\S+@\S+\.\S+$/);
  });

  // Example exporting data
  cy.get('.export-button').click();
  cy.get('.export-dialog').should('be.visible');
  cy.get('.export-dialog').contains('CSV').click();
  cy.get('.export-dialog').contains('Download').click();
  cy.wait(3000); // Wait for the download to complete (adjust as needed)

  // Example import action
  const fileName = 'customers.csv'; // Replace with the actual file name
  cy.fixture(fileName).then((fileContent) => {
    cy.get('#import-input').upload({ fileContent, fileName, mimeType: 'text/csv' });
  });
  cy.get('#import-button').click();
  cy.get('.import-dialog').should('be.visible');
  cy.get('.import-dialog').contains('Import').click();

  // Example success message assertion after import
  cy.get('.success-message').should('be.visible');
  cy.checkTableSize('.crm-table', 20);