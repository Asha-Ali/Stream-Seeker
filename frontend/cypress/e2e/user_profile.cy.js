describe("User Profile", () => {
    const userEmail = "test@email.com";
    const userPassword = "test";

    it("displays user email on profile page after login, and clicking on Your Profile", () => {

        cy.visit("/login");
        cy.get("#email").type(userEmail);
        cy.get("#password").type(userPassword);
        cy.get("#submit").click();

        cy.url().should("include", "/");

        cy.get("#profile").click();

        cy.get(".email[data-cy=email]").should("contain", userEmail);
    });
});

// Editing user profile