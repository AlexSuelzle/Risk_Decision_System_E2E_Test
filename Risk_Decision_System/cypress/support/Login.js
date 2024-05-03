const baseUrl = Cypress.config('baseUrl')

Cypress.Commands.add('login', () => {
    //Login
    cy.visit('/login')
    cy.get('[class="btn btn-primary"]') //login button
        .click()
    cy.origin('https://id-staging.aifinyo.de/u/login’', () => {
        cy.fixture('login').then((user) => {
            cy.get('#username').type(user.email)
            cy.get('#password').type(user.password)
        })    
        cy.get('[type="submit"]')
            .click()
    })
    cy.url(`${baseUrl}`)
    cy.get('.navbar-brand')
        .click()
    cy.get('[class="btn btn-primary"]') //login button
        .click()
})