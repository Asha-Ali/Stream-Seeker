
describe("Navbar", () => {
  it("does not show User Profile link, if not logged in", () => {
    cy.visit("/")

    cy.contains("Your Profile").should("not.exist");
  })

  it("shows Your Profile and Watch Later if user logged in", () => {
    cy.visit("/login")

    cy.get("#email").type("amina@email.com");
    cy.get("#password").type("amina");

    cy.get("#submit").click();

    cy.contains("Your Profile").should("exist");
    cy.contains("Watch Later").should("exist");
  })

  it("redirects you login page if you click on login", () => {
    cy.visit("/")

    cy.get("#login").click();

    cy.url().should("include", "/login"); 
  })

  it("redirects you signup page if you click on signup", () => {
    cy.visit("/")

    cy.get("#signup").click();

    cy.url().should("include", "/signup"); 
  })

  it("takes you to Your Profile if logged in user clicks Your Profile link", () => {
    cy.visit("/login")

    cy.get("#email").type("amina@email.com");
    cy.get("#password").type("amina");

    cy.get("#submit").click();

    cy.get("#profile").click();

    cy.get(".email[data-cy=email]").should("contain", "amina@email.com");
  })

  it("takes you to Watch Later if logged in user clicks Watch Later link", () => {
    cy.visit("/login")

    cy.get("#email").type("amina@email.com");
    cy.get("#password").type("amina");

    cy.get("#submit").click();

    cy.get("#watch-later").click();

    cy.get(".heading").should("be.visible");
  })

  it("takes you to '/' if you click logout and Your Profile is no longer visible", () => {
    cy.visit("/login")

    cy.get("#email").type("amina@email.com");
    cy.get("#password").type("amina");

    cy.get("#submit").click();

    cy.get("#logout").click();

    cy.url().should("include", "/"); 
    cy.contains("Your Profile").should("not.exist");
  })
})



