
describe('Create Campaign Page', () => {
    const loginUrl = 'https://dev-app.pickmyad.com/auth/admin/login';
    const loggedInUrl = '/campaigns';
    before(() => {
        cy.visit(loginUrl, { failOnStatusCode: false });
        // Login with Google
        cy.get('.google-btn').click();
        cy.origin('https://accounts.google.com/o/oauth2/v2/auth/', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            cy.wait(20000)

            cy.get('#identifierId').type('gayathri@pickmyad.com');
            cy.get('.VfPpkd-vQzf8d').contains('Next').click();
            cy.get('#captchaimg').should('be.visible');
            cy.pause();
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000); // Adjust the wait time if needed, or replace with cy.contains or cy.get with { timeout: ... }
            cy.get('body').type('Sajith!0708');
            cy.get('.VfPpkd-vQzf8d').contains('Next').click();
        })
    });
    beforeEach(() => {
        // Visit the Create Campaign page before each test
        cy.visit('/campaigns/create');
    });


    it('should fill out the campaign information form correctly', () => {
        // Fill out the campaign information form
         // Fill in the Campaign Name field
        cy.get('[formControlName="campaignName"]').type('Clearance sale for flipkart');
        cy.get('input[formControlName=campaignName]').type('My Test Campaign');
        cy.get('[formControlName="campaignName"]').type('My Test Campaign');
         // Fill in the Campaign Brief field
        cy.get('[formControlName="description"]').type('This is a brief description.');
        cy.get('[formControlName="description"]').type('This is a test campaign.');
        cy.get('textarea[formControlName=description]').type('This is a test campaign.');
        cy.get('[formControlName="description"]').type('This is a campaign description.');
        cy.contains('.description-content', 'This is a campaign description.').should('be.visible');
        // Multiline input for campaign description
        cy.get('[formControlName="description"]').type('Line 1{enter}Line 2');
        cy.get('[formControlName="description"]').should('have.value', 'Line 1\nLine 2');
        cy.get('[formControlName="description"]').type('This is a campaign description.');


        cy.get('[formControlName="brandName"]').type('Brand ABC');
        cy.get('[formControlName="brandName"]').type('{enter}'); // Press Enter to select the brand
        cy.get('[formControlName="brandName"]').type('Brand Test');
        cy.get('.brand_list-options.mat-autocomplete-panel')
            .contains('Brand Test')
            .click();


        cy.get('[formControlName="budget"]').type('10000');
        // Fill in the Budget field
        cy.get('input[formControlName=budget]').type('10000');
        cy.get('[formControlName="budget"]').type('10000');


       
        // Add deliverables
        cy.get('.add-deliverables-btn').click();
        cy.get('[formControlName="platforms"]').eq(0).type('youtube');
        cy.get('[formControlName="platforms"]').eq(0).type('{enter}');
        cy.get('[formControlName="adType"]').eq(0).type('ad-type-1');
        cy.get('[formControlName="adType"]').eq(0).type('{enter}');
        cy.get('[formControlName="qty"]').eq(0).select('1');
        // Fill in the Quantity field
        cy.get('mat-select[formControlName=qty]').click();
        cy.contains('.mat-option', '1').click();


        // Select Platforms and Ad Types
        cy.get('mat-select[formControlName=platforms]').click();
        cy.contains('.mat-option', 'youtube').click();
        cy.get('.create-campagin-input.campagin-platforms').eq(0).click();
        cy.get('.mat-option').contains('youtube').click();

        cy.get('mat-select[formControlName=adType]').click();
        cy.contains('.mat-option', 'Ad Type 1').click();
        cy.get('.create-campagin-input.campagin-ad-type').eq(0).click();
        cy.get('.mat-option').contains('Ad Type 1').click();

        cy.get('.ad-type-qty').eq(0).click();
        cy.get('.mat-option').contains('1').click();



        // Click the "Add another deliverables" button
        cy.get('.add-deliverables-btn').click();

        // Add a second deliverable
        cy.get('mat-select[formControlName=platforms]').eq(1).click();
        cy.contains('.mat-option', 'instagram').click();
        cy.get('mat-select[formControlName=adType]').eq(1).click();
        cy.contains('.mat-option', 'Ad Type 2').click();
        cy.get('mat-select[formControlName=qty]').eq(1).click();
        cy.contains('.mat-option', '2').click();


        cy.get('.add-deliverables-btn').click();

        cy.get('.create-campagin-input.campagin-platforms').eq(1).click();
        cy.get('.mat-option').contains('instagram').click();

        cy.get('.create-campagin-input.campagin-ad-type').eq(1).click();
        cy.get('.mat-option').contains('Ad Type 2').click();

        cy.get('.ad-type-qty').eq(1).click();
        cy.get('.mat-option').contains('2').click();


        // Save the form
        cy.get('.find-btn').click();
        // Submit the form
        cy.contains('button[type="submit"]', 'Find Influencers').click();

        // Verify that the form submission was successful (you can add assertions based on your application behavior)
        // For example:
        cy.contains('Campaign created successfully');
        it('should successfully create a new campaign', () => {
            const campaignData = {
                campaignName: 'Test Campaign',
                brandName: 'Test Brand',
                budget: '1000',
            };

            // Visit the page where you can create a new campaign
            cy.visit('/path/to/your/create/campaign/page');

            // Fill in the campaign details in the input fields
            cy.get('.create-campaign-input mat-form-field[formControlName="campaignName"]').type(campaignData.campaignName);
            cy.get('.create-campaign-input mat-form-field[formControlName="brandName"]').type(campaignData.brandName);
            cy.get('.create-campaign-input mat-form-field[formControlName="budget"]').type(campaignData.budget);

            // Submit the form to create the campaign
            cy.get('.submit-button').click();

            // Assuming successful campaign creation, assert some element on the success page
            cy.get('.success-message').should('contain', 'Campaign created successfully!');
            // Assert that the campaign has been successfully created
            // You can check for success message, URL, or any other UI element that indicates success
            // Assert success message or navigate to the next step if applicable
            cy.contains('.campaign-success-message', 'Campaign created successfully').should('be.visible');
            cy.url().should('include', '/discover');
            cy.contains('h2', 'Discover Influencers');
        });


    });
    it('should show error messages for required fields', () => {
        // Do the same actions as the previous test, but leave some required fields empty
        // Verify that the error messages for required fields are displayed
        cy.get('.mat-error').should('contain', 'Required Field');
    });
    // Invalid campaign name containing special characters
    cy.get('[formControlName="campaignName"]').type('Invalid # Campaign Name');
    cy.contains('.mat-error', 'Only alphanumeric allowed').should('be.visible');
    it('should display an error message if campaign name is too long', () => {
        // Fill out campaign name with more than 150 characters
        const longCampaignName = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Suspendisse potenti. Nullam in tellus ligula.';

        cy.get('[formControlName="campaignName"]').type(longCampaignName);

        // Verify that the max length error message is displayed
        cy.contains('mat-error', 'Max - 150 Characters').should('be.visible');
    });
    it('should handle unsuccessful campaign creation with invalid campaign name', () => {
        // Fill out campaign information with invalid campaign name
        cy.get('[formControlName="campaignName"]').type('!@#$%^');

        // Submit the form
        cy.contains('button', 'Find Influencers').click();

        // Verify that error message for invalid campaign name is displayed
        cy.contains('mat-error', 'Only alphanumeric allowed').should('be.visible');
    });



    // Invalid brand name that does not exist in the brand list
    cy.get('[formControlName="brandName"]').type('Invalid Brand Name');
    cy.contains('.mat-error', 'Not found in brand list').should('be.visible');
    it('should display the uploaded campaign banner', () => {
        // Upload a campaign banner image and check if it's displayed
        // Example: cy.get('input[type="file"]').attachFile('your-image-file.jpg');
        // Upload Campaign Banner
        // Assumes you have implemented the file upload component and it has a test ID "campaign-banner-upload"
        // You can use `cy.get('input[test-id=campaign-banner-upload]').attachFile('path/to/image.jpg');`

        cy.get('.campaign-banner').should('be.visible');
    });

    // Verify that the uploaded images are displayed correctly in the UI
    cy.get('.campaign-banner img').should('be.visible');
    cy.get('.brand-logo img').should('be.visible');
    // Upload campaign banner image
    cy.fixture('sample_banner_image.jpg').then((fileContent) => {
        cy.get('.file-upload h3').contains('Campaign banner').next().attachFile({
            fileContent: fileContent,
            fileName: 'sample_banner_image.jpg',
            mimeType: 'image/jpeg',
        });
    });


    // Upload brand logo image
    cy.fixture('sample_logo_image.jpg').then((fileContent) => {
        cy.get('.file-upload h3').contains('Brand Logo').next().attachFile({
            fileContent: fileContent,
            fileName: 'sample_logo_image.jpg',
            mimeType: 'image/jpeg',
        });

        // Upload campaign banner
        cy.fixture('campaign_banner.jpg').then(fileContent => {
            cy.get('.campaign-banner-input').attachFile({
                fileContent: fileContent,
                fileName: 'campaign_banner.jpg',
                mimeType: 'image/jpeg'
            });
        });

        // Upload brand logo
        cy.fixture('brand_logo.png').then(fileContent => {
            cy.get('.brand-logo-input').attachFile({
                fileContent: fileContent,
                fileName: 'brand_logo.png',
                mimeType: 'image/png'
            });
        });

        it('should display the uploaded brand logo', () => {
            // Upload a brand logo image and check if it's displayed
            // Example: cy.get('input[type="file"]').attachFile('your-logo-file.png');


            // Upload Brand Logo
            // Assumes you have implemented the file upload component and it has a test ID "brand-logo-upload"
            // You can use `cy.get('input[test-id=brand-logo-upload]').attachFile('path/to/logo.jpg');`

            cy.get('.brand-logo').should('be.visible');
        });



        it('should show validation errors for required fields', () => {
            // Leave all required fields empty and submit the form
            cy.contains('button', 'Find Influencers').click();

            // Assert validation errors for required fields
            cy.get('mat-error').should('contain', 'Required Field');
        });

        it('should show validation errors for invalid budget amount', () => {
            // Fill out the campaign information with an invalid budget amount
            cy.get('[formControlName="campaignName"]').type('My Campaign');
            cy.get('[formControlName="brandName"]').type('Brand Name'); // Replace 'Brand Name' with the desired brand name
            cy.contains('.brand_list-options', 'Brand Name').click(); // Select the brand from the autocomplete dropdown
            cy.get('[formControlName="budget"]').type('-500'); // Enter an invalid negative budget amount
            // Invalid budget amount (non-numeric characters)
            cy.get('[formControlName="budget"]').type('Invalid Budget');
            cy.contains('.mat-error', 'Invalid amount').should('be.visible');

            // Submit the form
            cy.contains('button', 'Find Influencers').click();

            // Assert validation error for the invalid budget amount
            cy.get('mat-error').should('contain', 'Min amount 0');
        });



        // Submit the form
        cy.contains('button', 'Find Influencers').click();


    });

    it('should show validation errors for required fields', () => {
        // Leave all required fields empty and submit the form
        cy.contains('button', 'Find Influencers').click();

        // Assert validation errors for required fields
        cy.get('mat-error').should('contain', 'Required Field');
    });

    it('should show validation errors for invalid budget amount', () => {
        // Fill out the campaign information with an invalid budget amount
        cy.get('[formControlName="campaignName"]').type('My Campaign');
        cy.get('[formControlName="brandName"]').type('Brand Name'); // Replace 'Brand Name' with the desired brand name
        cy.contains('.brand_list-options', 'Brand Name').click(); // Select the brand from the autocomplete dropdown
        cy.get('[formControlName="budget"]').type('-500'); // Enter an invalid negative budget amount
        
        // Submit the form
        cy.contains('button', 'Find Influencers').click();

        // Assert validation error for the invalid budget amount
        cy.get('mat-error').should('contain', 'Min amount 0');
    });
    it('should add and remove deliverables', () => {
        // Fill out campaign information (excluding deliverables for this test)
        cy.get('[formControlName="campaignName"]').type('My Campaign');
        cy.get('[formControlName="brandName"]').type('Brand Name');
        cy.contains('.brand_list-options', 'Brand Name').click();
        cy.get('[formControlName="budget"]').type('1000');
        
        // Add deliverable 1
        cy.get('.add-deliverables-btn').click();
        cy.get('[formControlName="platforms"]').eq(0).select('youtube');
        cy.get('[formControlName="adType"]').eq(0).select('Ad Type 1');
        cy.get('[formControlName="qty"]').eq(0).select('2');

        // Add deliverable 2
        cy.get('.add-deliverables-btn').click();
        cy.get('[formControlName="platforms"]').eq(1).select('instagram');
        cy.get('[formControlName="adType"]').eq(1).select('Ad Type 2');
        cy.get('[formControlName="qty"]').eq(1).select('3');

        // Remove deliverable 2
        cy.get('.remove-deliverables-btn').eq(1).click();

        // Verify deliverable 1
        cy.get('[formControlName="platforms"]').eq(0).should('have.value', 'youtube');
        cy.get('[formControlName="adType"]').eq(0).should('have.value', 'Ad Type 1');
        cy.get('[formControlName="qty"]').eq(0).should('have.value', '2');

        // Verify only one deliverable exists
        cy.get('[formArrayName="deliverableArray"]').should('have.length', 1);

        // Submit the form
        cy.contains('button', 'Find Influencers').click();

        // Assert success message or navigate to the next step if applicable
        cy.contains('.campaign-success-message', 'Campaign created successfully').should('be.visible');
    });
    it('should handle deleting deliverables and adding a new deliverable', () => {
        // Add deliverables
        cy.get('[formControlName="platforms"]').select('youtube');
        cy.get('[formControlName="adType"]').select('Ad Type 1');
        cy.get('[formControlName="qty"]').select('5');
        cy.get('.add-deliverables-btn').click();

        // Delete the first deliverable
        cy.get('.remove-deliverable-btn').first().click();

        // Verify that only one deliverable is left
        cy.get('.deliverable-item').should('have.length', 1);

        // Add a new deliverable
        cy.get('[formControlName="platforms"]').eq(1).select('instagram');
        cy.get('[formControlName="adType"]').eq(1).select('Ad Type 2');
        cy.get('[formControlName="qty"]').eq(1).select('3');

        // Verify that two deliverables are displayed
        cy.get('.deliverable-item').should('have.length', 2);
    });


    it('should handle brand not found in the brand list', () => {
        // Fill out campaign information with a brand name that doesn't exist in the brand list
        cy.get('[formControlName="campaignName"]').type('My Campaign');
        cy.get('[formControlName="brandName"]').type('Non-Existent Brand Name');
        cy.get('[formControlName="budget"]').type('1000');
        
        // Submit the form
        cy.contains('button', 'Find Influencers').click();

        // Assert validation error for the non-existent brand name
        cy.get('mat-error').should('contain', '"Non-Existent Brand Name" not found in brand list');
    });

    it('should handle invalid campaign banner and brand logo file formats', () => {
        // Fill out campaign information without uploading images (banner and logo)
        cy.get('[formControlName="campaignName"]').type('My Campaign');
        cy.get('[formControlName="brandName"]').type('Brand Name');
        cy.contains('.brand_list-options', 'Brand Name').click();
        cy.get('[formControlName="budget"]').type('1000');
       
        // Submit the form without uploading images
        cy.contains('button', 'Find Influencers').click();

        // Assert validation error for missing campaign banner and brand logo images
        cy.get('mat-error').should('contain', 'Please upload the campaign banner');
        cy.get('mat-error').should('contain', 'Please upload the brand logo');

        // Optionally, you can handle scenarios with invalid file formats for banner and logo images
        // For example, try to upload a non-image file and assert validation error
    });

    // Add more test cases as needed to cover other scenarios and edge cases.
});

