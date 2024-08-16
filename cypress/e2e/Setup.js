export function partnerlist() {
    const baseUrl = Cypress.config('baseUrl')
    //Generate random values
    const randomNumber = Cypress.env('randomNumber')
    const companyName = Cypress.env('companyName')
    const randomDecision = Cypress.env('randomDecision')

    cy.get('[href="/partners"]')
        .click()
    cy.url(`${baseUrl}/partners`)
    
    //check table headers
    cy.get('thead > tr > :nth-child(1)')
        .should('have.text', 'Name')
    cy.get('thead > tr > :nth-child(2)')
        .should('have.text', 'External')
    
    //check table content
    cy.get('tbody')
        .should('exist')
        .find('tr')
        .should('have.length.gt', 0)

    //partner view button
    if (randomDecision) {
        cy.get('tbody')
            .should('contain', companyName)
            .find(':nth-child(1) > :nth-child(3) > a')
            .click()
        cy.wait(500)
        cy.url(`${baseUrl}/partners/´`)
        cy.wait(500)
        cy.log('Partner view button works')
    } else {
        cy.get('tbody > :nth-child(1) > :nth-child(3)')
            .click()
        cy.url(`${baseUrl}/partners/´`)
        cy.log('Partner view button works')
    }
}