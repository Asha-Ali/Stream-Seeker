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

    it("shows an error if non-logged user tries to access Your Profile page", () => {
        cy.visit("/users/1")

        cy.contains('Sorry, you need to be logged in to see your profile').should('exist')
    })

    it("shows updated information if user edits subscriptions", () => {
        cy.visit("/login");
        cy.get("#email").type(userEmail);
        cy.get("#password").type(userPassword);
        cy.get("#submit").click();

        cy.url().should("include", "/");

        cy.get("#profile").click();

        cy.get(".edit").click()
        cy.get("#subscriptions").type("Disney")

        cy.get(".save").click()

        cy.contains("Disney").should('exist')
    })
});



