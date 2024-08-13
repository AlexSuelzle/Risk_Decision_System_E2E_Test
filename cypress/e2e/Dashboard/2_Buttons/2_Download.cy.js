//baseurl//
const baseUrl = Cypress.config('baseUrl')

beforeEach(() => {
    cy.login() //see cypress/support/Login.js
})

afterEach(() => {
    cy.logout() //see cypress/support/Logout.js
})

describe('Check download button', () => {

    it('Excel-Export', () => {
        //Excel-Exports-Button
        cy.get('[href="/inquiries.xlsx"]')
            .click()
            
        const today = new Date().toLocaleDateString('en-GB').split('/').join('.')
        const filePath = `C:/Users/AlexanderSülzle¦aifi/Desktop/Risk_Decision_System_E2E_Test/cypress/downloads/Anfragen bis ${today}.xlsx`

        cy.readFile(filePath)
            .should('exist')
        cy.log('Excel-Export works')
    })
})