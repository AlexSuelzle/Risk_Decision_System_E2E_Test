import { partnerlist } from '../../Setup';

beforeEach(() => {
    cy.login() //see cypress/support/Login.js
})

afterEach(() => {
    cy.logout() //see cypress/support/Logout.js
})

describe('Partnerlist', () => {

    it('Partner auflisten', () => {
        partnerlist() //see cypress/e2e/Setup.js
    })
})