describe("WatchLater Page", () => {
    it("should display 'No movies in watch later.' when no movies exist", () => {
        cy.intercept("GET", "/users/*/watch-later", {
            statusCode: 200,
            body: { watchLater: [] },
        });
    
        cy.request("/users/64e47558a12b1d6b91c90740/watch-later"); 
    
        cy.get("h2").should("contain", "Movies in Watch Later");
        cy.get(".poster-image").should("not.exist");
        cy.get("p:contains('No movies in watch later.')").should("be.visible");
        });
    
});