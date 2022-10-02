describe('Create a Note', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/')
    })
    it('Fail validation', () => {
        cy.contains('Add').click()
        cy.get('[data-cy="submit"]').click()
        cy.contains('Missing Title')
        cy.contains('Missing Content')
        cy.get('[data-cy="cancel"]').click()
        cy.contains('Title')
    })
    it('Add note', () => {
        cy.contains('Total')
        cy.contains('Add').click()
        cy.contains('Add note')
        cy.get('input[type="text"]').type('Dummy Title')
        cy.get('textarea').type('Dummy content')
        cy.get('[data-cy="submit"]').click()
        cy.contains('Dummy Title')
    })
})