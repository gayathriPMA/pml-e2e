///  <reference types = "Cypress"/>
describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)
        })
        

    });

    it('Should successfully login using mail id', () => {

        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)

        })
        cy.url().should('include', '/campaigns');
        cy.title().should('eq', 'Campaigns | PickMyAd')
        cy.get('.logo-side > img')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
        cy.wait(2000)
        cy.get('.kyc-title').should('be.visible').should('contain.text', 'Campaigns')
        cy.get('.search-layout').should('exist')
        cy.get('h4').should('have.text', 'Campaign Status:')
        cy.get('.mat-paginator-range-label').should('exist')

        const totalItems = 304;
        const itemsPerPage = 50;


        // Get the pagination range text
        cy.get('.mat-paginator-range-label').invoke('text').then(rangeText => {
            // Extract the start and end values from the range text
            const rangeValues = rangeText.split(' ')[0].split(' – ');
            const start = parseInt(rangeValues[0]);
            const end = parseInt(rangeValues[1]);

            // Assert the start and end values are correct
            expect(start).to.equal(Number(1));
            expect(end).to.equal(itemsPerPage);

            // Click the next page button
            cy.get('.mat-paginator-navigation-next').click();

            // Get the updated pagination range text
            cy.get('.mat-paginator-range-label').invoke('text').then(updatedRangeText => {
                // Extract the start and end values from the updated range text
                const updatedRangeValues = updatedRangeText.split(' ')[0].split(' – ');
                const updatedStart = parseInt(updatedRangeValues[0]);
                const updatedEnd = parseInt(updatedRangeValues[1]);

                // Assert the updated start and end values are correct
                expect(updatedStart).to.equal(itemsPerPage + 1);
                expect(updatedEnd).to.equal(itemsPerPage * 2);
            });
        });
        //Check Campaign table
        cy.get('.table-layout').should('exist');
        cy.get('.table-layout')
            .find('th')
            .should('have.length', 8)
        cy.get('.table-layout')
            .find('tr')
            .should('have.length', 51);
        cy.get('.table-layout')
            .find('tr')
            .eq(0)
            .find('th')
            .eq(3)
            .invoke('text')
            .should('eq', 'Payment Status');

        // should check if specific header names are present in the table
        //    Visit the page with the table
        cy.visit('https://dev-app.pickmyad.com/brand/campaigns');
        const expectedHeaderNames = [
            'Brand',
            'Campaign Name',
            'Campaign Status',
            'Payment Status',
            'Budget',
            'Last Modified',
            'Status',
            'Action'
        ];

        // Get all table header cells
        cy.get('table thead tr th').each(($headerCell) => {
            const headerFieldName = $headerCell.text().trim();

            // Check if the header field name is present in the expected header names array
            expect(expectedHeaderNames.includes(headerFieldName)).to.be.true;
        });


        cy.get('.table-layout').contains(' CS brand 1 ').should('be.visible');
        cy.get('.table-layout').contains(' CS brand 1 ').parent('td').within(() => {
            cy.get('.mat-header-row > .cdk-column-action').should('have.attr', 'data-mat-icon-name').click();
            cy.url().should('include', '/crm/edit');

            cy.get('.edit-page').should('be.visible');

        })
        // Example search action and assertion
        cy.get('#mat-input-1').type('Camp').should('have.value', 'Camp');
        cy.get('#mat-input-1').type('Camp').type('{enter}')
        cy.get('.table-layout').contains('Camp').should('have.length', 1)
        cy.get('.table-layout').find('tr').first().contains('Camp').should('be.visible');
        cy.get('#mat-input-1').clear()


        //Example filter action
        cy.get('.mat-select-trigger').click()
        cy.get('#mat-option-5 > .mat-option-text').click();
        cy.get('.cdk-column-brand_name > .mat-sort-header-container > .mat-sort-header-arrow > .mat-sort-header-indicator > .mat-sort-header-pointer-right').click();
        cy.get('.table-layout').find('tr').first().contains('Camp').should('be.visible');
        cy.get('.table-layout').find('tr').should('have.length', 51);

        //Example pagination assertions
        cy.get('.mat-paginator-navigation-previous > .mat-button-wrapper').click();
        cy.get('.table-layout').find('tr').should('have.length', 51);
        cy.get('.mat-paginator-navigation-next > .mat-button-wrapper').click();
        cy.get('.table-layout').find('tr').should('have.length', 51);


   // Example copy icon hover and click

        
       // Hover over the ID field of a specific table row
        cy.get('table tbody tr').eq(0).find('.update-by-id').trigger('mouseover');
      
        //Assert that the copy icon is enabled
        cy.get('.copy-icon').should('be.visible');

        // Click on the copy icon
        cy.get('.copy-icon').click();

        // Assert that the ID has been copied to the clipboard
        cy.window().then((win) => {
            const copiedId = win.navigator.clipboard.readText();
            expect(copiedId).to.equal('PMA202307151314');

        });

        // Example deletion action
        cy.get('.table-layout').contains('Camp').parent('tr').within(() => {
            cy.get('.delete-button').click();
        });

        cy.get('.confirm-dialog').should('be.visible');
        cy.get('.confirm-dialog').contains('Yes').click();

        cy.url().should('include', '/campaigns');
        cy.get('.crm-table').contains('Camp').should('not.exist');

        // Each field validation in table
        cy.get('.table-layout').contains('Pickmyad').parent('tr').within(() => {
            cy.get('.email').should('have.attr', 'href').and('include', '@');
            cy.get('.status').should('have.class', 'active');
            cy.get('.actions').find('.edit-button').should('be.visible');
            cy.get('.actions').find('.delete-button').should('be.visible');
        });

        cy.get('.table-layout').contains('New York').parent('tr').within(() => {
            cy.get('.address').invoke('text').should('contain', 'New York');
            cy.get('.phone').invoke('text').should('match', /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/);
        })
        cy.get('.table-layout').find('tr').each((row) => {
            cy.wrap(row).find('.name').should('not.be.empty');
            //cy.wrap(row).find('.age').invoke('text').should('match', /^\d+$/);
            //cy.wrap(row).find('tr.mat-header-row').should('have.class', 'cdk-column-action');
        });

        cy.get('.table-layout').contains('Pickmyad')
        //.parent('tr').within(() => {
        cy.get('.status').invoke('text').then((text) => {
            expect(text.trim()).to.equal('Active');
            //     })
        })

        // Checkbox selection
        cy.get('.table-layout').contains('Pickmyad').parent('tr').click();
        cy.get('.table-layout').contains('Pickmyad').parent('tr').should('have.class', 'selected');

        // Column assertion
        cy.get('.table-layout').find('.email').each((emailColumn) => {
            cy.wrap(emailColumn).invoke('text').should('match', /^\S+@\S+\.\S+$/);
        });


        // logout admin

        cy.get('.profile-dropdown').click();
        cy.contains('Logout').click();
        cy.url().should('include', '/login');


    })
})
