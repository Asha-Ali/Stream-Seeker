const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')
const JWT = require("jsonwebtoken");
const TokenGenerator = require("../../lib/token_generator");
const secret = process.env.JWT_SECRET;

describe("/users", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

describe("POST /watchLater/:id", () => {
    test("adds a movie to watchLater array", async () => {
        const user = new User({
            email: 'test@example.com',
            password: 'password',
            name: 'testuser',
            watchLater: [],
        });
        const savedUser = await user.save();
        const userId = savedUser._id;
        const token = TokenGenerator.jsonwebtoken(userId);
    
        const movieToAdd = {
            title: "Taken",
            release_year: 2010,
            synopsis: "Man rescues daughter from bad people",
            rating: 4,
            links: "link",
        };
    
        const response = await request(app)
            .post(`/watchLater/${userId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ movie: movieToAdd });
    
        expect(response.status).toEqual(200);
    
        const updatedUser = await User.findById(userId);
        const addedMovie = updatedUser.watchLater[0];
    
        expect(addedMovie.title).toEqual(movieToAdd.title);
        // Add more assertions for other properties if needed
        });
    });
    
    describe("DELETE /watchLater/:id/:movieId", () => {
        test("removes a movie from watchLater array", async () => {
        const user = new User({
            email: 'test@example.com',
            password: 'password',
            name: 'testuser',
            watchLater: [
            {
                title: "Taken",
                release_year: 2010,
                synopsis: "Man rescues daughter from bad people",
                rating: 4,
                links: "link",
            },
            ],
        });
        const savedUser = await user.save();
        const userId = savedUser._id;
        const movieId = savedUser.watchLater[0]._id; 
        const token = TokenGenerator.jsonwebtoken(userId);
    
        const response = await request(app)
            .delete(`/watchLater/${userId}/${movieId}`)
            .set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toEqual(200);
    
        const updatedUser = await User.findById(userId);
    
        expect(updatedUser.watchLater.length).toEqual(0);
        });
        
    });

})