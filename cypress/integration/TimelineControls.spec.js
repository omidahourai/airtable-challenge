context('TimelineControls', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
  })

  describe('Zoom', () => {
    beforeEach(() => {
      cy.get('[data-test="zoom-out"]').as('zoomOut')
      cy.get('[data-test="zoom-in"]').as('zoomIn')
      cy.get('[data-test="timeline-grid"]').as('grid')
      cy.get('[data-test="col-header"]').as('header')
    })
    it('Should have default column width 100px and padding [4px 10px]', () => {
      cy.get('@grid').should('have.css', 'grid-gap', '4px 10px')
      cy.get('@header').first().should('have.css', 'width', '80px')
    })
    it('Should zoom-in', () => {
      cy.get('@zoomIn').click()
      cy.get('@header').first().should('have.css', 'width', '105px')
      cy.get('@zoomIn').click()
      cy.get('@header').first().should('have.css', 'width', '130px')
      cy.get('@zoomIn').click()
      cy.get('@header').first().should('have.css', 'width', '155px')
    })
    it('Should zoom-out', () => {
      cy.get('@zoomOut').click()
      cy.get('@header').first().should('have.css', 'width', '130px')
      cy.get('@zoomOut').click()
      cy.get('@header').first().should('have.css', 'width', '105px')
      cy.get('@zoomOut').click()
      cy.get('@header').first().should('have.css', 'width', '80px')
      cy.get('@zoomOut').click()
      cy.get('@header').first().should('have.css', 'width', '55px')
      cy.get('@zoomOut').click()
      cy.get('@header').first().should('have.css', 'width', '30px')
    })
  })
})
