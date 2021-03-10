const {
  adminUrl,
  user: { email, password },
  credentials: { host, apiKey }
} = Cypress.env()

describe('Strapi Login flow', () => {
  it('visit the Strapi admin panel', () => {
    cy.visit(adminUrl)
    cy.get('form', { timeout: 10000 }).should('be.visible')
  })

  it('Fill the login form', () => {
    cy.get('input[name="email"]').type(email).should('have.value', email)
    cy.get('input[name="password"]').type(password).should('have.value', password)
    cy.get('button[type="submit"]').click()
  })

  it('Enter the MeiliSearch plugin Home Page', () => {
    cy.contains('MeiliSearch', { timeout: 10000 }).click()
    cy.url().should('include', '/plugins/meilisearch')
  })

  it('Credentials should be displayed', () => {
    cy.get('input[name="MSHost"]').type(email).should('have.value', host)
    cy.get('input[name="MSApiKey"]').type(email).should('have.value', apiKey)
  })

  it('Collections should be displayed', () => {
    cy.contains('category', { timeout: 10000 })
    cy.contains('restaurant', { timeout: 10000 })
  })

  // @todo add [ CREATE | EDIT | DELETE ] tests
})
