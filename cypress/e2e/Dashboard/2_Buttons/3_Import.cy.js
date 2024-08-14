const baseUrl = Cypress.config('baseUrl')

//Generate random values
const randomNumber = Cypress.env('randomNumber')
const companyName = Cypress.env('companyName')
const randomDecision = Cypress.env('randomDecision')

beforeEach(() => {
    cy.login() //see cypress/support/Login.js
})

afterEach(() => {
    cy.logout() //see cypress/support/Logout.js
})

describe('Partner Import', () => {

    it('Partner importieren', () => {
        cy.get('[href="/partners/new"]').click()
        cy.url().should('eq', `${baseUrl}/partners/new`)
        
        // Fill out form
        cy.get('#partner_external_id').type(randomNumber)
        cy.get('.col-sm-1 > .btn') // Importieren-Button
            .should('contain', 'Importieren')
            .click()
        cy.wait(500)
        
        //Check if previously imported alert is visible
        cy.get('[data-partner-target="previouslyImported"]').then(($element) => {
            if ($element.is(':visible')) {
                cy.get('[data-partner-target="previouslyImported"]').should('be.visible')
                cy.get('[data-partner-target="previouslyImportedPartnerLink"]') //Correct partner link
                    .click()
                cy.url(`${baseUrl}/partners/`)
            } else {
                //Fill out the form with new data
                cy.get('#partner_name')
                    .should('be.empty')
                    .type(companyName)
                
                //Type of company
                const randomCompanyType = getRandomCompanyType()
                function getRandomCompanyType() {
                    const companyTypes = ['Einzelunternehmen', 'GmbH', 'GbR', 'OHG', 'KG', 'UG', 'AG', 'Sonstige']
                    return companyTypes[Math.floor(Math.random() * companyTypes.length)]
                }
                cy.get('#partner_company_type')
                    .select(randomCompanyType)
    
                //Type of contract
                const randomContract = getRandomContract()
                function getRandomContract() {
                    const contracts = ['Retail', 'Mittelstand']
                    return contracts[Math.floor(Math.random() * contracts.length)]
                }
                cy.get('#partner_contract_branch')
                    .select(randomContract)
    
                //Lead channel
                const randomLeadChannel = getRandomLeadChannel()
                function getRandomLeadChannel() {
                    const leadChannels = ['Unbekannt', 'Direktanfrage', 'DFKP', 'Compeon', 'Fincompare', 'Unternehmensberater', 'Pflegeagentur', 'Sonstig']
                    return leadChannels[Math.floor(Math.random() * leadChannels.length)]
                }
                cy.get('#partner_lead_channel')
                    .select(randomLeadChannel)
    
                //Crefo index
                const randomCrefo = Math.floor(Math.random() * 501) + 100
                cy.get('#partner_crefo_index')
                    .type(randomCrefo)
                const today = new Date().toISOString().split('T')[0]
                cy.get('#partner_crefo_index_date')
                    .type(today)
    
                //Address
                cy.fixture('address').then((address) => {
                    cy.get('#partner_street')
                        .type(address.street)
                    cy.get('#partner_postal_code')
                        .type(address.zip)
                    cy.get('#partner_city')
                        .type(address.city)
                })
    
                //Date of foundation
                const randomDate = getRandomDate()
                function getRandomDate() {
                    const start = new Date(1900, 0, 1)
                    const end = new Date()
                    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
                }
                cy.get('#partner_date_of_foundation')
                    .type(randomDate.toISOString().split('T')[0])
    
                //Employees count
                const randomEmployer = Math.floor(Math.random() * 1000)
                cy.get('#partner_number_of_employees').type(randomEmployer)
                cy.get('#partner_number_of_employees_date').type(today)
    
                //ESG score
                const randomESGScore = getRandomESGScore()
                function getRandomESGScore() {
                    const ESGScores = ['1 - Hohe ESG Orientierung', '2 - ESG Orientiert', '3 - ESG Neutral', '4 - ESG Risiken erkennbar', '5 - Hohe ESG Risiken']
                    return ESGScores[Math.floor(Math.random() * ESGScores.length)]
                }
                cy.get('#partner_esg_score')
                    .select(randomESGScore).wait(500)
    
                //Decision to save or not
                if (randomDecision) {
                    cy.get('input.btn') //Save button
                        .should('contain', 'Partner speichern')
                        .click()
                    cy.url(`${baseUrl}/partners/`)
                    cy.get(':nth-child(2) > .alert')
                        .should('contain', 'Partner was successfully created.')
                    cy.get('.col-4 > .card')
                        .should('contain', companyName)
                        .should('contain', randomNumber)
                        .should('contain', randomContract)
                } else {
                    cy.get('.breadcrumb > :nth-child(2) > a') // Back to dashboard without saving
                        .should('contain', 'Dashboard')
                        .click()
                    cy.url().should('eq', `${baseUrl}/`)
                }
            }
        })
    })
})