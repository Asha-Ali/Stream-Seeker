describe("Homepage", () => {
  it("allows you to enter a title, search for results and see results listed", () => {
    cy.visit("/");

    cy.get(".search-button").type("Hercules");
    cy.get("button:contains('Search')").click(); 

    cy.get("h2:contains('Search Results')").should("be.visible");

    cy.get("h2:contains('Search Results')")
      .next() 
      .should("not.be.empty");
  });

  it("allows you to click streaming links and view streaming options", () => {
    cy.visit("/"); 

    cy.get(".search-button").type("Hercules");
    cy.get("button:contains('Search')").click();

    cy.get("h2:contains('Search Results')").should("be.visible");

    cy.get("a:contains('Click here for Streaming Links')")
      .first()
      .click();

    cy.get("h1:contains('Streaming Options')").should("be.visible");

    cy.get(".provider-logo").should("be.visible");

    cy.contains("Click on your chosen streaming provider to start watching! Enjoy!").should("be.visible");
  });

  it("shows error if non logged in user tries to add to watch later", () => {
    cy.visit("/");

    cy.get(".search-button").type("Hercules");
    cy.get("button:contains('Search')").click(); 

    cy.get("h2:contains('Search Results')").should("be.visible");

    cy.get("button:contains('Add to Watch Later')")
      .first()
      .click();

    cy.contains('Please log in or sign up to add movies to your watch later list.').should('be.visible')
  })

  it("shows error if no results found", () => {
    cy.visit("/");

    cy.get(".search-button").type("jhkhkjhkjs");
    cy.get("button:contains('Search')").click(); 

    cy.contains("Sorry, we didn't find anything matching that").should('be.visible')
  })

  it("search results stay if you navigate to another page and back", () => {
    cy.visit("/");

    cy.get(".search-button").type("Hercules");
    cy.get("button:contains('Search')").click(); 

    cy.get("h2:contains('Search Results')").should("be.visible");

    cy.get("#login").click();

    cy.get("#home")
      .should("be.visible")
      .click();

    cy.get("h2:contains('Search Results')")
      .next() 
      .should("not.be.empty");
  });

  it("search results get removed if browser refreshed", () => {
    cy.visit("/");

    cy.get(".search-button").type("Hercules");
    cy.get("button:contains('Search')").click(); 

    cy.get("h2:contains('Search Results')").should("be.visible");

    cy.reload()

    cy.contains('Search Results').should("not.exist");
  }); 

});

