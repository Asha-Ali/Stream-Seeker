describe("WatchLater Page", () => {
  it("should display 'No movies in watch later.' when no movies exist", () => {
    cy.visit("/login");
    cy.get("#email").type("test2@email.com");
    cy.get("#password").type("test2");
    cy.get("#submit").click();

    cy.get("#watch-later").click();

    cy.get(".heading").should("contain", "Your Watch Later List");
    cy.get(".poster-image").should("not.exist");
    cy.get(
      "p:contains('Nothing in watch later list. Search and add something')"
    ).should("be.visible");
  });

  it("shows logged in users saved movie or TV show", () => {
    cy.visit("/login");

    cy.visit("/login");
    cy.get("#email").type("test@email.com");
    cy.get("#password").type("test");
    cy.get("#submit").click();

    cy.get("#watch-later").click();

    cy.get(".title").should("be.visible");
  });

  it("removes movie from list if remove button clicked", () => {
    cy.visit("/login");
    cy.get("#email").type("test@email.com");
    cy.get("#password").type("test");
    cy.get("#submit").click();

    cy.get(".search-button").type("Soul");
    cy.get("button:contains('Search')").click();

    cy.get(".add").first().click();

    cy.get("#watch-later").click();

    cy.get(".remove").eq(1).click();

    cy.contains("Soul").should("not.exist");
  });

  it("redirects you to the streaming links when link clicked", () => {
    cy.visit("/login");
    cy.get("#email").type("test@email.com");
    cy.get("#password").type("test");
    cy.get("#submit").click();

    cy.get("#watch-later").click();

    cy.get(".streaming-link").first().click();

    cy.url().should("include", "/streaming-info");
  });
});
