Cypress.Commands.overwrite('type', (originalFn, subject, str, options) => { 
  if (str !== '') {
    return originalFn(subject, str, options)
  }
  return subject
})

Cypress.Commands.add('login', (username, password) => {
    cy.get('a[class="login"]').click()
    cy.get('#email').type(username)
    cy.get('#passwd').type(password)
    cy.get('#SubmitLogin').click()
  })