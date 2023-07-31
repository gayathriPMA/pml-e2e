// Test Scenario: Sign-in UI
describe("Sign-in UI", () => {
    it("should display the sign-in page", () => {
        // Test steps to verify that the sign-in page is displayed
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })

    });

    it("should have input fields for username and password", () => {
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })

        // Test steps to verify that the username and password input fields are present
        cy.get('.logo > img')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
        cy.get('h4').should('have.text', 'SIGN IN AS - ADMIN')
        cy.get('.google-btn')
            .should('be.visible')
            .should('have.prop', 'tagName', 'BUTTON')
            .should('have.css', 'background-color', 'rgb(255, 255, 255)')
            .should('have.text', ' Continue with Google ')
            .should('have.css', 'font-size', '14px')
            .should('have.css', 'font-family', 'Figtree, sans-serif')
            .should('have.css', 'font-weight', '500')
            .focus()
            .should('be.focused')
            .scrollIntoView()
            .should('be.visible')
            .click()

    });

    it("should have a submit button", () => {
        // Test steps to verify that the submit button is present
    });
});

// Test Scenario: Sign-in
describe("Sign-in", () => {
    it("should log in with valid credentials", () => {
        // Test steps to log in with valid credentials and verify successful login

        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.get('#captchaimg').should('be.visible');

            // Pause the test execution to allow manual intervention
            cy.pause();

            // Manually solve the CAPTCHA challenge in the browser

            // After solving the CAPTCHA, continue the test by interacting with other elements on the page

            // Add more test steps here if needed
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)
        })
    })


    it("should display an error message for invalid credentials", () => {
        // Test steps to log in with invalid credentials and verify error message

        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@gmail.com')
            cy.wait(20000)
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()

        });
    });
})

// Test Scenario: Home Page
describe("Home Page", () => {
    before(() => {
        // Log in before proceeding with home page tests
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.get('#captchaimg').should('be.visible');

            // Pause the test execution to allow manual intervention
            cy.pause();

            // Manually solve the CAPTCHA challenge in the browser

            // After solving the CAPTCHA, continue the test by interacting with other elements on the page

            // Add more test steps here if needed
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
        })
    });

    it("should display the home page after successful login", () => {
        // Test steps to verify that the home page is displayed after successful login
        cy.url().should('include', '/campaigns');
        cy.title().should('eq', 'Campaigns | PickMyAd')
        cy.get('.logo-side > img')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });


    });
});

// Test Scenario: Side Nav
describe("Side Nav", () => {
    before(() => {
        // Log in before proceeding with home page tests
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.get('#captchaimg').should('be.visible');

            // Pause the test execution to allow manual intervention
            cy.pause();

            // Manually solve the CAPTCHA challenge in the browser

            // After solving the CAPTCHA, continue the test by interacting with other elements on the page

            // Add more test steps here if needed
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
        })
    });

    it("should display the side navigation", () => {
        // Test steps to verify that the side navigation is displayed
        cy.get('.platform-top').should('be.visible')
        cy.get('.mat-drawer-inner-container').should('be.visible');
        cy.get('.mat-drawer-inner-container').contains('Settings').click();
        cy.url().should('include', '/settings');
        cy.get('.brand-logo > :nth-child(1) > .kyc-title').should('be.visible');
        cy.get('.mat-drawer-inner-container').contains('Dashboard').click();
        cy.url().should('include', '/dashboard');
        cy.get('.mat-drawer-inner-container').contains('Campaigns').click();
        cy.url().should('include', '/campaigns');
        cy.get('.platform-top')
            .find(':nth-child(1)')
            .filter(':contains("Dashboard"), :contains("Campaigns"), :contains("Settings")')
            .should('be.visible');
        cy.get('.platform-logout')
        cy.get('body')
            .should('have.css', 'font-family')
            .and('contain', 'Figtree, sans-serif');

    });

    it("should navigate to different pages from the side nav", () => {
        // Test steps to verify navigation to different pages from the side nav
        cy.get('.platform-top').should('be.visible')
        cy.get('.mat-drawer-inner-container').should('be.visible');
        cy.get('.mat-drawer-inner-container').contains('Settings').click();
        cy.url().should('include', '/settings/container');
        cy.get('.brand-logo > :nth-child(1) > .kyc-title').should('be.visible');
        cy.get('.mat-drawer-inner-container').contains('Dashboard').click();
        cy.url().should('include', '/dashboard');
        cy.get('.mat-drawer-inner-container').contains('Campaigns').click();
        cy.url().should('include', '/campaigns');
        cy.get('.platform-top')
            .find(':nth-child(1)')
            .filter(':contains("Dashboard"), :contains("Campaigns"), :contains("Settings")')
            .should('be.visible');
        cy.get('.platform-logout')
        cy.get('body')
            .should('have.css', 'font-family')
            .and('contain', 'Figtree, sans-serif');

    });
});