it('should navigate back to campaigns listing page when clicking "Go Back" button', () => {
    // Click "Go Back" button
    cy.contains('button', 'Go Back').click();

    // Verify that we are now on the campaigns listing page
    cy.url().should('include', '/campaigns');
});


it('should disable ad type selection if a platform is not chosen', () => {
    // Fill out campaign information without selecting a platform for deliverable
    cy.get('[formControlName="campaignName"]').type('My Campaign');
    cy.get('[formControlName="brandName"]').type('Brand Name');
    cy.contains('.brand_list-options', 'Brand Name').click();
    cy.get('[formControlName="budget"]').type('1000');
    
    // Add deliverable without selecting a platform
    cy.get('.add-deliverables-btn').click();

    // Verify that ad type selection is disabled
    cy.get('[formControlName="adType"]').should('be.disabled');
});

it('should disable the "Find Influencers" button if the form is invalid', () => {
    // Fill out campaign information with an invalid budget amount
    cy.get('[formControlName="campaignName"]').type('My Campaign');
    cy.get('[formControlName="brandName"]').type('Brand Name');
    cy.contains('.brand_list-options', 'Brand Name').click();
    cy.get('[formControlName="budget"]').type('-100'); // Invalid budget amount
    
    // Verify that the "Find Influencers" button is disabled
    cy.contains('button', 'Find Influencers').should('be.disabled');
});

