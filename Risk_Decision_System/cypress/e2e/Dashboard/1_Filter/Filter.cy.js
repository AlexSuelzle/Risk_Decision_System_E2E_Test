beforeEach(() => {
    cy.login() //see cypress/support/Login.js
})

afterEach(() => {
    //cy.logout() //see cypress/support/Logout.js
})

describe('Filter', () => {

    it('Filter',() => {
        //Art von Produkt
        cy.get(':nth-child(1) > .fw-bolder')
            .should('contain', 'Art von Produkt')
        
        //randomly select an option of product type
        const prodtype = ['Factoring', 'Finetrading', 'Leasing']
        const randomProdtype = prodtype[Math.floor(Math.random() * prodtype.length)]
        
        cy.get('#product_type')
            .select(randomProdtype)

        //Anfrage-Typ
        cy.get(':nth-child(2) > .fw-bolder')
            .should('contain', 'Anfrage-Typ')

        //randomly select an option of inquiry type
        const inqtype = ['Neu', 'Prolongation', 'Erhöhung']
        const randomInqtype = inqtype[Math.floor(Math.random() * inqtype.length)]

        cy.get('#inquiry_type')
            .select(randomInqtype)

        //Benötigte Rollen
        cy.get(':nth-child(3) > .fw-bolder')
            .should('contain', 'Benötigte Rolle')

        //randomly select an option of needed vote roles
        const roles = ['Sales/Kundenbetreuer', 'Risikomanager', 'Head of Risk', 'Vorstand (1/2)', 'Vorstand (2/2)']
        const randomRoles = roles[Math.floor(Math.random() * roles.length)]

        cy.get('#needed_vote_level')
            .select(randomRoles)

        //Status
        cy.get(':nth-child(4) > .fw-bolder')
            .should('contain', 'Status')
        
        //randomly select an option of workflow state
        const status = ['Neue Anfrage', 'In Bearbeitung (Risk)', 'Warte auf Unterlagen', 'Votum steht auf', 'Abgebrochen', 'Angenommen', 'Abgelehnt']
        const randomStatus = status[Math.floor(Math.random() * status.length)]

        cy.get('#workflow_state')
            .select(randomStatus)

        //Search button
        cy.get('input.btn')
            .should('contain', 'Suchen')
            .click()

        // Verify if filters work correctly
        cy.get('.card-body')
            .then(($body) => {
                if ($body.find('.alert.alert-info').length > 0) {
                    cy.log('No results found')
                } else {
                    cy.get('.card-body')
                        .find('tr')
                        .should('contain', randomProdtype)
                        .should('contain', randomInqtype)
                        .should('contain', randomRoles)
                        .should('contain', randomStatus)
                    cy.log('Results found')
                }
            })
        //Delete the filters
        cy.get('.align-self-end > button.btn')
            .click()
    })

})