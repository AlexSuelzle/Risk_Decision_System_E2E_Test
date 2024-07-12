const baseUrl = Cypress.config('baseUrl')

Cypress.Commands.add('login', () => {
    //Login
    cy.visit(`${baseUrl}/users/sign_in`)
    cy.fixture('login').then((user) => {
        cy.get('#user_email').type(user.email)
        cy.get('#user_password').type(user.password)
    })    
    cy.get('.form-actions > .btn')
        .should('contain', 'Log in')
        .click()
    cy.url(`${baseUrl}/`)
    cy.get('.alert')
        .should('contain', 'Erfolgreich eingeloggt.')
    cy.log('Login Successfull!')
})