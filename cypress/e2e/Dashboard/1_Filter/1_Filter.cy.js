beforeEach(() => {
    cy.login() //see cypress/support/Login.js
        .pause()
})

afterEach(() => {
    //cy.logout() //see cypress/support/Logout.js
})

describe('Filter', () => {

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
        
    })


    it('Use procuct type filter',() => {
        //randomly select an option of product type
        const prodtype = ['Factoring', 'Finetrading', 'Leasing']
        const randomProdtype = prodtype[Math.floor(Math.random() * prodtype.length)]
        cy.get('#product_type')
            .select(randomProdtype)

        //Search button
        cy.get('input.btn')
            .should('contain', 'Suchen')
            .click()

        //Delete the filter
        cy.get('[name="reset-filter"]') //Delete button
            .click({force: true})
        cy.wait(2000)
        cy.get('#product_type')
            .should('have.not.value', randomProdtype)

        //Verify if data is displayed in dashboard
        cy.get('.card-body')
            .should('contain', randomProdtype)
        cy.wait(2000)
        cy.log('Filter deleted successfully!')

    })

})