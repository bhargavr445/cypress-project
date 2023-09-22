import receiptsResponse from "../../receipts/receipts.constants";
import responses from "./owner-fuel-type";

describe('test owner fuel type screen in admin section', () => {

    beforeEach(() => {
        // log into Azure Active Directory through our sample SPA using our custom command
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/GetLocations/*', receiptsResponse.locationsData).as('locationsData');
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getFuelDay/*', receiptsResponse.fuelDayResponse).as('getFuelDay');
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrorsCount*', receiptsResponse.correctImportsResp).as('getImportErrorsCount');

        cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'));
        cy.wait('@locationsData');
        cy.visit('http://localhost:4200');
    });

    it('should test table headers', () => {
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getallownerfueltypedetails*', responses.gridResponse).as('rosterApiCall');
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/fuelTypes*', responses.fuelTypeDropDowns).as('fuelTypesDropDownApi')
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getallowners/*', responses.ownerDropdownsList).as('allOwnersDropDownApi')

        cy.visit('http://localhost:4200/admin/ownerfueltype');
        // cy.wait()
        cy.wait('@rosterApiCall').then(() => {
            // cy.log(JSON.stringify(response.body.content.output));
        });
    });

    it('should test owner drop down', () => {
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getallownerfueltypedetails*', responses.gridResponse).as('rosterApiCall');
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/fuelTypes/*', responses.fuelTypeDropDowns).as('fuelTypesDropDownApi')
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getallowners/*', responses.ownerDropdownsList).as('allOwnersDropDownApi');
        cy.visit('http://localhost:4200/admin/ownerfueltype');
        cy.wait('@allOwnersDropDownApi').then(({ response }) => {

            cy.get('owner-fuel-type-form')
                .find('label[for="owner"]')
                .should('have.text', 'Owner');

            cy.get('owner-fuel-type-form')
                .find('#owner')
                .should('exist')

            cy.get('owner-fuel-type-form #owner .mat-select-arrow-wrapper')
                .should('be.visible')
                .click({ force: true })

            cy.get('.mat-select-panel')
                .find('mat-option')
                .each((el, index) => {
                    if (index > 0) {
                        const number = response.body.content.items[index - 1]?.companyNumber;
                        const name = response.body.content.items[index - 1]?.companyName;
                        cy.get(el).contains(`${number} - ${name}`)
                    } else {
                        cy.get(el).contains('Select...');
                    }
                });

            cy.get('.mat-select-panel')
                .find('mat-option')
                .each((el, index) => {
                    if (index === 2) {
                        cy.get(el).click({ force: true })
                    }
                });
        });
    });
});