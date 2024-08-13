//baseurl//
const baseUrl = Cypress.config('baseUrl')

beforeEach(() => {
    cy.login() //see cypress/support/Login.js
})

afterEach(() => {
    cy.logout() //see cypress/support/Logout.js
})

describe('Check dashboard buttons', () => {

    it('Check the existence of dashboard buttons', () => {
        //Excel-Export-Button
        cy.get('[href="/inquiries.xlsx"]')
            .should('have.text', 'Excel Export')

        //Partner importieren-Button
        cy.get('[href="/partners/new"]')
            .should('have.text', 'Partner importieren')

        //Partner auflisten-Button
        cy.get('[href="/partners"]')
            .should('have.text', 'Partner auflisten')
        
        cy.log('All buttons exist')
    })
})