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

function verifyAddressListIsShown() {
    cy.get('h1').should('have.text', 'My addresses')
}

function verifyNewAddressIsInList(title) {
    cy.contains('h3', title).should('be.visible')
}

function verifyAddressDetails(address) {
    cy.contains(address.title)
    .parents('ul')
    .within(() => {
      cy.get('.address_name').eq(0).should('contain.text', address.firstName)
      cy.get('.address_name').eq(1).should('contain.text', address.lastName)
      cy.get('.address_company').should('contain.text', address.company)
      cy.get('.address_address1').should('contain.text', address.addressLine1)
      cy.get('li').eq(4).find('span').eq(0).should('contain.text', address.city)
      cy.get('li').eq(4).find('span').eq(1).should('contain.text', address.state)
      cy.get('li').eq(4).find('span').eq(2).should('contain.text', address.postCode)
      cy.get('li').eq(5).find('span').should('contain.text', address.country)  
      cy.get('.address_phone_mobile').should('contain.text', address.mobilePhone)  
    })
}

function getAddresses() {
    return cy.get('h3.page-subheading')
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

        getAddresses().then($addressesBefore => {
            const initialCount = $addressesBefore.length

            const address = setAddressData()
            addAddress(address)

            verifyAddressListIsShown()
            verifyNewAddressIsInList(address.title)
            verifyAddressDetails(address)
            getAddresses().then($addressesAfter => {
              expect($addressesAfter.length).to.be.greaterThan(initialCount)
            })
        })
    })

})

// -- End: Tests --