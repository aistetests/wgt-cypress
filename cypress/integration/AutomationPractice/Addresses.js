// -- Start: Address Utils --

var user

function goToAddresses() {
    cy.visit('index.php?controller=addresses')
}

function setAddressData() {
    const address = {
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      addressLine1: "Gatvė X - 22",
      city: "Vilnius",
      state: "Florida",
      postCode: "22222",
      country: "United States",
      mobilePhone: "222222222",
      title: 'Address ' + new Date().toLocaleString()
    }
    return address
  }

  function addAddress(address) {
    cy.get('a[title="Add an address"]').click()

    // leave default name and company values
    // TODO: verify them
    cy.get('#address1').type(address.addressLine1)
    cy.get('#city').type(address.city)
    cy.get('#id_state').select(address.state)
    cy.get('#postcode').type(address.postCode)
    cy.get('#phone_mobile').type(address.mobilePhone)
    cy.get('#alias').clear().type(address.title)

    cy.get('#submitAddress').click()
  }

// -- End: Address Utils --

// -- Start: Tests --  

describe('User addresses', () => {

    beforeEach(function () {
        cy.visit('')
        cy.fixture('users.json').then((users) => {
          user = users[0]
          cy.login(user.email, user.password)
        })
    })

    it('should allow user add address under her account', () => {
        goToAddresses()

        const address = setAddressData()
        addAddress(address)

    })


})

// -- End: Tests --