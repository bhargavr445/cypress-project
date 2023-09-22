/// <reference types="Cypress" />
import receiptsResponse from "../../receipts/receipts.constants";
import specialtagsMockData from "./special-tag";

describe('test special tag screen in admin section', () => {

    beforeEach(() => {
        // log into Azure Active Directory through our sample SPA using our custom command
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/GetLocations/*', receiptsResponse.locationsData).as('locationsData');
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getFuelDay/*', receiptsResponse.fuelDayResponse).as('getFuelDay');
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrorsCount*', receiptsResponse.correctImportsResp).as('getImportErrorsCount');

        cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
        cy.wait('@locationsData');
        cy.visit('http://localhost:4200')
    });

    it('should test landing page with data in table', () => {
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getspecialtagsall/*', specialtagsMockData.gridResponse).as('specialTagTableResponse');
        cy.visit('http://localhost:4200/admin/specialtag');
        cy.wait('@specialTagTableResponse').then(({ request, response }) => {

            cy.get('#special_tag_add')
                .find('h5')
                .should('have.text', 'Special Tag');

            cy.get('#special_tag_gird')
                .find('h5')
                .should('have.text', 'Special Tags');

            cy.get('#special_tag_add')
                .find('#tagNameId').type('FRL');

            cy.get('#special_tag_add')
                .find('#descriptionId')
                .type('Florida Flight');

            cy.get('#special_tag_add')
                .find('#active')
                .uncheck();


            cy.get('#special_tag_add')
                .find('label[for="tagName"]')
                .should('have.text', 'Tag Name *');

            cy.get('#special_tag_add')
                .find('label[for="description"]')
                .should('have.text', 'Tag Description *');

            cy.get('#special_tag_add')
                .find('label[for="active"]')
                .should('have.text', 'Active');

            cy.get('#special_tag_add')
                .find('#tagNameId')
                .should('exist')
                .invoke('attr', 'placeholder')
                .should('eq', 'Type here...');

            // cy.get('#special_tag_add')
            //     .find('#descriptionId')
            //     .should('exist')
            //     .invoke('attr', 'placeholder')
            //     .should('eq', 'Type here...');

                cy.checkForPlaceholderCmd('special_tag_add', 'descriptionId', 'Type here...');

            cy.get('#special_tag_add')
                .find('#active')
                .should('exist');

            cy.get('.special-tag-table')
                .find('table')
                .find('tr th').each(($header, index) => {
                    const columnName = $header.text();
                    expect(columnName).to.equal(specialtagsMockData.tableHeaders[index]);
                })

        })
    })

    /* test table when no records avialable to display */
    it('should test landing page without records in table', () => {
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getspecialtagsall/*', specialtagsMockData.gridResponseWithNoRecords).as('specialTagTableResponse');
        cy.visit('http://localhost:4200/admin/specialtag');
        cy.wait('@specialTagTableResponse').then(({ request, response }) => {

            cy.get('#no-records-found-message')
                .should('exist')
                .should('have.text', 'No Records Found.')

        })
    });

    it('should test add success and then check if newly added record exist in the table', () => {

        const addTagPayload = {
            "id": 0,
            "locationId": "AMA082",
            "tagName": "TRE",
            "description": "Texas Flight Enlight",
            "active": true,
            "createDate": null,
            "updateDate": null
        }

        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getspecialtagsall/*', specialtagsMockData.gridResponse).as('specialTagTableResponse');
        // cy.intercept('POST', 'https://app-d-l-fimapi.azurewebsites.net/v1/insertspecialtag?*', (req) => {
        //     req.body = addTagPayload
        // }).as('addNewTagApiCall')
        //specialtagsMockData.addNewTagResponse).as('addNewTagApiCall');

        cy.intercept('POST', 'https://app-d-l-fimapi.azurewebsites.net/v1/insertspecialtag?*', {
            statusCode: 200,
            body: specialtagsMockData.addNewTagResponse
        }).as('addNewTagApiCall');


        cy.visit('http://localhost:4200/admin/specialtag');

        cy.get('#special_tag_add')
            .find('#tagNameId')
            .type(specialtagsMockData.dataToAdd.tagName);

        cy.get('#special_tag_add')
            .find('#descriptionId')
            .type(specialtagsMockData.dataToAdd.description);

        cy.get('#special_tag_add')
            .find('#active')
            .check();

        cy.get('#special_tag_add')
            .find('.btn-common')
            .click();

        cy.wait('@addNewTagApiCall').then(({ request, response }) => {
            cy.get('.alert-dismissible')
                .should('exist')
                .should('have.text', "Special Tag Saved.");

            cy.get('#special_tag_add')
                .find('#tagNameId')
                .should('have.value', '');

            cy.get('#special_tag_add')
                .find('#descriptionId')
                .should('have.value', '');

            cy.get('#special_tag_add')
                .find('#active')
                .should('be.checked');


        });

        cy.wait('@specialTagTableResponse').then(({ request, response }) => {
            cy.get('#special_tag_gird')
                .find('.special-tag-table')
                .find('tbody tr').each((tableData, index) => {
                    cy.log(tableData)
                    cy.get(tableData).find('.mat-column-tagName').should('have.text', response.body.content.items[index].tagName);
                    cy.get(tableData).find('.mat-column-description').should('have.text', response.body.content.items[index].description);
                    cy.get(tableData).find('.mat-column-active').should('have.text', response.body.content.items[index].active ? 'Active' : 'Inactive')
                })
        })

    });

    it('should test add form in error scenario', () => {
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getspecialtagsall/*', specialtagsMockData.gridResponse).as('specialTagTableResponse');
        cy.visit('http://localhost:4200/admin/specialtag');

        cy.intercept('POST', 'https://app-d-l-fimapi.azurewebsites.net/v1/insertspecialtag?*', {
            statusCode: 500,
            body: specialtagsMockData.addNewTagErrorResponse
        }).as('addNewTagErrorApiCall');

        /* entering data in fields */
        cy.get('#special_tag_add')
            .find('#tagNameId')
            .type(specialtagsMockData.dataToAdd.tagName);

        cy.get('#special_tag_add')
            .find('#descriptionId')
            .type(specialtagsMockData.dataToAdd.description);

        cy.get('#special_tag_add')
            .find('#active')
            .check();

        /* clicking on save form */
        cy.get('#special_tag_add')
            .find('.btn-common')
            .click();

        /* Handeling response(here it will be error response) */
        cy.wait('@addNewTagErrorApiCall').its('response.statusCode').should('eq', 500);

        /* checking if error message is displayed */
        cy.get('fim-conformation-message')
            .should('exist')
            .should(
                'have.text',
                "Insert Special Tag Error in Service: InsertSpecialTag DB error : Error  InsertSpecialTag DB error : Error code :  50000 and error message Data already exists for this combination. . ."
            )

        /* checking if the entered values in form is retained or not(we should retain entered values in form in failed response scenario) */
        cy.get('#special_tag_add')
            .find('#tagNameId')
            .should('have.value', specialtagsMockData.dataToAdd.tagName);

        cy.get('#special_tag_add')
            .find('#descriptionId')
            .should('have.value', specialtagsMockData.dataToAdd.description);

        cy.get('#special_tag_add')
            .find('#active').should('be.checked')

        cy.get('#special_tag_add')
            .find('.btn-common')
            .should('not.have.attr', 'disabled')

    });

})