// Test Scenario: Table
describe("Table", () => {
    before(() => {
        // Log in before proceeding with table tests
        // Navigate to the page with the table
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.get('#captchaimg').should('be.visible');

            // Pause the test execution to allow manual intervention
            cy.pause();

            // Manually solve the CAPTCHA challenge in the browser

            // After solving the CAPTCHA, continue the test by interacting with other elements on the page

            // Add more test steps here if needed
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()

            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.url().should('include', '/campaigns');
        })

    });

    it("should display the table", () => {
        // Test steps to verify that the table is displayed
        cy.get('.kyc-title').should('be.visible').should('contain.text', 'Campaigns')
        cy.get('.search-layout').should('exist')
        cy.get('h4').should('have.text', 'Campaign Status:')
        cy.get('.mat-paginator-range-label').should('exist')
        //Check Campaign table
        cy.get('.table-layout').should('exist');

        //should check if specific header names are present in the table
        //  Visit the page with the table
        //cy.visit('https://dev-app.pickmyad.com/brand/campaigns');
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



        });
    })

    it("should interact with table rows and columns", () => {
        // Test steps to interact with table rows and columns (e.g., click, hover)
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

        //Checkbox selection
        cy.get('.table-layout').contains('Pickmyad').parent('tr').click();
        cy.get('.table-layout').contains('Pickmyad').parent('tr').should('have.class', 'selected');

        //Column assertion
        cy.get('.table-layout').find('.email').each((emailColumn) => {
            cy.wrap(emailColumn).invoke('text').should('match', /^\S+@\S+\.\S+$/);
        });



    });

    it("should support table sorting", () => {
        // Test steps to verify table sorting functionality
    });

    it("should support table filtering", () => {
        // Test steps to verify table filtering functionality
        cy.get('.mat-select-trigger').click()
        cy.get('#mat-option-5 > .mat-option-text').click();
        cy.get('.cdk-column-brand_name > .mat-sort-header-container > .mat-sort-header-arrow > .mat-sort-header-indicator > .mat-sort-header-pointer-right').click();
        cy.get('.table-layout').find('tr').first().contains('Camp').should('be.visible');
        cy.get('.table-layout').find('tr').should('have.length', 51);

    });

    it("should support table pagination", () => {
        // Test steps to verify table pagination functionality
        //should test pagination
        cy.get('.mat-paginator-navigation-previous > .mat-button-wrapper').click();
        cy.get('.table-layout').find('tr').should('have.length', 51);
        cy.get('.mat-paginator-navigation-next > .mat-button-wrapper').click();
        cy.get('.table-layout').find('tr').should('have.length', 51);


        const totalItems = 304;
        const itemsPerPage = 50;

        cy.visit('https://dev-app.pickmyad.com/brand/campaigns');

        //Get the pagination range text
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

    });

    it("should edit table entries", () => {
        // Test steps to edit table entries and verify changes
        cy.get('.edit-page').should('be.visible');

    });

    it("should delete table entries", () => {
        // Test steps to delete table entries and verify removal
        cy.get('.table-layout').contains('Camp').parent('tr').within(() => {
            //     cy.get('.delete-button').click();
            // });

            // cy.get('.confirm-dialog').should('be.visible');
            // cy.get('.confirm-dialog').contains('Yes').click();

            // cy.url().should('include', '/campaigns');
            // cy.get('.crm-table').contains('Camp').should('not.exist');

        });
    })

    it("should copy table entries", () => {
        // Test steps to copy table entries and verify duplication
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

    });
});

