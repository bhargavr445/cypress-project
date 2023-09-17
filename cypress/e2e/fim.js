// /// <reference types="Cypress" />

// import fimData from "./fim-data";

// describe('Fim testing',() => {
//     it('login',()=> {
//         cy.intercept('GET', 'https://login.microsoftonline.com/common/discovery/instance*', fimData.loginResponse)
//         cy.intercept('GET', 'https://login.microsoftonline.com*', fimData.configurationResponse)
//         cy.intercept('POST', 'https://login.microsoftonline.com*', fimData.tokenResponse)

//         cy.visit('http://localhost:4200');
//     })
// })