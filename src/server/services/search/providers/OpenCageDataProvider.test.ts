import got from 'got';
import { getPlaces } from './OpenCageDataProvider';

jest.mock('got');
const mockedRequest = got as any;

describe('OpenCageDataProvider', () => {
  test('an empty query string', async () => {
    mockedRequest.mockResolvedValue({ body: JSON.stringify({ features: [] })});
    const result = await getPlaces('Paris');
    expect(result).toEqual({ features: [] });
  });
  
  test('an invalid non-json response', async () => {
    mockedRequest.mockRejectedValue(new Error('Service Unavailable.'));
    await expect(getPlaces('Chamonix')).rejects.toThrow('Service Unavailable.');
  });
});