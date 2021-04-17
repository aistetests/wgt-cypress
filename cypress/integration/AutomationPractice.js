describe('Automation Practice Login', () => {

    beforeEach(() => {
      cy.visit('')
      cy.get('a[class="login"]').click()
    })

    it('has correct login form title', () => {
      cy.get('h1').should('have.text', 'Authentication')
    })

    it('allows log in with correct username and password', () => {
      cy.get('#email').type('aiste@wgt.com')
      cy.get('#passwd').type('WomenGoTech')
      cy.get('#SubmitLogin').click()
  
      cy.url().should('include', 'my-account')
    })

  })