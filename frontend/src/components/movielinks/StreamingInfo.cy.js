const { MemoryRouter, Routes, Route } = require("react-router")
const { default: StreamingInfo } = require("./StreamingInfo")

describe("Streaming Info page", () => {
    it("shows provider name and link", () => {
        cy.intercept('GET', '/streaming-info/1/hitch', (req) => {
            req.reply({
                statusCode: 200,
                body: { "result": {
                            "type": "movie",
                            "title": "Hitch",
                            "streamingInfo": {
                                "ae": [
                                    {
                                        "service": "netflix",
                                        "streamingType": "subscription",
                                        "link": "https://www.netflix.com/title/70019506/",
                                        "audios": [],
                                        "subtitles": [],
                                        "availableSince": 1680372047
                                    }
                            ]}
                        }}
            }).as("getPosts")

        cy.mount(<StreamingInfo />
            // <MemoryRouter initialEntries={['/streaming-info/1/hitch']}>
            //     <Routes>
            //         <Route path='/streaming-info/:id/:title' element={<StreamingInfo/>}/>
            //     </Routes>
            // </MemoryRouter>
        )

        cy.wait('@getStreamingInfo')

        cy.get('h2:contains("netlix")').should('exist');
            
        })
    })
})