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

  describe('Drag & Drop', () => {
    const moveX = (id, x, y) => {
      cy.get('@events').find(`#${id}`)
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: x})
        .trigger('mouseup', {force: true})
    }
    const verifyDate = (id, date) => {
      cy.get('@grid')
        .find(`[data-test="grid-column"][data-test-date="${date}"]`)
        .find(`[data-test="event"][id="${id}"]`)
    }
    beforeEach(() => {
      cy.get('[data-test="drag-item"]').as('events')
      cy.get('[data-test="timeline-grid"]').as('grid')

    })
    it('Should move events', () => {
      verifyDate(2, 'Jan 2')
      moveX(2, 1000)
      verifyDate(2, 'Jan 7')

      verifyDate(5, 'Feb 1')
      moveX(5, -1000)
      verifyDate(5, 'Jan 15')

      verifyDate(9, 'Jan 4')
      moveX(9, -100)
      verifyDate(9, 'Jan 1')
    })
  })
})
