describe("Login", () => {
  it("logs in and redirects to the homepage", () => {
    cy.visit("/login");

    cy.get("#email").type("amina@email.com");
    cy.get("#password").type("amina");

    cy.get("#submit").click();

    cy.url().should("include", "/"); 
  });

  it("Shows an error if login details are incorrect", () => {
    cy.visit("/login");

    cy.get("#email").type("mina@email.com");
    cy.get("#password").type("amina");

    cy.get("#submit").click();

    cy.get(".error").should("be.visible");
  })

  it("redirects to sign up if user clicks Sign Up", () => {
    cy.visit("/login");
    cy.wait(1000)
    
    cy.get("#signup").click();

    cy.url().should("include", "/signup"); 
  })

});





