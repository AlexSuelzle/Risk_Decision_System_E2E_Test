import { partnerlist } from '../../Setup'

const randomDecision = Cypress.env('randomDecision')

beforeEach(() => {
    cy.login() //see cypress/support/Login.js
    partnerlist() //see cypress/e2e/Setup.js
})

afterEach(() => {
    //cy.logout() //see cypress/support/Logout.js
})

describe('Partnerlist', () => {

    it('Create new inquiry', () => {
        cy.get(':nth-child(5) > .card-header > .card-title')
            .should('contain', 'Anfragen')
            .find('.btn', 'Neue Anfrage')
            .click()
        cy.get('.modal-content')
            .should('be.visible')
        cy.get('.modal-header')
            .should('contain', 'Neue Anfrage anlegen')
        
        //fill out form
        //select product type
        const randomProductType = getRandomProductType()
            function getRandomProductType() {
                const productTypes = ['Factoring', 'Finetrading', 'Leasing']
                return productTypes[Math.floor(Math.random() * productTypes.length)]
            }
        cy.get('#new-inquiry-product-type-select')
            .select(randomProductType)
        
        //fill out form for selected product type
        if (randomProductType === 'Factoring') {
            cy.log('Factoring selected')
            //fill out form for factoring
            //select inquiry type
            const randomInquiryType = getRandomInquiryType()
            function getRandomInquiryType() {
                const inquiryTypes = ['Neu', 'Prolongation', 'Erhöhung']
                return inquiryTypes[Math.floor(Math.random() * inquiryTypes.length)]
            }            
            cy.get('#new-inquiry-inquiry-type-select')
                .select(randomInquiryType)
            //fill out form for selected inquiry type
            if (randomInquiryType === 'Neu') {
                cy.log('Neu selected')
                //fill out form for new inquiry
                //Ankaufsrahmen
                const randomAmount = Math.floor(Math.random() * (100000 - 100 + 1)) + 100
                cy.get('#new-inquiry-form-credit-line-input')
                    .should('be.empty')
                    .type(randomAmount.toString())

                //Sicherheitseinbehalt
                const randomPercentage = Math.floor(Math.random() * (5 - 1 + 1)) + 1
                cy.get('#inquiry_inquiry_entry_attributes_security_deposit')
                    .should('be.empty')
                    .type(randomPercentage.toString())

                //Factoring type
                const randomFactoringType = getRandomFactoringType()
                function getRandomFactoringType() {
                    const factoringTypes = ['Offen / Echt', 'Offen / Unecht', 'Still / Echt', 'Still / Unecht']
                    return factoringTypes[Math.floor(Math.random() * inquiryTypes.length)]
                }            
                cy.get('#inquiry_inquiry_entry_attributes_factoring_type')
                    .select(randomFactoringType)
                cy.wait(500)

                //decision between save or cancel
                if (randomDecision) {
                    cy.get('.modal-footer > .btn-primary')
                        .should('contain', 'Anfrage anlegen')
                        .click()
                    cy.get('.modal-content')
                        .should('not.be.visible')
                    cy.url(`${baseUrl}/partners/´`)
                } else {
                    cy.get('.btn-secondary')
                        .should('contain', 'Abbrechen')
                        .click()
                    cy.url(`${baseUrl}/partners/´`)
                }

            } else if (randomInquiryType === 'Prolongation') {
                cy.log('Prolongation selected')
                //fill out form for prolongation

            } else {
                cy.log('Erhöhung selected')
                //fill out form for increase

            }


        } else if (randomProductType === 'Finetrading') {
            cy.log('Finetrading selected')



        } else {
            cy.log('Leasing selected')
        }
    })
})