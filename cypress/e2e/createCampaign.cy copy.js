describe("Create campaign", () => {
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
    })

    it('Should successfully login using mail id', () => {

        //Create campaign
        cy.get('.create-campaign').click()
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
        // cy.get('#first-name-input').clear().type('Jane');
        // cy.get('#last-name-input').clear().type('Doe');
        // // cy.get('#save-button').click();
        // cy.url().should('include', '/crm/table');
        // cy.get('.crm-table').contains('Jane Doe').should('be.visible');

        cy.get('.find-btn').click()
        //cy.get('.kyc-title > div').should('contain.text', 'Select Influencers  for "Camp1auto"')
        //cy.get('.influencer-name').should('contain.text', 'Camp1auto')
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

    })
    it("Should test side nav UI", () => {


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
            .and('contain', 'Figtree, sans-serif')
    })
})


