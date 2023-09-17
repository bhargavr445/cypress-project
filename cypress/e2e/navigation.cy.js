describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#postsNav').click();
    cy.location('pathname').should('eq', '/posts');
  })
})