// import postsData from "./posts-data";
/// <reference types="Cypress" />
import { getEndingPageNumberInPage, getStartingPageNumberInPage } from "../utils";
import PostsData from "./posts-data";
import fimData from "./fim-data";
import receiptsResponse from "./receipts/receipts.constants";


describe('Testing Pagination', () => {


  it('should test if all table columns are in same order', () => {
    cy.visit('http://localhost:3000/posts');
    cy.intercept('GET', 'https://course-api.com/react-tabs-project', PostsData.oneRecordTableData).as('getPostsApi')
    // PostsData.tableColumns.forEach
    cy.get('thead tr th').each(($header, index) => {
      const colName = $header.text();
      expect(colName).to.equal(PostsData.tableColumns[index])
    });
  })

  it('results with 1 page', () => {

    cy.visit('http://localhost:3000/posts');
    cy.intercept('GET', 'https://course-api.com/react-tabs-project', PostsData.oneRecordTableData).as('getPostsApi')
    // cy.wait(3000);
    // cy.contains('Loading...');
    cy.wait('@getPostsApi');
    cy.get('#th_index').contains('Index');
    cy.get('#th_company').contains('Company');
    cy.get('#th_title').contains('Title');
    cy.get('#th_dates').contains('Dates');

    cy.get('#firstButton').should('have.attr', 'disabled')
    cy.get('#previousButton').should('have.attr', 'disabled')
    cy.get('#nextButton').should('have.attr', 'disabled')
    cy.get('#lastButton').should('have.attr', 'disabled')


  })


  it('results with 2 pages', () => {

    cy.visit('http://localhost:3000/posts');
    cy.intercept('GET', 'https://course-api.com/react-tabs-project', PostsData.twoPagesTableData).as('getPostsApi')
    // cy.wait(3000);
    // cy.contains('Loading...');
    cy.wait('@getPostsApi');
    cy.get('#th_index').contains('Index');
    cy.get('#th_company').contains('Company');
    cy.get('#th_title').contains('Title');
    cy.get('#th_dates').contains('Dates');

    cy.get('#firstButton').should('have.attr', 'disabled');
    cy.get('#previousButton').should('have.attr', 'disabled');
    cy.get('#nextButton').should('not.have.attr', 'disabled');
    cy.get('#lastButton').should('not.have.attr', 'disabled');


    cy.get('#nextButton').click();
    cy.contains('Displaying 6 - 9 of 9 Records');
    cy.get('.paging-info').should('include.text', 'Displaying 6 - 9 of 9 Records');

    cy.get('#firstButton').should('not.have.attr', 'disabled');
    cy.get('#previousButton').should('not.have.attr', 'disabled');
    cy.get('#nextButton').should('have.attr', 'disabled');
    cy.get('#lastButton').should('have.attr', 'disabled');


    cy.get('#previousButton').click();

    cy.get('#firstButton').should('have.attr', 'disabled');
    cy.get('#previousButton').should('have.attr', 'disabled');
    cy.get('#nextButton').should('not.have.attr', 'disabled');
    cy.get('#lastButton').should('not.have.attr', 'disabled');


    cy.get('#lastButton').click();

    cy.get('#firstButton').should('not.have.attr', 'disabled');
    cy.get('#previousButton').should('not.have.attr', 'disabled');
    cy.get('#nextButton').should('have.attr', 'disabled');
    cy.get('#lastButton').should('have.attr', 'disabled');

    cy.get('#firstButton').click();

    cy.get('#firstButton').should('have.attr', 'disabled');
    cy.get('#previousButton').should('have.attr', 'disabled');
    cy.get('#nextButton').should('not.have.attr', 'disabled');
    cy.get('#lastButton').should('not.have.attr', 'disabled');


  })


  it('should test pagination data with API ', () => {
    cy.visit('http://localhost:3000/posts');
    cy.request({
      method: 'GET',
      url: 'https://course-api.com/react-tabs-project'
    }).then((res) => {
      if (res.body.length > 0) {
        let pageStartingNumber = 1;
        /* check if table is present */
        cy.get('table').should('be.visible');
        /* check if all columns are displayed and should be in correct order */
        cy.get('thead tr th').each(($header, index) => {
          const colName = $header.text();
          expect(colName).to.equal(PostsData.tableColumns[index])
        });
        /* check if atleast 1-tr with 4td's is present  */
        res.body.forEach((element, index) => {
          cy.get(`#${element.company}_row`).should('be.visible');
          cy.get(`#${element.company}_index`).should('be.visible');
          cy.get(`#${element.company}_company`).should('be.visible').contains(`${element.company}`);
          cy.get(`#${element.company}_title`).should('be.visible');
          cy.get(`#${element.company}_dates`).should('be.visible');
          cy.contains(`Displaying ${pageStartingNumber} - ${res.body.length >= pageStartingNumber + 4  ? pageStartingNumber + 4 : res.body.length} of ${res.body.length} Records`);
          if ((index + 1) % 5 === 0 && res.body.length > index + 1) {
            cy.get('#nextButton').click();
            pageStartingNumber = pageStartingNumber + 1;
          }
        });
      } else {
        cy.get('table').should('not.be.visible');
      }
    })
  })

  it('shoukld test pagination logic and table info with intercepted API', () => {
    cy.visit('http://localhost:3000/posts');
    const tableData = [
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.oneRecordTableData
    ];
    cy.intercept('GET', 'https://course-api.com/react-tabs-project', tableData).as('getPostsApi')
    let pageStartingNumber = 1;
    const pageSize = 5;
    /* check if table is present */
    cy.get('table').should('be.visible');
    /* check if all columns are displayed and should be in correct order */
    cy.get('thead tr th').each(($header, index) => {
      const colName = $header.text();
      expect(colName).to.equal(PostsData.tableColumns[index])
    });

    tableData.forEach((element, index) => {
      cy.get(`#${element.company}_row`).should('be.visible');
      cy.get(`#${element.company}_index`).should('be.visible');
      cy.get(`#${element.company}_company`).should('be.visible').contains(`${element.company}`);
      cy.get(`#${element.company}_title`).should('be.visible').contains(`${element.title}`);
      cy.get(`#${element.company}_dates`).should('be.visible').contains(`${element.dates}`);
      /* checking paging info */
      cy.contains(`Displaying ${getStartingPageNumberInPage(pageStartingNumber)} - ${getEndingPageNumberInPage(pageStartingNumber, tableData.length)} of ${tableData.length} Records`);
      if ((index + 1) % 5 === 0 && tableData.length > index + 1) {
        cy.get('#nextButton').click();
        if (pageStartingNumber !== 1 && tableData.length > pageSize) {
          cy.get('#previousButton').should('not.have.attr', 'disabled');
        }
        pageStartingNumber = pageStartingNumber + 1;
      }
    });
  });

  it('checking for Table Headers', () => {

    cy.visit('http://localhost:3000/posts');
    const tableData = [
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.oneRecordTableData
    ];
    cy.intercept('GET', 'https://course-api.com/react-tabs-project', tableData).as('getPostsApi')
    cy.get('table').should('be.visible');
    /* check if all columns are displayed and should be in correct order */
    cy.get('thead tr th').each(($header, index) => {
      const colName = $header.text();
      expect(colName).to.equal(PostsData.tableColumns[index])
    });
  });

  it('checking for pagination navigation without disabling', () => {

    cy.visit('http://localhost:3000/posts');
    const tableData = [
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.oneRecordTableData
    ];

    cy.intercept('GET', 'https://course-api.com/react-tabs-project', tableData).as('getPostsApi')
    cy.get('table').should('be.visible');

    tableData.forEach((element, index) => {
      cy.get(`#${element.company}_row`).should('be.visible');
      cy.get(`#${element.company}_index`).should('be.visible');
      cy.get(`#${element.company}_company`).should('be.visible').contains(`${element.company}`);
      cy.get(`#${element.company}_title`).should('be.visible').contains(`${element.title}`);
      cy.get(`#${element.company}_dates`).should('be.visible').contains(`${element.dates}`);
      if ((index + 1) % 5 === 0 && tableData.length > index + 1) {
        cy.get('#nextButton').click();
      }
    });
  });

  it('checking for pagination info', () => {

    let pageStartingNumber = 1;
    const pageSize = 5;

    cy.visit('http://localhost:3000/posts');
    const tableData = [
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.oneRecordTableData
    ];

    cy.intercept('GET', 'https://course-api.com/react-tabs-project', tableData).as('getPostsApi')
    cy.get('table').should('be.visible');

    tableData.forEach((_, index) => {
      if ((index + 1) % 5 === 0 && tableData.length > index + 1) {
        cy.get('#nextButton').click();
        pageStartingNumber = pageStartingNumber + 1;
      }
      cy.contains(`Displaying ${getStartingPageNumberInPage(pageStartingNumber)} - ${getEndingPageNumberInPage(pageStartingNumber, tableData.length)} of ${tableData.length} Records`);
    });
  });

  it('should test paginations buttons disable and enable scenarios', () => {
    let pageStartingNumber = 1;
    const pageSize = 5;

    cy.visit('http://localhost:3000/posts');
    const tableData = [
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.twoPagesTableData,
      ...PostsData.oneRecordTableData
    ];

    cy.intercept('GET', 'https://course-api.com/react-tabs-project', tableData).as('getPostsApi')
    cy.get('table').should('be.visible');

    tableData.forEach((_, index) => {
      if(pageStartingNumber === 1) {
        if(tableData.length > pageSize) {
          cy.get('#firstButton').should('have.attr', 'disabled');
          cy.get('#previousButton').should('have.attr', 'disabled');
          cy.get('#nextButton').should('not.have.attr', 'disabled');
          cy.get('#lastButton').should('not.have.attr', 'disabled');
        } else if(tableData.length < pageSize) {
          cy.get('#firstButton').should('have.attr', 'disabled');
          cy.get('#previousButton').should('have.attr', 'disabled');
          cy.get('#nextButton').should('have.attr', 'disabled');
          cy.get('#lastButton').should('have.attr', 'disabled');
        }
      } else if(pageStartingNumber > 1 && getEndingPageNumberInPage(pageStartingNumber, tableData.length) < tableData.length ) {
        cy.log('456')

        cy.get('#firstButton').should('not.have.attr', 'disabled');
        cy.get('#previousButton').should('not.have.attr', 'disabled');
        cy.get('#nextButton').should('not.have.attr', 'disabled');
        cy.get('#lastButton').should('not.have.attr', 'disabled');
      } else if(pageStartingNumber > 1 && getEndingPageNumberInPage(pageStartingNumber, tableData.length) === tableData.length ) {
        cy.log('789')
        cy.get('#firstButton').should('not.have.attr', 'disabled');
        cy.get('#previousButton').should('not.have.attr', 'disabled');
        cy.get('#nextButton').should('have.attr', 'disabled');
        cy.get('#lastButton').should('have.attr', 'disabled');
      }

      if((index+1)%pageSize === 0) {
        cy.get('#nextButton').click();
        pageStartingNumber = pageStartingNumber+1;
      }
    })

  })

  // it('login', () => {
  //   // cy.intercept('GET', 'https://login.microsoftonline.com/common/discovery/instance*', fimData.loginResponse)
  //   // cy.intercept('GET', 'https://login.microsoftonline.com*', fimData.configurationResponse)
  //   // cy.intercept('POST', 'https://login.microsoftonline.com*', fimData.tokenResponse)

  //   // cy.visit('https://login.microsoftonline.com/common/oauth2/v2.0/authorize');

  //   cy.intercept('POST', 'https://login.microsoftonline.com/*', (req) => {
  //     // Handle the intercepted request here
  //   });
  //   // cy.visit('http://localhost:4200')
  // })

  // beforeEach(() => {
  //   // log into Azure Active Directory through our sample SPA using our custom command
  //   cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/GetLocations*', receiptsResponse.locationsData).as('locationsData');
  //   cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getFuelDay*', receiptsResponse.fuelDayResponse).as('getFuelDay');
  //   cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrorsCount*', receiptsResponse.correctImportsResp).as('getImportErrorsCount');
    
  //   cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
  //   cy.wait('@locationsData');
  //   // cy.wait('@getFuelDay');
  //   // cy.wait('@getImportErrorsCount');
  //   cy.visit('http://localhost:4200')
  // })


  xit('verifies the user logged in has the correct preferred name', () => {
    cy.get('.nav-item').should(
      'contain',
      'Fuel Inventory Management'
    )
  })

  xit('should test if we have all labels', () => {
    
    // cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getImportErrorsCount*', receiptsResponse.correctImportsResp).as('getImportErrorsCount')
    // cy.visit('http://localhost:4200/receiving/list');
    // cy.get('#sideNavFuelReceipt').then((el) => {
      // expect(el).should('click');
      cy.intercept('GET', 'https://app-t-l-fimapi.azurewebsites.net/v1/listofreceipts/ACY327', receiptsResponse.listOfReceipts).as('listofreceipts');
      cy.get('#sideNavFuelReceipt').click();
      // cy.visit('http://localhost:4200/receiving/list');
    // cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/fuelTypes*', receiptsResponse.fuelTypes).as('fuelTypes');
    // cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/fuelSuppliers*', receiptsResponse.fuelSuppliers).as('fuelSuppliers');
    // cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/fuelCarriers*', receiptsResponse.fuelCarriers).as('fuelCarriers');
    // cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getOwnerIds*', receiptsResponse.getOwnerIds).as('getOwnerIds');
    // cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/fuelunits*', receiptsResponse.fuelunits).as('fuelunits');
      // el.trigger();
      // cy.wait('@listofreceipts')
      // cy.wait('@fuelTypes')
      // cy.wait('@fuelSuppliers')
      // cy.wait('@fuelCarriers')
      // cy.wait('@getOwnerIds')
      // cy.wait('@fuelunits')
  
      cy.get('label').contains('Date *')
      cy.get('label').contains('Fuel Type *')
      cy.get('label').contains('Supplier ID *')
      cy.get('label').contains('Carrier ID')
      cy.get('label').contains('Document Number *')
      cy.get('label').contains('Gross QTY *')
      cy.get('label').contains('Net QTY *')
      cy.get('label').contains('Unit *')
      cy.get('label').contains('Owner ID *')
    // })

    cy.get('#supplier_id').should('have.attr', 'disabled');
    cy.get('#owner_id').should('have.attr', 'disabled');
    cy.get('#unit').should('have.attr', 'disabled');
    
    cy.get('#fuel_type').blur({force: true});
    cy.get('.fim-error').should('contain', 'This is a required field.')
    cy.get('#fuel_type').type('JTA', { force: true });
    cy.get('#ngb-typeahead-0-0').first()
    // .should('be.visible')
    .click();
    // .then((el) => {
    //   console.log('WWWWWW',el);
    // })
    // cy.get(':nth-child(2) > fim-typeahead > .form-group > .container-fluid > .fa-solid').click()
  })


  xit('should test closing screen', () => {
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getNetConversionFactors*', receiptsResponse.netConversionFactors).as('netConversionsInterceptor');
    cy.intercept('GET', 'https://app-d-l-fimapi.azurewebsites.net/v1/getAllUnitTransactions*', receiptsResponse.closingScreenResponse).as('closingTableDataApiInterceptor');
    cy.visit('http://localhost:4200/closing');
    cy.wait('@netConversionsInterceptor')
    // cy.wait('@closingTableDataApiInterceptor')
    cy.get('.text-start').should('contain', 'ACY327 Daily Balance');
  })




})
