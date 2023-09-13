describe('Streaming Info', () => { 
  it("Shows streaming links for chosen title", () => {
    cy.visit("/")

    cy.get('.search-button').type('Hercules')
    cy.get('.submit-search').click()

    cy.get('.streaming-link').first().click();

    cy.get('.streaming-links').should('be.visible')
  }) 

  it("clicking on provider logo redirects to provider homepage", () => {
    cy.visit("/")

    cy.get('.search-button').type('Hercules')
    cy.get('.submit-search').click()

    cy.get('.streaming-link').first().click();

    cy.get('.streaming-links').should('be.visible')

    cy.get('a').should('have.attr', 'target', '_blank');

    cy.get('.provider-link').first().click();
  }) 

  it("shows error if no streaming links found", () => {
    cy.visit("/")

    cy.get('.search-button').type('After party')
    cy.get('.submit-search').click()

    cy.get('.title').should('be.visible');

    cy.get('.streaming-link').first().click();

    cy.contains('Sorry this movie/show is not available in your region').should('exist');  
  })
})



