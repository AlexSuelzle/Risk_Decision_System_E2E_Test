import { partnerlist } from '../../Setup'

const randomDecision = Cypress.env('randomDecision') //siehe cypress.config.json
const baseUrl = Cypress.config('baseUrl') //siehe cypress.json

beforeEach(() => {
    cy.login() //siehe cypress/support/Login.js
    partnerlist() //siehe cypress/e2e/Setup.js
})

afterEach(() => {
    cy.logout() //siehe cypress/support/Logout.js
})

describe('Create new inquiry', () => {

    it('Create new inquiry', () => {
        cy.contains('Neue Anfrage')
            .click()
        cy.get('.modal-content')
            .should('be.visible')
        cy.get('.modal-header')
            .should('contain', 'Neue Anfrage anlegen')

        //fill out form
        //select product type
        const randomProductType = getRandomItem(['Factoring', 'Finetrading', 'Leasing'])
        cy.get('#new-inquiry-product-type-select')
            .select(randomProductType)

        //fill out form for selected product type
        if (randomProductType === 'Factoring') {
            fillOutFactoringForm()
        } else if (randomProductType === 'Finetrading') {
            fillOutFinetradingForm()
        } else {
            fillOutLeasingForm()
        }

        //decision between save or cancel
        if (randomDecision) {
            cy.get('.modal-footer > .btn-primary')
                .should('contain', 'Anfrage anlegen')
                .click()
            cy.get('.modal-content')
                .should('not.be.visible')
            } else {
                cy.get('.btn-secondary')
                .should('contain', 'Abbrechen')
                .click()
                cy.url(`${baseUrl}/partners/´`)
            }
        })

    function fillOutFactoringForm() {
        cy.log('Factoring selected')
        const randomInquiryType = getRandomItem(['Neu', 'Prolongation', 'Erhöhung'])
        cy.get('#new-inquiry-inquiry-type-select')
            .select(randomInquiryType)

        if (randomInquiryType === 'Neu') {
            cy.log('Neu selected')
            fillOutNewInquiryForm()
            cy.get('#inquiry_inquiry_entry_attributes_factoring_type')
                .select(getRandomItem(['Offen / Echt', 'Offen / Unecht', 'Still / Echt', 'Still / Unecht']))
        } else if (randomInquiryType === 'Prolongation') {
            cy.log('Prolongation selected')
            fillOutProlongationForm()
        } else {
            cy.log('Erhöhung selected')
            fillOutIncreaseForm()
        }
    }

    function fillOutFinetradingForm() {
        cy.log('Finetrading selected')
        const randomInquiryType = getRandomItem(['Neu', 'Prolongation', 'Erhöhung'])
        cy.get('#new-inquiry-inquiry-type-select')
            .select(randomInquiryType)

        if (randomInquiryType === 'Neu') {
            cy.log('Neu selected')
            fillOutNewInquiryForm()
            cy.get('#inquiry_inquiry_entry_attributes_factoring_type')
                .select(getRandomItem(['Fertigprodukte', 'Hilfestoffe (Nebenbestandteil des Nebenproduktes)', 'Betriebsstoffe', 'Rohstoffe']))
        } else if (randomInquiryType === 'Prolongation') {
            cy.log('Prolongation selected')
            fillOutProlongationForm()
        } else {
            cy.log('Erhöhung selected')
            fillOutIncreaseForm()
        }
    }

    function fillOutLeasingForm() {
        cy.log('Leasing selected')
        const randomInquiryType = getRandomItem(['Neu', 'Prolongation', 'Erhöhung'])
        cy.get('#new-inquiry-inquiry-type-select')
            .select(randomInquiryType)

        if (randomInquiryType === 'Neu') {
            cy.log('Neu selected')
            fillOutNewInquiryForm()
            cy.get('#inquiry_inquiry_entry_attributes_contract_type')
                .select(getRandomItem(['MK', 'TA', 'VA']))
        } else if (randomInquiryType === 'Prolongation') {
            cy.log('Prolongation selected')
            fillOutProlongationForm()
        } else {
            cy.log('Erhöhung selected')
            fillOutIncreaseForm()
        }
    }

    function fillOutNewInquiryForm() {
        const randomAmount = getRandomNumber(100, 100000)
        cy.get('#new-inquiry-form-credit-line-input')
            .should('be.empty')
            .type(randomAmount.toString())

        if (randomProductType === 'Factoring') {
            const randomPercentage = getRandomNumber(1, 5)
            cy.get('#inquiry_inquiry_entry_attributes_security_deposit')
                .should('be.empty')
                .type(randomPercentage.toString())
        } else if (randomProductType === 'Finetrading') {
            const randomDays = getRandomNumber(10, 120)
            cy.get('#inquiry_inquiry_entry_attributes_financing_term')
                .should('be.empty')
                .type(randomDays.toString())
        } else {
            const randomDays = getRandomNumber(10, 120)
            cy.get('#inquiry_inquiry_entry_attributes_financing_term')
                .should('be.empty')
                .type(randomDays.toString())
        }
    }

    function fillOutProlongationForm() {
        const randomAmount = getRandomNumber(100, 100000)
        cy.get('#new-inquiry-form-credit-line-input')
            .should('be.empty')
            .type(randomAmount.toString())

        const randomDays = getRandomNumber(10, 120)
        cy.get('#inquiry_inquiry_entry_attributes_financing_term')
            .should('be.empty')
            .type(randomDays.toString())
    }

    function fillOutIncreaseForm() {
        const randomAmount = getRandomNumber(100, 100000)
        cy.get('#inquiry_inquiry_entry_attributes_financial_framework')
            .should('be.empty')
            .type(randomAmount.toString())
    }

    function getRandomItem(items) {
        return items[Math.floor(Math.random() * items.length)]
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
})