it('should clear the brand name input field when clicking the clear icon', () => {
    // Fill out campaign information with a brand name
    cy.get('[formControlName="brandName"]').type('Brand Name');

    // Click the clear icon
    cy.get('.down-arrow').click();

    // Verify that the brand name input field is cleared
    cy.get('[formControlName="brandName"]').should('have.value', '');
});

it('should prevent submission if deliverables are not added', () => {
    // Fill out campaign information without adding any deliverables
    cy.get('[formControlName="campaignName"]').type('My Campaign');
    cy.get('[formControlName="brandName"]').type('Brand Name');
    cy.contains('.brand_list-options', 'Brand Name').click();
    cy.get('[formControlName="budget"]').type('1000');
    
    // Try to submit the form without adding deliverables
    cy.contains('button', 'Find Influencers').click();

    // Verify that the submission is not allowed and an error message is displayed
    cy.contains('mat-error', 'Please add at least one deliverable').should('be.visible');
});

it('should handle successful campaign creation and redirection to discover page', () => {
    // Fill out campaign information with valid data
    cy.get('[formControlName="campaignName"]').type('My Campaign');
    cy.get('[formControlName="brandName"]').type('Brand Name');
    cy.contains('.brand_list-options', 'Brand Name').click();
    cy.get('[formControlName="budget"]').type('1000');
    
    // Add deliverables
    cy.get('[formControlName="platforms"]').select('youtube');
    cy.get('[formControlName="adType"]').select('Ad Type 1');
    cy.get('[formControlName="qty"]').select('5');
    cy.get('.add-deliverables-btn').click();

    // Add another deliverable
    cy.get('[formControlName="platforms"]').eq(1).select('instagram');
    cy.get('[formControlName="adType"]').eq(1).select('Ad Type 2');
    cy.get('[formControlName="qty"]').eq(1).select('3');

    // Submit the form
    cy.contains('button', 'Find Influencers').click();

    // Verify that the campaign creation is successful
    cy.url().should('include', '/campaigns/create/');
    cy.contains('.campaign-name', 'My Campaign').should('be.visible');
    cy.contains('.brand-name', 'Brand Name').should('be.visible');
    cy.contains('.budget-amount', '1000').should('be.visible');
   
    // Verify that the deliverables are displayed correctly
    cy.get('.deliverable-item').should('have.length', 2);
    cy.contains('.deliverable-item', 'youtube - Ad Type 1 - Qty: 5').should('be.visible');
    cy.contains('.deliverable-item', 'instagram - Ad Type 2 - Qty: 3').should('be.visible');

    // Verify that the "Discover" button is displayed and clickable
    cy.contains('button', 'Discover').should('be.visible').click();

    // Verify that the page is redirected to the discover page of the created campaign
    cy.url().should('include', '/campaigns/create/');
    cy.url().should('include', '/discover');
});

