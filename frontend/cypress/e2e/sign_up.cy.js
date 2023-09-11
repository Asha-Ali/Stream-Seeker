describe("Signing up", () => {
  it("with valid credentials, redirects to '/'", () => {
    cy.visit("/signup");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    cy.url().should("include", "/");
  });

  it("with missing password, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#signup").click();

    cy.url().should("include", "/signup");
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    cy.url().should("include", "/signup");
  });
});