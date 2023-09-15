const SearchController = require('../../controllers/searchController'); // Update the path as per your project structure
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

describe('SearchController', () => {
  beforeEach(() => {
    fetchMock.resetMocks(); 
  });

  it('should return data when a valid title is provided', async () => {
    const apiKey = process.env.REACT_APP_API_KEY

    fetchMock.mockResponseOnce(JSON.stringify({ results: ['movie1', 'movie2'] }));

    const req = { params: { title: 'Avatar' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await SearchController.FindByTitle(req, res);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/search/multi?query=Avatar&api_key=${apiKey}`
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(['movie1', 'movie2']);
  });

  it('should return an error when no title is provided', async () => {
    const req = { params: { title: '' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await SearchController.FindByTitle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Title not found' });
  });
});
