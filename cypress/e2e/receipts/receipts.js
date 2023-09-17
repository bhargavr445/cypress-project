/// <reference types="Cypress" />
describe('should test receipt page', () => {

    it('should check if all the labels are displaying', () => {
        cy.visit('http://localhost:4200/receiving/list');
        cy.get('label').contains('Date *')
        cy.get('label').contains('Fuel Type *')
    })
})