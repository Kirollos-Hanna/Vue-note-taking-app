describe('Delete Notes', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/')
    })
    it('Delete one note', () => {
        cy.contains('delectus aut autem').should('exist')
        cy.get('[data-cy="checkbox-1"]').click()
        cy.contains('Do you want to delete this note?').should('exist')
        cy.get('[data-cy="yes-delete"]').click()
        cy.contains('delectus aut autem').should('not.exist')
    })
    
    it('Delete two notes', () => {
        cy.contains('delectus aut autem').should('exist')
        cy.contains('fugiat veniam minus').should('exist')
        cy.get('[data-cy="checkbox-1"]').click()
        cy.get('[data-cy="checkbox-3"]').click()
        cy.contains('Do you want to delete this note?').should('exist')
        cy.get('[data-cy="yes-delete"]').click()
        cy.contains('delectus aut autem').should('not.exist')
        cy.contains('fugiat veniam minus').should('not.exist')
    })
    
    it('Delete all notes', () => {
        cy.contains('delectus aut autem').should('exist')
        cy.contains('fugiat veniam minus').should('exist')
        cy.contains('quis ut nam facilis et officia qui').should('exist')
        cy.get('[data-cy="checkbox-main"]').click()
        cy.contains('Do you want to delete this note?').should('exist')
        cy.get('[data-cy="yes-delete"]').click()
        cy.contains('delectus aut autem').should('not.exist')
        cy.contains('fugiat veniam minus').should('not.exist')
        cy.contains('quis ut nam facilis et officia qui').should('not.exist')
    })
})