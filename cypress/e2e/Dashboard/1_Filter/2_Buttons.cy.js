//baseurl
const baseUrl = Cypress.config('baseUrl')

//generate random mandatory number
const randomNumber = 'M' + Math.floor(Math.random() * 1000000).toString().padStart(4, '0')

//generate random companyName
const randomWords = generateRandomWords(2)
        function generateRandomWords(numWords) {
            const words = ['Kilo', 'Mega', 'Giga', 'Tera', 'Peta', 'Exa', 'Zetta', 'Yotta', 'Bronto', 'Geopeta', 'Yottapeta', 'Zettabronto', 'Geoyotta', 'Brontobronto', 'Geobronto', 'Geogeo', 'Geobronto', 'Geoyotta']
            const randomIndexes = []
            while (randomIndexes.length < numWords) {
                const randomIndex = Math.floor(Math.random() * words.length)
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex)
                }
            }
            const randomWords = randomIndexes.map(index => words[index])
            return randomWords
        }
        const companyName = randomWords.join(' ') + ' Corp.'

beforeEach(() => {
    cy.login() //see cypress/support/Login.js
})

afterEach(() => {
    //cy.logout() //see cypress/support/Logout.js
})

describe('Dashboard-Buttons', () => {

    it('Check the existence of dashboard buttons', () => {
        //Excel-Export-Button
        cy.get('[href="/inquiries.xlsx"]')
            .should('have.text', 'Excel Export')

        //Partner importieren-Button
        cy.get('[href="/partners/new"]')
            .should('have.text', 'Partner importieren')

        //Partner auflisten-Button
        cy.get('[href="/partners"]')
            .should('have.text', 'Partner auflisten')
        
        cy.log('All buttons exist')
    })
    
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

    it('Partner auflisten', () => {
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

        //partner view button in first line
        cy.get('tbody > :nth-child(1) > :nth-child(3)')
            .click()
        cy.url(`${baseUrl}/partners/´`)
        cy.log('Partner view button works')
    })

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
        } else {
            cy.get('[data-partner-target="previouslyImported"]')
                .should('be.visible')
            cy.get('[href="/partners/´"]')
                .click()
            cy.url(`${baseUrl}/partners/´`)
        }

    })
})