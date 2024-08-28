//import { inquiryview } from '../../Setup'

const baseUrl = Cypress.config('baseUrl') //siehe cypress.json

beforeEach(() => {
    cy.login() //siehe cypress/support/Login.js
    //inquiryview() //see cypress/e2e/Setup.js
})

afterEach(() => {
    //cy.logout() //siehe cypress/support/Logout.js
})

describe('Inquiry Workflow', () => {

    it('Workflow Inquiry', () => {
        //Trigger the view action
        cy.get('.card-body')
            .find('[title="Anfrage anzeigen"]')
            .first()
            .click()
        cy.wait(2000)
        cy.url(`${baseUrl}/partners/´/inquiries/´`)
        cy.log('Inquiry view button works')

        //Inquiry
        //Inquiry sureties
        const randomSurety = ['Bürgschaft', 'Grundschuld', 'Quersicherung', 'Garantieerklärung']
        const randomIndex = Math.floor(Math.random() * randomSurety.length)
        const selectedSurety = randomSurety[randomIndex]
        cy.get('#new-inquiry-surety-select')
            .select(selectedSurety)
        
        if (selectedSurety === 'Bürgschaft') {
            cy.get('#inquiry_inquiry_guarantees_attributes_0_natural_person_id')
                .select('Arthur Goldberg');
            cy.get('#inquiry_inquiry_guarantees_attributes_0_guarantee')
                .type(Math.floor(Math.random() * (100000 - 100 + 1)) + 100);
        } else if (selectedSurety === 'Grundschuld') {
            cy.get('#inquiry_land_charge')
                .type(Math.floor(Math.random() * (100000 - 100 + 1)) + 100);
        }

        //inquiry save button
        cy.get('input.btn')
            .should('contain', 'Anfrage speichern')
            .click();
        cy.get('.alert')
            .should('contain', 'Anfrage wurde aktualisiert.')
        cy.log('Inquiry save button works')

        //Jahresabschlüsse (financial statements)
        cy.get('[href="/partners/*/inquiries/*/annual_accounts"]')
            .click()
        cy.url(`${baseUrl}/partners/*/inquiries/*/annual_accounts`)
        cy.get('.show > .btn')
            .should('contain', 'Jahresabschluss hinzufügen')
            .click()
        //select date
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        cy.get('.show > .row > :nth-child(1) > #annual_account_document_reception_date')
            .type(yesterday.toISOString().split('T')[0])
        //select months
        const randomMonth = Math.floor(Math.random() * 12) + 1
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
        const selectedMonth = monthNames[randomMonth - 1]
        cy.get('.show > .row > :nth-child(2) > #annual_account_from_month')
            .select(selectedMonth)
        cy.get('.show > .row > :nth-child(4) > #annual_account_until_month')
            .select(selectedMonth + 1)
        //select years
        const currentYear = new Date().getFullYear()
        cy.get('.show > .row > :nth-child(3) > #annual_account_from_year')
            .clear()
            .type(currentYear)
        cy.get('.show > .row > :nth-child(5) > #annual_account_until_year')
            .clear()
            .type(currentYear)
        //GuV
        const randomValue1 = Math.floor(Math.random() * (100000 - 100 + 1)) + 100
        const randomValue2 = Math.floor(Math.random() * (100000 - 100 + 1)) + 100
        cy.get(':nth-child(6) > #annual_account_liabilities_GuV_1')
            .type(randomValue1)
        cy.get(':nth-child(10) > .form-control > .js-ja-calculate-target')
            .should('contain', randomValue1)
        cy.get(':nth-child(11) > #annual_account_liabilities_GuV_5')
            .type(randomValue2)
        cy.get(':nth-child(15) > .form-control > .js-ja-calculate-target')
            .should('contain', randomValue1 + randomValue2)
        //save new annual account
        cy.get('.show > .text-center > .btn-primary')
            .should('contain', 'Speichern')
            .click()
    })
})