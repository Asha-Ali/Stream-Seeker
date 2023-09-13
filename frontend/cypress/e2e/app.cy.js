// On load, directs to "/"

describe("App", () => {
  it("loads the homepage on load", () => {
    cy.visit('/')

    cy.get("h1:contains('Search for a Movie or TV show')").should("be.visible");
  })
})