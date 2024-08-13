beforeEach(() => {
    cy.login() //see cypress/support/Login.js
})

afterEach(() => {
    cy.logout() //see cypress/support/Logout.js
})

describe('Existence of filter', () => {

    it('Checking the existence of filter elements in dashboard',() => {
        //check the filter headlines
        cy.get(`:nth-child(1) > .fw-bolder`)
            .should('contain', 'Art von Produkt')
        cy.get(`:nth-child(2) > .fw-bolder`)
            .should('contain', 'Anfrage-Typ')
        cy.get(`:nth-child(3) > .fw-bolder`)
            .should('contain', 'Benötigte Rolle')
        cy.get(`:nth-child(4) > .fw-bolder`)
            .should('contain', 'Status')
        
        //check the filter options
        const filterIds = ['#product_type', '#inquiry_type', '#needed_vote_level', '#workflow_state'];

        filterIds.forEach((id) => {
            cy.get(id)
                .should('exist')
                .should('have.not.value')
        })

        //check existences of buttons
        //search button
        cy.get('input.btn')
            .should('contain', 'Suchen')
        //filter delete button
        cy.get('.align-self-end > button.btn')   
    })
})