// Test Scenario: Search
describe("Search", () => {
    before(() => {
        // Log in before proceeding with search tests
        // Navigate to the page where search is available
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.get('#captchaimg').should('be.visible');

            // Pause the test execution to allow manual intervention
            cy.pause();

            // Manually solve the CAPTCHA challenge in the browser

            // After solving the CAPTCHA, continue the test by interacting with other elements on the page

            // Add more test steps here if needed
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()

            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.url().should('include', '/campaigns');

        });

        it("should perform a search", () => {
            // Test steps to perform a search and verify search results
            cy.get('#mat-input-1').type('Camp').should('have.value', 'Camp');
            cy.get('#mat-input-1').type('Camp').type('{enter}')
            cy.get('.table-layout').contains('Camp').should('have.length', 1)
            cy.get('.table-layout').find('tr').first().contains('Camp').should('be.visible');

        });

        it("should clear the search results", () => {
            // Test steps to clear the search and verify the results are reset
            cy.get('#mat-input-1').clear()

        });
    });
})
// Test Scenario: Filter
describe("Filter", () => {
    before(() => {
        // Log in before proceeding with filter tests
        // Navigate to the page where filtering is available
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.get('#captchaimg').should('be.visible');

            // Pause the test execution to allow manual intervention
            cy.pause();

            // Manually solve the CAPTCHA challenge in the browser

            // After solving the CAPTCHA, continue the test by interacting with other elements on the page

            // Add more test steps here if needed
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()

            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.url().should('include', '/campaigns');

        });

        it("should apply filters", () => {
            // Test steps to apply filters and verify filtered results
            cy.get('.mat-select-trigger').click()
            cy.get('#mat-option-5 > .mat-option-text').click();
            cy.get('.cdk-column-brand_name > .mat-sort-header-container > .mat-sort-header-arrow > .mat-sort-header-indicator > .mat-sort-header-pointer-right').click();
            cy.get('.table-layout').find('tr').first().contains('Camp').should('be.visible');
            cy.get('.table-layout').find('tr').should('have.length', 51);

        });

        it("should clear filters", () => {
            // Test steps to clear filters and verify the results are reset
        });
    });
})

// Test Scenario: Logout
describe("Logout", () => {
    before(() => {
        // Log in before proceeding with logout tests
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.get('#captchaimg').should('be.visible');

            // Pause the test execution to allow manual intervention
            cy.pause();

            // Manually solve the CAPTCHA challenge in the browser

            // After solving the CAPTCHA, continue the test by interacting with other elements on the page

            // Add more test steps here if needed
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()

            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.url().should('include', '/campaigns');

        });

        it("should log out successfully", () => {
            // Test steps to log out and verify the user is redirected to the sign-in page
            cy.get('.profile-dropdown').click();
            cy.contains('Logout').click();
            cy.url().should('include', '/login');

        });
    });
})


