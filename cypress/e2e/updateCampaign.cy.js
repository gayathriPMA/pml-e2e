describe('Update Campaign', () => {
    beforeEach(() => {
      // Visit the page where the campaign can be updated
      const campaignId = 'your_campaign_id'; // Replace with the actual campaign ID
      cy.visit(`/campaigns/update/${campaignId}`);
    });
  
    it('should update an existing campaign', () => {
      // Update the campaign information
      cy.get('[formControlName="campaignName"]').clear().type('Updated Campaign');
      cy.get('[formControlName="budget"]').clear().type('1500');
      cy.get('[formControlName="brandName"]').type('Updated Brand');
      cy.get('.mat-option').contains('Updated Brand').click();
      cy.get('[formControlName="description"]').clear().type('Updated description');
  
      // Remove a deliverable (if required)
      // cy.get('.remove-deliverable-btn').eq(0).click(); // Click on the appropriate button to remove a deliverable
  
      // Update an existing deliverable (if required)
      // cy.get('[formControlName="platforms"]').eq(0).select('instagram');
      // cy.get('[formControlName="adType"]').eq(0).select('adType2');
      // cy.get('[formControlName="qty"]').eq(0).select('2');
  
      // Submit the form
      cy.get('.find-btn').click();
  
      // Assertions (Adjust according to your application)
      // Example:
      // cy.url().should('include', '/campaigns/create/');
      // cy.get('.success-message').should('contain', 'Campaign updated successfully');
    });
  });
  it('should update an existing campaign', () => {
    // Assuming you have an existing campaign with the campaign ID in the URL
    cy.visit('/campaigns/update/your-campaign-id'); // Replace 'your-campaign-id' with the actual campaign ID

    // Verify the campaign information is pre-filled (if applicable)
    cy.get('[formControlName="campaignName"]').should('have.value', 'Existing Campaign Name');
    cy.get('[formControlName="brandName"]').should('have.value', 'Existing Brand Name');
    cy.get('[formControlName="budget"]').should('have.value', '5000');
    cy.get('[formControlName="description"]').should('have.value', 'This is an existing campaign.');

    // Optionally, you can also verify the existing deliverables and perform updates
    // For example, changing the quantity or adding new deliverables

    // Update the campaign information
    cy.get('[formControlName="campaignName"]').clear().type('Updated Campaign Name');
    cy.get('[formControlName="budget"]').clear().type('7000');
    cy.get('[formControlName="description"]').clear().type('This is an updated campaign description.');

    // Update the campaign banner image (similar to uploading a new image)

    // Submit the form
    cy.contains('button', 'Update Campaign').click();

    // Assert success message or navigate to the next step if applicable
    cy.contains('.campaign-success-message', 'Campaign updated successfully').should('be.visible');
  });

  // Add more test cases as needed to cover other scenarios and edge cases.
});