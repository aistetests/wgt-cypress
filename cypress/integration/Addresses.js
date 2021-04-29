// -- Start: Address Utils --

function goToAddresses() {
  cy.visit('index.php?controller=addresses')
}

function addAddress(title) {
  cy.get('a[title="Add an address"]').click()
  // leave default name and company values
  cy.get('#address1').type('Gatvė X - 22')
  cy.get('#city').type('Vilnius')
  cy.get('#id_state').select('Florida')
  cy.get('#postcode').type('22222')
  cy.get('#phone_mobile').type('222222222')
  cy.get('#alias').clear()
  cy.get('#alias').type(title)
  cy.get('#submitAddress').click()
}

function verifyAddressListIsShown() {
  cy.get('h1').should('have.text', 'My addresses')
}

function verifyNewAddressIsInList(title) {
  cy.contains('h3', title).should('be.visible')
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
      const addressTitle = 'Title ' + new Date().toLocaleString()

      goToAddresses()
      addAddress(addressTitle)
      verifyAddressListIsShown()
      verifyNewAddressIsInList(addressTitle)
      //verifyNewAddressDetails()
      // verify that address count got bigger than before
    })


  })

  // -- End: Tests --