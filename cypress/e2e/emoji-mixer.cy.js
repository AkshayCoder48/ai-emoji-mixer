// Test suite for emoji mixing functionality
describe('Emoji Mixer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should allow user to mix two emojis and generate an image', () => {
    // Use data-cy selectors defined in React components
    cy.get('[data-cy="emoji-input-1"]').type('😀')
    cy.get('[data-cy="emoji-input-2"]').type('🐱')
    cy.get('[data-cy="description-input"]').type('A hybrid creature with cat ears and a smiling face')
    cy.get('[data-cy="mix-button"]').click()

    // Wait for the API call and check for result image
    cy.get('[data-cy="result-image"]', { timeout: 10000 }).should('be.visible')
    cy.get('[data-cy="result-image"]').should('have.attr', 'src').and('not.be.empty')
  })

  it('should show loading state while generating', () => {
    cy.get('[data-cy="emoji-input-1"]').type('🚀')
    cy.get('[data-cy="emoji-input-2"]').type('🌸')
    cy.get('[data-cy="description-input"]').type('Space flower')
    cy.get('[data-cy="mix-button"]').click()

    // Check loading indicator appears
    cy.get('[data-cy="loading-spinner"]').should('be.visible')

    // Wait for result
    cy.get('[data-cy="result-image"]', { timeout: 15000 }).should('be.visible')
    cy.get('[data-cy="loading-spinner"]').should('not.exist')
  })
})