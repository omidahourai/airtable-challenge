context('TimelineGrid', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
  })

  describe('Headers', () => {
    beforeEach(() => {
      cy.get('[data-test="col-header"]', ).as('headers')
    })
    it('Should show correct date range', () => {
      cy.get('@headers').should('have.length', 47)
      cy.get('@headers').first().should('contain', 'Jan 1')
      cy.get('@headers').last().should('contain', 'Feb 16')
    })
  })

  describe('Events', () => {
    beforeEach(() => {
      cy.get('[data-test="event"]').as('events')
    })
    it('Should all be visible', () => {
      cy.get('@events').should('have.length', 14)
      cy.get('@events').each(event => {
        cy.wrap(event).should('have.css', 'display', 'flex')
      })
    })
    it('Should have text and input', () => {
      cy.get('@events').each(event => {
        cy.wrap(event).find('p')
        cy.wrap(event).find('input')
      })
    })
    it('Should show correct text', () => {
      cy.get('@events').eq(0).should('contain', 'First item')
    })
    it('Should show with correct date span', () => {
      cy.get('@events').eq(0).should('have.css', 'width', '430px')
      cy.get('@events').eq(4).should('have.css', 'width', '760px')
      cy.get('@events').eq(7).should('have.css', 'width', '3840px')
      cy.get('@events').eq(10).should('have.css', 'width', '100px')
    })
  })
})
