//baseurl
const baseUrl = Cypress.config('baseUrl')

//generate random mandatory number
const randomNumber = 'M' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')

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

    it('Excel-Export', () => {
        //Excel-Exports-Button
        cy.get('[href="/inquiries.xlsx"]')
            .should('have.text', 'Excel Export')
            .click()
            
        const today = new Date().toLocaleDateString('en-GB').split('/').join('.')
        const filePath = `C:/Users/AlexanderSülzle¦aifi/Desktop/Risk_Decision_System/cypress/downloads/Anfragen bis ${today}.xlsx`

        cy.readFile(filePath)
            .should('exist')
    })
    
    it('Partner importieren', () => {
        //Partner importieren-Button
        cy.get('[href="/partners/new"]')
            .should('contain', 'Partner importieren')
            .click()
        cy.url(`${baseUrl}/partners/new`)

        //type mandatory number
        cy.get('[name="external_id"]')
            .should('not.have.value')
            .type(randomNumber)
        
        //type company name
        cy.get('[name="name"]')
            .should('not.have.value')
            .type(companyName)
        
        //select company type
        const randomIndex = Math.floor(Math.random() * 8) + 1
        cy.get(`:nth-child(3) > .col-sm-9 > :nth-child(${randomIndex})`) //lines of company types randomly selected
            .find('.form-check-input')
            .click()
            //if randomIndex is 8 ("Sonstiges"), then add text
            .then(() => { 
            if (randomIndex === 8) {
                cy.get('[name="company_type_addition"]')
                    .type('Unternehmensform X')
            }
        })
        
        //select contract branch
        const randomCheckboxIndex = Math.floor(Math.random() * 2) + 1
        cy.get(`:nth-child(4) > .col-sm-9 > :nth-child(${randomCheckboxIndex})`)
            .find('.form-check-input')
            .click()

        //Save-Button
        cy.get('[data-react-class="forms/PartnerForm"] > form > [type="submit"]')
            .should('contain', 'Speichern')
            .click()
        cy.url(`${baseUrl}/partners/´`)
    })

    it('Partner auflisten', () => {
        cy.get('[href="/partners"]')
            .should('contain', 'Partner auflisten')
            .click()
        cy.url(`${baseUrl}/partners`)
        
        // Search for companyName and randomNumber
        cy.contains(companyName)
            .should('exist')
            .parent()
            .find(`td:contains('${randomNumber}')`)
            .siblings('td')
            .find('a')
            .first()
            .click()
        cy.url(`${baseUrl}/partners/´`)

        //back to previous page
        cy.go('back')
        cy.contains(companyName)
            .should('exist')
            .parent()
            .find(`td:contains('${randomNumber}')`)
            .siblings('td')
            .find('a')
            .eq(1)
            .contains('Edit')
            .click()
        cy.url(`${baseUrl}/partners/´/edit`)
        
    })
})