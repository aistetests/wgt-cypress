describe('Automation Practice Login', () => {

    beforeEach(() => {
      cy.visit('')
      cy.get('a[class="login"]').click()
    })

    it('has correct login form title', () => {
      cy.get('h1').should('have.text', 'Authentication')
    })

    it('allows log in with correct username and password', () => {
      cy.get('#email').type('demo@automate.it')
      cy.get('#passwd').type('Demo2021')
      cy.get('#SubmitLogin').click()
  
      cy.url().should('include', 'my-account')
    })

  })