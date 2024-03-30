/// <reference types="Cypress" />
import receiptsResponse from "./receipts/receipts.constants";
import { calculateVariance, calculateVariancePercentage, formatNumberWithCommasAndDecimal, transform } from "../utils";

describe('Closing Screen testing', () => {

  beforeEach(() => {
    // log into Azure Active Directory through our sample SPA using our custom command
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/GetLocations/*', receiptsResponse.locationsData).as('locationsData');
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getFuelDay/*', receiptsResponse.fuelDayResponse).as('getFuelDay');
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrorsCount*', receiptsResponse.correctImportsResp).as('getImportErrorsCount');

    cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
    cy.wait('erifies the user logged in has the correct preferred name@locationsData');
    cy.visit('')
  });

  it('verifies the user logged in has the correct preferred name', () => {
    
    cy.get('.nav-item').should(
      'contain',
      'Fuel Inventory Management'
    )
  });

  it('should test if page contains buttons and aily balance text', () => {
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getNetConversionFactors*', receiptsResponse.netConversionFactors).as('netConversionsInterceptor');
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getAllUnitTransactions*', receiptsResponse.closingScreenResponse).as('closingTableDataApiInterceptor');
    cy.visit('/closing');
    cy.wait('@netConversionsInterceptor');
    cy.wait('@closingTableDataApiInterceptor').then(({ request, response }) => {
      
      cy.get('.text-start', { timeout: 10000 })
        .should('exist');

      cy.get('.text-start')
        .should('contain', 'ACY327 Daily Balance');

      cy.get('#close_fuel_day')
        .should('contain', 'Close Fuel Day')
        .should('have.attr', 'disabled');

      cy.get('#close_unit')
        .should('contain', 'Close Unit')
        .should('have.attr', 'disabled');

      cy.get('#re-open-unit')
        .should('contain', 'Re-Open Unit')
        .should('have.attr', 'disabled');

    });
  });

  it('should test table header labels when data is available', () => {

    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getNetConversionFactors*', receiptsResponse.netConversionFactors).as('netConversionsInterceptor');
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getAllUnitTransactions*', receiptsResponse.closingScreenResponse).as('closingTableDataApiInterceptor');
    cy.visit('/closing');
    cy.wait('@netConversionsInterceptor')
    cy.wait('@closingTableDataApiInterceptor')

    /* check if all these id's exist */
    cy.get('#status_header')
      .should('have.text', 'Status');

    cy.get('#unit_header')
      .should('have.text', 'Unit');

    cy.get('#ASR_header')
      .should('have.text', 'ASR#');

    cy.get('#meter_1_reading_header')
      .should('have.text', 'Meter 1 Reading');

    cy.get('#meter_2_reading_header')
      .should('have.text', 'Meter 2 Reading');

    cy.get('#quantity_header')
      .should('have.text', 'Quantity');

    cy.get('#into_header_unit')
      .should('have.text', 'Into Unit');

    cy.get('#fuel_header')
      .should('have.text', 'Fuel');

    cy.get('#owner_header_id')
      .should('have.text', 'Owner ID');

    cy.get('#txn_header')
      .should('have.text', 'Txn');

    cy.get('#customer_header')
      .should('have.text', 'Customer');

  });
  
  it('should test data in unit level rows', () => {
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getNetConversionFactors*', receiptsResponse.netConversionFactors).as('netConversionsInterceptor');
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getAllUnitTransactions*', receiptsResponse.closingScreenResponse).as('closingTableDataApiInterceptor');
    cy.visit('/closing');
    cy.wait('@netConversionsInterceptor');
    cy.wait('@closingTableDataApiInterceptor').then(({ response }) => {
      cy.get('mat-expansion-panel').should('have.length', response.body.content.items.length);
      const unit = response.body.content.items;

      cy.get('mat-expansion-panel').each((el, index) => {
        cy.get(el).find('.mat-column-checkbox')
          .should('exist');

        cy.get(el).find('.mat-column-unit')
          .should('have.text', transform(unit[index].localUnitName + ' / ' + unit[index].unitNumber, 20));

        cy.get(el).find('.mat-column-meter1Reading')
          .should('have.text', unit[index].meter1End ? formatNumberWithCommasAndDecimal(unit[index].meter1End) : '-');

        cy.get(el).find('.mat-column-meter2Reading')
          .should('have.text', unit[index].meter2End ? formatNumberWithCommasAndDecimal(unit[index].meter2End) : '-');

        cy.get(el).find('.mat-column-quantity')
          .should('have.text', formatNumberWithCommasAndDecimal(unit[index].pumped) ?? '-');

        cy.get(el).find('.mat-column-into-unit')
          .should('have.text', formatNumberWithCommasAndDecimal(unit[index].filled) ?? '-');

        cy.get(el).find('.mat-column-fuel')
          .should('have.text', unit[index]?.categoryDescription ? unit[index].categoryDescription : '-');

      })
    });
  });

  it('should test if all the labels and values are available on DOM', () => {

    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getNetConversionFactors*', receiptsResponse.netConversionFactors).as('netConversionsInterceptor');
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getAllUnitTransactions*', receiptsResponse.closingScreenResponse).as('closingTableDataApiInterceptor');
    cy.visit('/closing');
    cy.wait('@netConversionsInterceptor');
    cy.wait('@closingTableDataApiInterceptor')

    cy.get('#selected_record_beginning_inventory_label')
      .should('have.text', 'Beginning Inventory');

    cy.get('#selected_record_filled_label')
      .should('have.text', '+ Filled');

    cy.get('#selected_record_pumped_label')
      .should('have.text', '- Pumped');

    cy.get('#selected_record_sumped_label')
      .should('have.text', '- Sumped');

    cy.get('#selected_record_book_inventory_label')
      .should('have.text', '= Book Inventory');

    cy.get('#selected_record_physical_inventory_label')
      .should('have.text', 'Physical Inventory');

    cy.get('#selected_record_variance_label')
      .should('have.text', 'Variance');

    cy.get('#selected_record_variance_percent_label')
      .should('have.text', 'Variance %');

    receiptsResponse.closingScreenResponse.content.items.forEach((unit, index) => {
      
      cy.get(`#mat-expansion-panel-header-${index}`)
        .should('exist').click({ force: true });

      cy.get('#selected_record_capacity')
        .should('have.text', `Capacity: ${formatNumberWithCommasAndDecimal(unit.capacity)}`);

      cy.get('#selected_record_beginning_inventory_value')
        .should('have.text', formatNumberWithCommasAndDecimal(unit.beginningInventory));

      cy.get('#selected_record_filled_value')
        .should('have.text', formatNumberWithCommasAndDecimal(unit.filled));

      cy.get('#selected_record_pumped_value')
        .should('have.text', formatNumberWithCommasAndDecimal(unit.pumped));

      cy.get('#selected_record_sumped_value')
        .should('have.text', formatNumberWithCommasAndDecimal(unit.sumped));

      cy.get('#selected_record_book_inventory_value')
        .should('have.text', formatNumberWithCommasAndDecimal(unit.bookInventory));

      cy.get('#selected_record_physical_inventory_value')
        .should('have.text', formatNumberWithCommasAndDecimal(unit.physicalInventory));

      cy.get('#selected_record_variance_value')
        .should('have.text', formatNumberWithCommasAndDecimal(calculateVariance(unit.physicalInventory, unit.bookInventory)));

      cy.get('#selected_record_variance_percent_value')
        .should('have.text', formatNumberWithCommasAndDecimal(calculateVariancePercentage(unit.physicalInventory, unit.bookInventory, unit.capacity)));

    });
  });

  it('should test closing screen', () => {
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getNetConversionFactors*', receiptsResponse.netConversionFactors).as('netConversionsInterceptor');
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getAllUnitTransactions*', receiptsResponse.closingScreenResponse).as('closingTableDataApiInterceptor');
    cy.visit('/closing');
    cy.wait('@netConversionsInterceptor')
    cy.wait('@closingTableDataApiInterceptor')


    receiptsResponse.closingScreenResponse.content.items.forEach((unit, index) => {

      cy.get(`#${unit.unitId}`).should('exist');
      cy.get(`#mat-expansion-panel-header-${index}`).should('exist').click({ force: true });
      cy.get(`#${unit.unitId}_default_arrow`).should('exist');
      if (unit.transactions.length > 0) {
        cy.get(`#${unit.unitId}_right_arrow`).should('have.class', 'active-chevron');
        cy.get(`#${unit.unitId}_default_arrow`).click({ force: true });
        cy.get(`#${unit.unitId}_down_arrow`).should('have.class', 'fa-chevron-down');
      } else {
        cy.get(`#${unit.unitId}_right_arrow`).should('have.class', 'inactive-chevron');
      }
    })

  });

  it('should test transactions', () => {
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getNetConversionFactors*', receiptsResponse.netConversionFactors).as('netConversionsInterceptor');
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getAllUnitTransactions*', receiptsResponse.closingScreenResponse).as('closingTableDataApiInterceptor');
    cy.visit('/closing');
    cy.wait('@netConversionsInterceptor');
    cy.wait('@closingTableDataApiInterceptor').then(({response}) => {
      cy.get('mat-expansion-panel').should('have.length', response.body.content.items.length);
      const unit = response.body.content.items;

      cy.get('mat-expansion-panel').each((el, index) => {
        const transactions = unit[index].transactions
        if(unit[index].transactions.length > 0) {
          cy.log(`#${unit[index].unitId}_default_arrow`);
              cy.get(el).find(`#${unit[index].unitId}_right_arrow`).should('have.class', 'active-chevron'); 
              cy.get(el).find(`#${unit[index].unitId}_right_arrow`).click({force: true});
              cy.get(el).find(`#${unit[index].unitId}_down_arrow`).should('have.class', 'fa-chevron-down'); 
              cy.get(el).find('.expansion-panel-container').find('tr').should('have.length', unit[index].transactions.length)
              cy.get(el).find('.expansion-panel-container').find('tr').each((trElement, transactionIndex) => {
                cy.get(trElement).find('.col-asr').should('have.text', transactions[transactionIndex].asr);
                cy.get(trElement).find('.col-fuel').should('have.text', transactions[transactionIndex]?.fuelType ? transactions[transactionIndex]?.fuelType : '-');
                // cy.log(formatNumberWithCommasAndDecimal(transactions[transactionIndex].meter1End));
                // cy.get(trElement).find('.col-meter1Reading').should('have.text', transactions[transactionIndex].meter1End ? formatNumberWithCommasAndDecimal(transactions[transactionIndex].meter1End) : '-');
                // cy.get(trElement).find('.col-meter2Reading').should('have.text', transactions[transactionIndex].meter2End ? formatNumberWithCommasAndDecimal(transactions[transactionIndex].meter2End) : '-');
              })
            } else {
              cy.get(el).find(`#${unit[index].unitId}_right_arrow`).should('have.class', 'inactive-chevron'); 
            }
      })

    });

    // cy.get('mat-expansion-panel').each((el, index) => {
    //   if(unit[index].transactions.length > 0) {
    //     cy.get(el).find(`#${unit}`)
    //   }
    // })

  });

  it('should test records found message', ()=> {

    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getNetConversionFactors*', receiptsResponse.netConversionFactors).as('netConversionsInterceptor');
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getAllUnitTransactions*', receiptsResponse.closingScreenResponseWithNoRecords).as('closingTableDataApiInterceptor');
    cy.visit('/closing');
    cy.wait('@netConversionsInterceptor');
    cy.wait('@closingTableDataApiInterceptor').then(({request, response}) => {
      cy.log(JSON.stringify(response));
      cy.get('#no-records-found-message')
      .should('exist')
      .should('have.text', 'No Records Found.');
    });

    cy.get('#correct_import_errors_side_nav').find('.side-menu-text').should('contain', 'Correct Import Errors');
  })

})