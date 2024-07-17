beforeEach(() => {
    cy.login() //see cypress/support/Login.js
})

afterEach(() => {
    cy.logout() //see cypress/support/Logout.js
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

        //check existences of buttons
        //search button
        cy.get('input.btn')
            .should('contain', 'Suchen')
        //filter delete button
        cy.get('.align-self-end > button.btn')   
    })

    it('Use filter options', () => {
        const filterOptions = [
            {
                id: '#product_type',
                options: ['Factoring', 'Finetrading', 'Leasing']
            },
            {
                id: '#inquiry_type',
                options: ['Neu', 'Prolongation', 'Erhöhung']
            },
            {
                id: '#needed_vote_level',
                options: ['Sales/Kundenbetreuer', 'Risikomanager', 'Head of Risk', 'Risikovorstand', 'Vorstand']
            },
            {
                id: '#workflow_state',
                options: ['Neue Anfrage', 'In Bearbeitung', 'Warte auf Unterlagen', 'Votum steht aus', 'Abgebrochen', 'Angenommen', 'Abgelehnt']
            }
        ]

        //Iterate through each filter option
        filterOptions.forEach((filter) => {
            const randomOption = filter.options[Math.floor(Math.random() * filter.options.length)]
            cy.get(filter.id)
                .select(randomOption)

            //Click on search button
            cy.get('input.btn')
                .click()

            if (randomOption) {
                cy.get('.card-body')
                    .should('contain', randomOption)
                    .should('not.contain', filter.options.filter(option => option !== randomOption))
            } else {
                cy.get('.card-body')
                    .should('contain', '.alert')
                    .should('contain', 'Es wurden keine Anfragen gefunden.')
            }

            //Delete filter
            cy.get('.align-self-end > button.btn') //delete button
                .click({ force: true })
            cy.wait(500)
                .pause()
            cy.get(filter.id) //check if the filter is cleared
                .should('have.not.value')

            cy.log('Filter deleted successfully!')
        })             
    })

})