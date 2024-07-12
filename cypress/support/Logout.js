const baseUrl = Cypress.config('baseUrl')

Cypress.Commands.add('logout', () => {
    cy.contains('Logout')
        .click()
    cy.url(`${baseUrl}/login`)
})