it('should handle campaign creation with a campaign banner and brand logo', () => {
    // ... (similar to previous test cases)
    // Add campaign banner and brand logo using file upload functionality
    // ... (similar to previous test cases)

    // Verify that the campaign banner and brand logo are displayed correctly
    cy.get('.campaign-banner').should('have.attr', 'src', 'path/to/campaign-banner.png');
    cy.get('.brand-logo').should('have.attr', 'src', 'path/to/brand-logo.png');

    // Submit the form
    cy.contains('button', 'Find Influencers').click();

    // Verify that the campaign creation is successful with campaign banner and brand logo
    cy.url().should('include', '/campaigns/create/');
    cy.contains('.campaign-banner').should('be.visible');
    cy.contains('.brand-logo').should('be.visible');
});

it('should handle unsuccessful campaign creation with missing required fields', () => {
    // Submit the form without filling out any fields
    cy.contains('button', 'Find Influencers').click();

    // Verify that error messages for required fields are displayed
    cy.contains('mat-error', 'Required Field').should('be.visible');
});


it('should handle unsuccessful campaign creation with invalid budget amount', () => {
    // Fill out campaign information with invalid budget amount
    cy.get('[formControlName="budget"]').type('-100');

    // Submit the form
    cy.contains('button', 'Find Influencers').click();

    // Verify that error message for invalid budget amount is displayed
    cy.contains('mat-error', 'Min amount 0').should('be.visible');
});

it('should handle unsuccessful campaign creation with non-existent brand name', () => {
    // Fill out campaign information with a brand name that does not exist in the brand list
    cy.get('[formControlName="brandName"]').type('Non Existent Brand');

    // Submit the form
    cy.contains('button', 'Find Influencers').click();

    // Verify that error message for non-existent brand name is displayed
    cy.contains('mat-error', 'Non Existent Brand not found in brand list').should('be.visible');
});














