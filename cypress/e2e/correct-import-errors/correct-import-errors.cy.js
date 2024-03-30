/// <reference types="Cypress" />
import moment from "moment";
import receiptsResponse from "../receipts/receipts.constants";
import correctImpoortErrorsMocKData from "./correct-import-errors-mock-data";

describe('testing correct import errors page', () => {

    beforeEach(() => {
        // log into Azure Active Directory through our sample SPA using our custom command
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/GetLocations/*', receiptsResponse.locationsData).as('locationsData');
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getFuelDay/*', receiptsResponse.fuelDayResponse).as('getFuelDay');
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrorsCount*', receiptsResponse.correctImportsResp).as('getImportErrorsCount');

        cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
        cy.wait('@locationsData');
        cy.visit('')
    });

    it('should test table when no records found', () => {

        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrors?*', correctImpoortErrorsMocKData.tableDataWithNoRecords)
            .as('correctImportErrorsApiCall');

        cy.visit('/importerrors');

        cy.get('#no-records-found-message')
            .should('exist')
            .should('have.text', 'No Records Found.');

    })

    it('should test table data', () => {

        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrors?*', correctImpoortErrorsMocKData.tableData)
            .as('correctImportErrorsApiCall');

        cy.visit('/importerrors')
        cy.wait('@correctImportErrorsApiCall').then(({ response }) => {

            cy.get('h5')
                .should('have.text', `Correct Import Errors (${response.body.content.items.length})`);

        })
    });

    it('should check if all table headers are available', () => {

        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrors?*', correctImpoortErrorsMocKData.tableData)
            .as('correctImportErrorsApiCall');

        cy.visit('/importerrors');

        cy.wait('@correctImportErrorsApiCall').then(({ response }) => {
            cy.get('table')
            .find('tr th').each(($header, index) => {
                const columnName = $header.text();
                expect(columnName).to.equal(correctImpoortErrorsMocKData.tableHeaders[index]);
            })
        })
    });

    it('should test data in table', () => {
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrors?*', correctImpoortErrorsMocKData.tableData)
            .as('correctImportErrorsApiCall');

        cy.visit('/importerrors');
        cy.wait('@correctImportErrorsApiCall').then(({ response }) => {
            cy.get('table').find('tbody tr').should('have.length', response.body.content.items.length);

            cy.get('table').find('tbody tr').each((tableData, index) => {

                cy.get(tableData)
                    .find('.mat-column-actions')
                    .find('.fa-pen-to-square')
                    .should('exist')

                cy.get(tableData)
                    .find('.mat-column-actions')
                    .find('.fa-trash')
                    .should('exist')

                cy.get(tableData)
                    .find('.mat-column-locationId')
                    .should('have.text', response.body.content.items[index].locationId);

                cy.get(tableData)
                    .find('.mat-column-fuelEventId')
                    .should('have.text', response.body.content.items[index].fuelEventId)

                cy.get(tableData)
                .find('.mat-column-createDate')
                .should('have.text', moment(response.body.content.items[index].createDate).format('MM/DD/yyyy'))

                cy.get(tableData)
                    .find('.mat-column-flightNumber')
                    .should('have.text', response.body.content.items[index].flightNumber)

                cy.get(tableData)
                    .find('.mat-column-customerId')
                    .should('have.text', response.body.content.items[index].customerId)

                cy.get(tableData)
                    .find('.mat-column-sourceReference')
                    .should('have.text', response.body.content.items[index].sourceReference)

                cy.get(tableData)
                    .find('.mat-column-transactionType')
                    .should('have.text', response.body.content.items[index].transactionType)

            })
        })

    })

})