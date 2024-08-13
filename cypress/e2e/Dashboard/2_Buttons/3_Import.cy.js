//baseurl//
const baseUrl = Cypress.config('baseUrl')

//generate random number
const randomNumber = Cypress.env('randomNumber') //see cypress.config.js

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

describe('Partner Import', () => {

    it('Partner importieren', () => {
        cy.get('[href="/partners/new"]')
            .click()
        cy.url(`${baseUrl}/partners/new`)
        
        //fill out form
        cy.get('#partner_external_id')
            .type(randomNumber)
        cy.get('.col-sm-1 > .btn') //Importieren-Button
            .should('contain', 'Importieren')
            .click()
            .pause()
        cy.wait(500)
        if (cy.get('[data-partner-target="previouslyImported"]').should('not.be.visible')) {
            cy.get('#partner_name')
                .should('be.empty')
                .type(companyName)

            //type of company
            const randomCompanyType = getRandomCompanyType()
            function getRandomCompanyType() {
                const companyTypes = ['Einzelunternehmen', 'GmbH', 'GbR', 'OHG', 'KG', 'UG', 'AG', 'Sonstige']
                const randomIndex = Math.floor(Math.random() * companyTypes.length)
                return companyTypes[randomIndex]
            }
            cy.get('#partner_company_type')
                .select(randomCompanyType)

            //type of contract
            const randomContract = getRandomContract()
            function getRandomContract() {
                const contracts = ['Retail', 'Mittelstand']
                const randomIndex = Math.floor(Math.random() * contracts.length)
                return contracts[randomIndex]
            }
            cy.get('#partner_contract_branch')
                .select(randomContract)

            //lead channel
            const randomLeadChannel = getRandomLeadChannel()
            function getRandomLeadChannel() {
                const leadchannel = ['Unbekannt', 'Direktanfrage', 'DFKP', 'Compeon', 'Fincompare', 'Unternehmensberater', 'Pflegeagentur', 'Sonstig']
                const randomIndex = Math.floor(Math.random() * leadchannel.length)
                return leadchannel[randomIndex]
            }
            cy.get('#partner_lead_channel')
                .select(randomLeadChannel)

            //crefo index
            const randomCrefo = Math.floor(Math.random() * 501) + 100
            cy.get('#partner_crefo_index')
                .type(randomCrefo)
            const today = new Date().toISOString().split('T')[0]
            cy.get('#partner_crefo_index_date')
                .type(today)

            //address
            cy.fixture('address').then((address) => {
                cy.get('#partner_street')
                    .type(address.street)
                cy.get('#partner_postal_code')
                    .type(address.zip)
                cy.get('#partner_city')
                    .type(address.city)
            })

            //date of foundation
            const randomDate = getRandomDate()
            function getRandomDate() {
                const start = new Date(1900, 0, 1)
                const end = new Date()
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
            }
            cy.get('#partner_date_of_foundation')
                .type(randomDate.toISOString().split('T')[0])

            //employees count
            const randomEmployer = Math.floor(Math.random() * 1000)
            cy.get('#partner_number_of_employees')
                .type(randomEmployer)
            cy.get('#partner_number_of_employees_date')
                .type(today)

            //esg score
            const randomESGScore = getRandomESGScore()
            function getRandomESGScore() {
                const ESGScore = ['1 - Hohe ESG Orientierung', '2 - ESG Orientiert', '3 - ESG Neutral', '4 - ESG Risiken erkennbar', '5 - Hohe ESG Risiken']
                const randomIndex = Math.floor(Math.random() * ESGScore.length)
                return ESGScore [randomIndex]
            }
            cy.get('#partner_esg_score')
                .select(randomESGScore)
                .wait(500)

            //To save, not to save, that is the question
            if (randomDecision) {
                cy.get('input.btn') // Speichern-Button
                    .should('contain', 'Partner speichern')
                    .click()
                cy.url(`${baseUrl}/partners/´`)
                cy.get(':nth-child(2) > .alert')
                    .should('contain', 'Partner was successfully created.')
                cy.get('.col-4 > .card')
                    .should('contain', companyName)
                    .should('contain', randomNumber)
                    .should('contain', randomContract)
            } else {
                cy.get('.breadcrumb > :nth-child(2) > a') //back to dashboard without saving
                    .should('contain', 'Dashboard')
                    .click()
                cy.url(`${baseUrl}/`)
            }

        } else {
            cy.get('[data-partner-target="previouslyImported"]')
                .should('be.visible')
            cy.get('[href="/partners/´"]')
                .click()
            cy.url(`${baseUrl}/partners/´`)
        }
    })
})