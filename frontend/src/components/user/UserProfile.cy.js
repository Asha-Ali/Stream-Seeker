import { MemoryRouter, Route, Routes} from "react-router"
import UserProfile from "./UserProfile"
import React from "react"


describe("User information page", () => {

	it("calls the users/userID endpoint and lists the users info", () => {
    window.localStorage.setItem("token", "fakeToken")

    cy.intercept('GET', '/users/1', { 
        email: "testEmail", 
        name: "testUserName", 
        subscriptions: ['Netflix'], 
        token: 'fakeToken' 
        }).as('getUserInfo');

    cy.mount(
        <MemoryRouter initialEntries={['/users/1']}>  
            <Routes>
                <Route path="/users/:userId" element={<UserProfile />} />
            </Routes>
        </MemoryRouter>
    );
    
    cy.wait('@getUserInfo')

    cy.get('[data-cy=email]').should("contain.text", "Email: testEmail");
    cy.get('[data-cy=name]').should('contain.text', "Name: testUserName");
    cy.get('[data-cy=subscriptions]').should('contain.text', "Subscriptions: Netflix");
	})

})

describe("User information page", () => {
    it("updates subscriptions and displays updated info after save", () => {
        window.localStorage.setItem("token", "fakeToken");
    
        cy.intercept("GET", "/users/1", {
            user: {
                email: "testEmail",
                name: "testUserName",
                subscriptions: ['Netflix'],
            },
                token: 'fakeToken'
        }).as('getUserInfo');
    
        cy.mount(
            <MemoryRouter initialEntries={['/users/1']}>
            <Routes>
                <Route path="/users/:userId" element={<UserProfile />} />
            </Routes>
            </MemoryRouter>
        );
    
        cy.wait('@getUserInfo');
    
        cy.intercept("PUT", "/users/1", {
            statusCode: 201,
            body: {
                user: {
                    email: "testEmail",
                    name: "testUserName",
                    subscriptions: ['Hulu', 'Prime'], 
                    }, 
                token: 'fakeToken'
            }
        }).as('updateUserInfo');
    
        cy.contains('Edit').click();
    
        cy.get('#subscriptions').should('be.visible');
    
        cy.get('#subscriptions').clear().type('Hulu, Prime');
    
        cy.contains('Save').click();
    
        cy.wait('@updateUserInfo');
    
        cy.get('[data-cy=subscriptions]').should('contain.text', "Subscriptions: Hulu, Prime");
        });
    });