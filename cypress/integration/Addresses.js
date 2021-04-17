// -- Start: Address Utils --

function goToAddresses() {
  cy.visit('index.php?controller=addresses')
}

// -- End: Address Utils --

// -- Start: Tests --

describe('User addresses', () => {

    beforeEach(function () {
      cy.visit('')
      cy.fixture('users.json').then((users) => {
        const user = users[0]
        cy.login(user.email, user.password)
      })
    })

    it('should allow user add address under her account', () => {
      goToAddresses()

    })


  })

  // -- End: Tests --