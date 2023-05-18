import { slowCypressDown } from 'cypress-slow-down'

slowCypressDown(5000)
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
