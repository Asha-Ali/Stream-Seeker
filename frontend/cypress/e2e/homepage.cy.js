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
});

// describe("Homepage and Streaming Info", () => {
//   it("allows you to click streaming links and view streaming options", () => {
//     cy.visit("/"); 

//     cy.get(".search-button").type("Hercules");
//     cy.get("button:contains('Search')").click();

//     cy.get("h2:contains('Search Results')").should("be.visible");

//     cy.get("a:contains('Click here for Streaming Links')")
//       .first()
//       .click();

//     cy.get("h1:contains('Streaming Options')").should("be.visible");

//     cy.get(".provider-logo").should("be.visible");

//     cy.contains("Click on your chosen streaming provider to start watching! Enjoy!").should("be.visible");
//   });
// });

// Searches for a title, clicks on add to watch later but gets error because not logged in

// Searches for title, and if no results you see error message

// Search for a result, going to another page, and coming back, shows last search results

// Search for a result, going to another page, and coming back, shows last search results
// and if browser refreshed the search results go 
