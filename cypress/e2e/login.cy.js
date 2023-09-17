/// <reference types="Cypress" />
import { testLabels } from "../utils";
import LoginConsts from "./login";

describe('template spec', () => {
  const usersList = LoginConsts.usersList;

  const testAddUserFields = () => {

    usersList.forEach((user) => {
      const { firstName, lastName } = user;


      testLabels('#firstNameLabel', 'First Name');
      cy.get('#firstNameField')
        .should('have.attr', 'placeholder', 'enter first name')
        .should('have.attr', 'type', 'text')
        .should('have.value', '')
        .type(firstName)
        .should('have.value', firstName);


      testLabels('#lastNameLabel', 'Last Name');

      cy.get('#lastNameField')
        .should('have.attr', 'placeholder', 'enter last name')
        .should('have.attr', 'type', 'text')
        .should('have.value', '')
        .type(`${lastName}`)
        .should('have.value', lastName);

        // testLabels('#rolelabel', 'Role');
        // cy.get('#roleField')
        // .should('have.attr', 'placeholder', 'select Role')
        // .select('Manager')

        // cy.get('#roleField').then((el) => {
        //   el('').
        // });

      cy.get('#submit_user').click();

      cy.get('#firstNameField').should('have.value', '');
      cy.get('#lastNameField').should('have.value', '');
    });
  }

  const testUsersList = () => {
    usersList.forEach((user, index) => {
      const { firstName, lastName } = user;
      cy.get(`#first_name_list_${index}`).contains(firstName)
      cy.get(`#last_name_list_${index}`).contains(lastName)
    })
  }


  it('should test all the nav items', () => {

    cy.visit('http://localhost:3000/');


    const navMenuItems = LoginConsts.navMenuItems;

    navMenuItems.map((navItem) => {
      const { selector, text } = navItem;
      // cy.get(selector).should('contain', text);
      cy.get(selector).contains(text);

    })
  })

  it('should test login controls', () => {

    cy.visit('http://localhost:3000/')

    cy.get('#userNameField')
      .should('have.attr', 'placeholder', 'enter user name')
      .should('have.attr', 'type', 'text')
      .should('have.value', '')
      .type('bhargav')
      .should('have.value', 'bhargav');

    cy.get('#userPasswordField')
      .should('have.attr', 'placeholder', 'enter password')
      .should('have.attr', 'type', 'password')
      .should('have.value', '')
      .type('something')
      .should('have.value', 'something')

    cy.get('#loginButton')
      .should('have.attr', 'type', 'submit')
      .should('contain', 'Login')
      .click()
  })

  it('should test Add user section form and list displayed', () => {

    cy.visit('http://localhost:3000/');
    testAddUserFields();
    cy.get('#reset_button').contains('Reset users').click();
    cy.get('#no_users_found').contains('No Users Added');
  })

  it('should test no users added scenario', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#no_users_found').contains('No Users Added');
  });

  it('should test display section', () => {
    cy.visit('http://localhost:3000/');
    testAddUserFields();
    cy.get('[id="user_section_list"]').should('have.length', 3);
    testUsersList();
  })

})