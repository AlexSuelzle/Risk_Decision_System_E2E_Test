describe('Filter', () => {

    it('Filter',() => {
        cy.visit('https://risk-decision-system.herokuapp.com/login')
        cy.get('[class="btn btn-primary"]') //login button
            .click()
        cy.url('https://id-staging.aifinyo.de/u/login’')
        cy.origin('https://id-staging.aifinyo.de/u/login’', () => {
            cy.get('#username')
                .type('alexander.suelzle@aifinyo.de')
            cy.get('#password')
                .type('9krlV5M^MWaOV@SJ')
            cy.get('[type="submit"]')
                .click()
        })
        cy.url('https://risk-decision-system.herokuapp.com')
        cy.get('.navbar-brand')
            .click()
        cy.get('[class="btn btn-primary"]') //login button
            .click()
    })
})