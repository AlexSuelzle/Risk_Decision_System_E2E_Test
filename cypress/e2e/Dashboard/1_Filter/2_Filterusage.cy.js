beforeEach(() => {
    cy.login() //see cypress/support/Login.js
})

afterEach(() => {
    cy.logout() //see cypress/support/Logout.js
})

describe('Usage of filter', () => {

    it('Use filter options', () => {
        cy.wait(5000)
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

                cy.get('.card-body').then(($body) => {
                    if ($body.find('.alert').length > 0 && $body.text().includes('Es wurden keine Anfragen gefunden.')) {
                      cy.log('No requests found with the selected filter option!');
                    } else {
                      cy.get('.card-body').should('contain', randomOption);
                      filter.options.forEach(option => {
                        if (option !== randomOption) {
                          cy.get('.card-body').should('not.contain', option);
                        }
                      });
                    }
                  });
                  

            //Delete filter
            cy.get('.align-self-end > button.btn') //delete button
                .click({ force: true })
            cy.wait(500)
            cy.get(filter.id) //check if the filter is cleared
                .should('have.not.value')

            cy.log('Filter deleted successfully!')
        })             
    })

})