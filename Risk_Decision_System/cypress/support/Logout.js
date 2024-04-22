Cypress.Commands.add('logout', () => {
    cy.contains('Logout')
        .click()
    cy.url('https://risk-decision-system.herokuapp.com/login')
})