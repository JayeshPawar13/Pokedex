import { render, waitFor } from '@testing-library/react';
import Search from './Search';

describe('Search component', () => {
  test('should render Search', async () => {
    window.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        results: [{ url: 'abc' }],
        name: 'abc',
        types: [{ type: { name: 'abc' } }],
        sprites: {
          other: {
            dream_world: {
              front_default: 'abc',
              front_female: null,
            },
          },
        },
      }),
    });

    jest.doMock('../Description/Description.js', () => {
      const ComponentToMock = () => <div />;
      return ComponentToMock;
    });

    render(<Search />);

    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(2));
  });
});
