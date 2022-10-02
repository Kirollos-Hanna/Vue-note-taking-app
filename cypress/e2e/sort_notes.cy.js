describe('Sort Notes Table', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/')
    })
    
    it('Sort by ID', () => {
        cy.get('[data-cy="sort-id"]').click()
        cy.get('[data-cy="sort-id"]').get('div.sorted-up-arrow').should('exist')
    })
    
    it('Sort by Title', () => {
        cy.get('[data-cy="sort-title"]').click()
        cy.get('[data-cy="sort-title"]').get('div.sorted-up-arrow').should('exist')
        cy.get('.body-row').then((rows) => {
            cy.get(rows[0]).contains('delectus aut autem').should('exist')
            cy.get(rows[1]).contains('fugiat veniam minus').should('exist')
            cy.get(rows[2]).contains('quis ut nam facilis et officia qui').should('exist')
        })
    })

    it('Sort by Status', () => {
        cy.get('[data-cy="sort-status"]').click()
        cy.get('[data-cy="sort-status"]').get('div.sorted-up-arrow').should('exist')
        cy.get('.body-row').then((rows) => {
            cy.get(rows[0]).contains('Completed').should('exist')
            cy.get(rows[1]).contains('New').should('exist')
            cy.get(rows[2]).contains('Not completed').should('exist')
        })
    })
})