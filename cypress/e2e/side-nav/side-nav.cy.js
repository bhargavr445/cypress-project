/// <reference types="Cypress" />
import receiptsResponse from "../receipts/receipts.constants";


describe('should test side nav', () => {

    beforeEach(() => {
        // log into Azure Active Directory through our sample SPA using our custom command
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/GetLocations/*', receiptsResponse.locationsData)
            .as('locationsData');
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getFuelDay/*', receiptsResponse.fuelDayResponse)
            .as('getFuelDay');

        cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
        cy.wait('@locationsData');
        cy.visit('/home')
    });

    it('should check if all the options exists', () => {
        cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrorsCount*', receiptsResponse.correctImportsResp)
            .as('getImportErrorsCount');

        cy.wait('@getImportErrorsCount').then(({ request, response }) => {


            cy.get('.sidebar')
                .find('li').should('have.length', 26)

            cy.get('.sidebar')
                .find('#correct_import_errors_side_nav')
                .should('exist')
                .should('contain', 'Correct Import Errors');

            cy.get('.sidebar')
                .find('#fuel_receiving_side_nav')
                .should('exist')
                .should('have.text', 'Fuel Receiving');

            cy.get('.sidebar')
                .find('#fuel_disbursement_side_nav')
                .should('exist')
                .should('have.text', 'Fuel Disbursement');

            cy.get('.sidebar')
                .find('#fuel_reconciliation_side_nav')
                .should('exist')
                .should('exist')
                .should('have.text', 'Fuel Reconciliation');

            cy.get('.sidebar')
                .find('#allocations_side_nav')
                .should('exist')
                .should('have.text', 'Allocations');

            cy.get('.sidebar')
                .find('#fuel_closing_side_nav')
                .should('exist')
                .should('have.text', 'Fuel Closing');

            cy.get('.sidebar')
                .find('#fuel_day_review_to_billing_side_nav')
                .should('exist')
                .should('have.text', 'Fuel Day Review to Billing');

            cy.get('.sidebar')
                .find('#re_open_fuel_day_side_nav')
                .should('exist')
                .should('have.text', 'Re-open Fuel Day');

            cy.get('.sidebar')
                .find('#search_transaction_side_nav')
                .should('exist')
                .should('have.text', 'Search Transaction');

            cy.get('.sidebar')
                .find('#reports_side_nav')
                .should('exist')
                .should('have.text', 'Reports');

            cy.get('.sidebar')
                .find('#admin_side_nav')
                .should('exist')
                .should('have.text', 'Admin');

        })
    });

    it('should test options under Fuel Admin', () => {
        
        cy.get('.sidebar')
            .find('#admin_side_nav')
            .should('exist')
            .click()
            .find('.fa-chevron-up')
            .should('exist')

        cy.get('#admin_sub_items').each((el) => {
            cy.get(el).find('#special_tag_sub_item').should('exist').should('have.text', 'Special Tag');
            cy.get(el).find('#owner_fuel_type_sub_item').should('exist').should('have.text', 'Owner Fuel Type');
            cy.get(el).find('#unit_sub_item').should('exist').should('have.text', 'Unit');
            cy.get(el).find('#customer_owner_mapping_sub_item').should('exist').should('have.text', 'Customer Owner Mapping');
            cy.get(el).find('#customer_location_mapping_sub_item').should('exist').should('have.text', 'Customer Location Mapping');
            cy.get(el).find('#customer_tail_number_sub_item').should('exist').should('have.text', 'Customer Tail Number');
            cy.get(el).find('#carrier_location_mapping_sub_item').should('exist').should('have.text', 'Carrier Location Mapping');
            cy.get(el).find('#agent_location_mapping_sub_item').should('exist').should('have.text', 'Agent Location Mapping');
        })

        cy.get('.sidebar')
            .find('#admin_side_nav')
            .should('exist')
            .find('.fa-chevron-up')
            .click()

        cy.get('.sidebar')
            .find('#admin_side_nav')
            .find('.fa-chevron-down')
            .should('exist')

        cy.get('#admin_sub_items').each((el) => {
            cy.get(el).find('#special_tag_sub_item')
                .should('be.hidden');
            cy.get(el).find('#owner_fuel_type_sub_item')
                .should('be.hidden');
            cy.get(el).find('#unit_sub_item')
                .should('be.hidden');
            cy.get(el).find('#customer_owner_mapping_sub_item')
                .should('be.hidden');
            cy.get(el).find('#customer_location_mapping_sub_item')
                .should('be.hidden');
            cy.get(el).find('#customer_tail_number_sub_item')
                .should('be.hidden');
            cy.get(el).find('#carrier_location_mapping_sub_item')
                .should('be.hidden');
            cy.get(el).find('#agent_location_mapping_sub_item')
                .should('be.hidden');
        })
    })

    it('should test options under Fuel Reconcillation', () => {

        cy.get('.sidebar')
            .find('#fuel_reconciliation_side_nav')
            .should('exist')
            .click()
            .find('.fa-chevron-up')
            .should('exist')

        cy.get('#net_conversion_factor_side_nav')
            .should('exist').should('be.visible')
            .should('have.text', 'Net Conversion Factor')

        cy.get('#stock_transfers_side_nav')
            .should('exist').should('be.visible')
            .should('have.text', 'Stock Transfers')

        cy.get('#physical_inventory_side_nav')
            .should('exist')
            .should('be.visible')
            .should('have.text', 'Physical Inventory')

        cy.get('.sidebar')
            .find('#fuel_reconciliation_side_nav')
            .should('exist')
            .find('.fa-chevron-up')
            .click()

        cy.get('.sidebar')
            .find('#fuel_reconciliation_side_nav')
            .find('.fa-chevron-down')
            .should('exist')

        cy.get('#net_conversion_factor_side_nav')
            .should('be.hidden');

        cy.get('#stock_transfers_side_nav')
            .should('be.hidden');

        cy.get('#physical_inventory_side_nav')
            .should('be.hidden');

    });

});