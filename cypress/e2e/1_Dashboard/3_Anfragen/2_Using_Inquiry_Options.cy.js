import { inquiryview } from '../../Setup'

const baseUrl = Cypress.config('baseUrl') //siehe cypress.json

beforeEach(() => {
    cy.login() //siehe cypress/support/Login.js
})

afterEach(() => {
    cy.logout() //siehe cypress/support/Logout.js
})

describe('Using inquiry options', () => {

    it('Inquiry view', () => {
        inquiryview() //see cypress/e2e/Setup.js
    })

    it('Download inquiry', () => {
        //Intercept the request to the download endpoint
        cy.intercept('GET', 'https://risk-decision-system.herokuapp.com/inquiries/*/export_single_inquiry.xlsx')
            .as('downloadRequest')
    
        //Trigger the download action
        cy.get('.card-body')
            .find('[title="Anfrage download"]')
            .first()
            .click()
    
        //Wait for the download request to complete
        cy.wait('@downloadRequest')
            .its('response.statusCode')
            .should('eq', 200) // Ensure the request was successful with status code 200
        cy.pause()    
        cy.log('Download inquiry button works')      
    })

    it('Delete inquiry', () => {
        //Intercept the request to the delete endpoint
        cy.intercept('POST', 'https://risk-decision-system.herokuapp.com/partners/*/inquiries/*?_method=delete')
            .as('deleteRequest')

        //Trigger the delete action
        cy.get('.card-body')
            .find('[title="Anfrage löschen"]')
            .first()
            .click()
        cy.pause()

        //Wait for the download request to complete
        cy.wait('@deleteRequest')
            .its('response.statusCode')
            .should('eq', 302)
        cy.log('Delete inquiry button works')
    })
})