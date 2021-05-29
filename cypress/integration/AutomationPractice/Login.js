describe('Automation Practice Login', () => {

    it('has correct login form title', () => {
        cy.visit('http://automationpractice.com')
        cy.get('a[class="login"]').click()
        cy.get('h1').should('have.text', 'Authentication')
    })

})