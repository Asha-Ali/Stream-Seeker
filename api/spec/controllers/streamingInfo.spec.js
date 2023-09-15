const StreamingInfoController = require('../../controllers/streamingInfoController'); 
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

describe('StreamingInfoController', () => {
  beforeEach(() => {
    fetchMock.resetMocks(); 
  });

  it('should return streaming info for a valid ID', async () => {
    const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY; 
    const id = '12345'; 

    fetchMock.mockResponses(
      JSON.stringify({
        result: {
          streamingInfo: {
            gb: [
              { service: 'Netflix', url: 'netflix.com/movie/12345' },
              { service: 'Amazon Prime', url: 'amazon.com/movie/12345' },
            ],
          },
        },
      }),
      JSON.stringify({
        result: {
          streamingInfo: {
            gb: [
              { service: 'Hulu', url: 'hulu.com/movie/12345' },
              { service: 'Disney+', url: 'disneyplus.com/movie/12345' },
            ],
          },
        },
      })
    );

    const req = { params: { id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await StreamingInfoController.GetStreamingInfo(req, res);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=movie%2F12345`,
      {
        headers: {
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
          'X-RapidAPI-Key': rapidApiKey,
        },
        "method": 'GET'
      }
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=tv%2F12345`,
      {
        headers: {
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
          'X-RapidAPI-Key': rapidApiKey,
        },
        "method": 'GET'
      }
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { service: 'Netflix', url: 'netflix.com/movie/12345' },
      { service: 'Amazon Prime', url: 'amazon.com/movie/12345' },
      { service: 'Hulu', url: 'hulu.com/movie/12345' },
      { service: 'Disney+', url: 'disneyplus.com/movie/12345' },
    ]);
  });

  it('should return an error for an invalid ID', async () => {
    const req = { params: { id: 'invalid' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await StreamingInfoController.GetStreamingInfo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
