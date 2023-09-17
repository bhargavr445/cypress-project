/// <reference types="Cypress" />
describe('tet sign up form using find method..', () => {

    it('should visit all sign up fields', () => {
        cy.visit('http://localhost:3000/');


        cy.get('#addUserSection')
            .find('#firstNameLabel').contains('First Name')


        cy.get('#addUserSection')
            .find('#firstNameField')
            .type('test me')
            .should('exist')

    })

})