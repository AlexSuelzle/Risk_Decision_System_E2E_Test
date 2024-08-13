//baseurl//
const baseUrl = Cypress.config('baseUrl')

//generate random companyName
const companyName = Cypress.env('companyName') //see cypress.config.js

//generate random decision
const randomDecision = Cypress.env('randomDecision') // Randomly decide whether to save or go back to dashboard

beforeEach(() => {
    cy.login() //see cypress/support/Login.js
})

afterEach(() => {
    cy.logout() //see cypress/support/Logout.js
})

describe('Partnerlist', () => {

    it('Partner auflisten', () => {
        cy.get('[href="/partners"]')
            .click()
        cy.url(`${baseUrl}/partners`)
        
        //check table headers
        cy.get('thead > tr > :nth-child(1)')
            .should('have.text', 'Name')
        cy.get('thead > tr > :nth-child(2)')
            .should('have.text', 'External')
        
        //check table content
        cy.get('.tbody')
            .should('exist')
            .find('tr')
            .should('have.length.gt', 0)

        //partner view button
        if (randomDecision) {
            cy.get('.tbody')
                .should('contain', companyName)
                .find(':nth-child(1) > :nth-child(3) > a')
                .click()
            cy.url(`${baseUrl}/partners/´`)
            cy.log('Partner view button works')
        } else {
            cy.get('tbody > :nth-child(1) > :nth-child(3)')
                .click()
            cy.url(`${baseUrl}/partners/´`)
            cy.log('Partner view button works')
        }
    })
})