describe('Responsive Design', () => {
  const breakpoints = [
    { name: 'mobile', width: 320, height: 568 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 }
  ]

  breakpoints.forEach(breakpoint => {
    it(`should look correct on ${breakpoint.name}`, () => {
      cy.viewport(breakpoint.width, breakpoint.height)
      cy.visit('/')

      // Basic checks: inputs and button are visible and not overlapping
      cy.get('[data-cy="emoji-input-1"]').should('be.visible')
      cy.get('[data-cy="emoji-input-2"]').should('be.visible')
      cy.get('[data-cy="description-input"]').should('be.visible')
      cy.get('[data-cy="mix-button"]').should('be.visible')
    })
  })
})