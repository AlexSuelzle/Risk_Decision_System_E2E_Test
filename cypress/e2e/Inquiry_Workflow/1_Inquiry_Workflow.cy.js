//import { inquiryview } from '../../Setup'

const baseUrl = Cypress.config('baseUrl') //siehe cypress.json

beforeEach(() => {
    cy.login() //siehe cypress/support/Login.js
    cy.wait(2000)
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
        //
        if (selectedSurety === 'Bürgschaft') {
            cy.get('#inquiry_inquiry_guarantees_attributes_0_natural_person_id')
                .select('Arthur Goldberg')
            cy.get('#inquiry_inquiry_guarantees_attributes_0_guarantee')
                .type(Math.floor(Math.random() * (100000 - 100 + 1)) + 100)
        } else if (selectedSurety === 'Grundschuld') {
            cy.get('#inquiry_land_charge')
                .type(Math.floor(Math.random() * (100000 - 100 + 1)) + 100)
        }

        //inquiry save button
        cy.get('input.btn')
            .should('contain', 'Anfrage speichern')
            .click();
        cy.get('.alert')
            .should('contain', 'Anfrage wurde aktualisiert.')
        cy.log('Inquiry save button works')


        //Jahresabschlüsse (financial statements)
        cy.contains('Jahresabschlüsse')
            .click()
        cy.url(`${baseUrl}/partners/´/inquiries/´/annual_accounts`)

        //add new annual account
        cy.get('.show > .btn')
            .should('contain', 'Jahresabschluss hinzufügen')
            .click()
        //select date
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        cy.get('.show > .row > :nth-child(1) > #annual_account_document_reception_date')
            .type(yesterday.toISOString().split('T')[0])
        //select months
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
        const randomMonth = Math.floor(Math.random() * 12)
        const selectedMonth = monthNames[randomMonth]
        cy.get('.show > .row > :nth-child(2) > #annual_account_from_month')
            .select(selectedMonth.toString())
        cy.get('.show > .row > :nth-child(4) > #annual_account_until_month')
            .select(selectedMonth.toString())
        //select years
        const currentYear = new Date().getFullYear()
        cy.get('.show > .row > :nth-child(3) > #annual_account_from_year')
            .clear()
            .type(currentYear)
        cy.get('.show > .row > :nth-child(5) > #annual_account_until_year')
            .clear()
            .type(currentYear)
        //GuV
        const randomValue = Math.floor(Math.random() * (100000 - 100 + 1)) + 100
        cy.get(':nth-child(6) > #annual_account_liabilities_GuV_1')
            .type(randomValue)
        //save new annual account
        cy.contains('Speichern')
            .click()
        cy.log('New annual account created')
        cy.contains('Löschen')
            .click()
        cy.log('New annual account deleted')


        //BWA
        cy.contains('BWA')
            .click()
        cy.url(`${baseUrl}/partners/´/inquiries/´/bussiness_statements`)

        //add new BWA
        cy.contains('BWA hinzufügen')
            .click()
        //select month
        cy.get('.show > .row > :nth-child(2) > #business_assessment_from_month')
            .select(selectedMonth.toString())
        cy.get('.show > .row > :nth-child(4) > #business_assessment_until_month')
            .select(selectedMonth.toString())
        //select years
        cy.get('.show > .row > :nth-child(3) > #business_assessment_from_year')
            .clear()
            .type(currentYear)
        cy.get('.show > .row > :nth-child(5) > #business_assessment_until_year')
            .clear()
            .type(currentYear)
        //Umsatzerlöse
        cy.get(':nth-child(4) > #business_assessment_liabilities_bwa_A')
            .type(randomValue)
        //save new BWA
        cy.get('.show > .text-center > .btn-primary')
            .should('contain', 'Speichern')
            .click()
        cy.log('New BWA created')
        //delete BWA
        cy.get('[title="Löschen"]')
            .first()
            .click()
        cy.log('New BWA deleted')
    })
})