// Test Scenario: Create Campaign
describe("Create Campaign", () => {
    before(() => {
        // Log in before proceeding with campaign creation
        // Navigate to the page where you can create a campaign
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.get('#captchaimg').should('be.visible');

            // Pause the test execution to allow manual intervention
            cy.pause();

            // Manually solve the CAPTCHA challenge in the browser

            // After solving the CAPTCHA, continue the test by interacting with other elements on the page

            // Add more test steps here if needed
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()

            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.url().should('include', '/campaigns');

        });

    });

    it("should navigate to the campaign creation page", () => {
        // Test steps to verify that the campaign creation page is displayed
        cy.get('.create-campaign').click()

    });

    it("should fill out the campaign details", () => {
        // Test steps to fill out the campaign creation form with required details
        // For example:
        // cy.get("#campaignName").type("My New Campaign");
        // cy.get("#startDate").type("2023-07-20");
        // cy.get("#endDate").type("2023-07-25");
        // cy.get("#description").type("This is a test campaign.");
        // cy.get("#createButton").click();
        cy.get('#mat-input-1').type('Camp4auto')
        cy.get('#mat-input-2').click();
        cy.get('#mat-input-2').type('cherath');
        cy.get('#mat-autocomplete-0')
            .contains('cherath')
            .click();
        cy.get('#mat-select-2').click()
        cy.get('#mat-option-45').click()
        //cy.get('#mat-select-2');
        cy.get('#mat-select-4').click()
        cy.get('#mat-option-60').click();
        cy.get('#mat-select-6').click()
        cy.get('#mat-option-50').click();
        cy.get('#first-name-input').clear().type('Jane');
        cy.get('#last-name-input').clear().type('Doe');
        cy.get('#save-button').click();
        cy.url().should('include', '/crm/table');
        cy.get('.crm-table').contains('Jane Doe').should('be.visible');

    });

    it("should submit the campaign creation form", () => {
        // Test steps to submit the campaign creation form and verify success
        cy.get('.find-btn').click()

    });

    it("should display the created campaign in the campaign list", () => {
        // Test steps to verify that the created campaign is displayed in the campaign list
        // For example, you can assert that the campaign name is visible in the list:
        // cy.contains("My New Campaign").should("be.visible");
        cy.get('.kyc-title > div').should('contain.text', 'Select Influencers  for "Camp1auto"')
        cy.get('.influencer-name').should('contain.text', 'Camp1auto')
        cy.get('.reusable-table').should('exist')
        cy.get('.reusable-table')
            .find('th')
            .should('have.length', 5)
        cy.get('.reusable-table')
            .find('tr')
            .should('have.length', 78);
        cy.get('.reusable-table')
            .find('tr')
            .eq(1)
            .find('td')
            .eq(3)
            .invoke('text')
            .should('eq', ' 83 ');
        cy.get('.reusable-table').find('tbody').find('tr').eq(5).find('td').eq(4).find('[data-mat-icon-name="add-icon"]').click()
        cy.get('.find-btn').click()
        cy.wait(2000)
        cy.url().should('include', '/campaigns')



    });
});

// Test Scenario: View Campaign
describe("View Campaign", () => {
    before(() => {
        // Log in before proceeding with viewing campaigns
        // Navigate to the page where you can view campaigns
        cy.visit('https://dev-app.pickmyad.com/auth/admin/login', { failOnStatusCode: false })
        cy.get('.google-btn').click()
        cy.origin("https://accounts.google.com/o/oauth2/v2/auth/", () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            })
            //login
            cy.get('#identifierId').type('gayathri@pickmyad.com')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.get('#captchaimg').should('be.visible');

            // Pause the test execution to allow manual intervention
            cy.pause();

            // Manually solve the CAPTCHA challenge in the browser

            // After solving the CAPTCHA, continue the test by interacting with other elements on the page

            // Add more test steps here if needed
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()

            cy.wait(20000)
            cy.get('body').type('Sajith!0708')
            cy.get('.VfPpkd-vQzf8d').contains('Next').click()
            cy.url().should('include', '/campaigns');

        });

    });

    it("should display a list of campaigns", () => {
        // Test steps to verify that the list of campaigns is displayed
        cy.url().should('include', '/campaigns');
        cy.get('.campagin-container').should('exist')
        cy.get('.campaign-details').should('be.visible')
        cy.get('.mat-tab-list').should('be.visible')
        cy.get('#mat-expansion-panel-header-0').should('be.visible')
        cy.get('.cdk-column-channelName > .useflex').should('exist')
        cy.get('.mat-row > .cdk-column-city').should('exist')
        cy.get('.mat-row > .cdk-column-language').should('exist')
        cy.get('.mat-row > .cdk-column-categories').should('exist')
        cy.get('.mat-row > .cdk-column-recBy').should('exist')
        cy.get('.mat-row > .cdk-column-action').should('exist')
        cy.get('.send-btn').click()
        cy.get('.db-notifi').should('exist')

    });

    it("should navigate to the details page of a campaign", () => {
        // Test steps to navigate to the details page of a campaign (e.g., click on a campaign)
    });

    it("should display the details of the selected campaign", () => {
        // Test steps to verify that the details of the selected campaign are displayed
    });

    it("should allow going back to the campaign list from the details page", () => {
        // Test steps to navigate back to the campaign list from the details page
    });
});









