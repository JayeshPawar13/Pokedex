import { render, screen } from '@testing-library/react';
import Description from './Description';

describe('Description component', () => {
  test('should render Description', async () => {
    const modalData = {
      height: 7,
      id: 1,
      name: 'bulbasaur',
      order: 1,
      past_types: [],

      sprites: {
        other: {
          dream_world: {
            front_default: 'abc',
            front_female: null,
          },
        },
      },
      stats: [
        {
          base_stat: 45,
          effort: 0,
          stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
        },
        {
          base_stat: 49,
          effort: 0,
          stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
        },
        {
          base_stat: 49,
          effort: 0,
          stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' },
        },
        {
          base_stat: 65,
          effort: 1,
          stat: {
            name: 'special-attack',
            url: 'https://pokeapi.co/api/v2/stat/4/',
          },
        },
        {
          base_stat: 65,
          effort: 0,
          stat: {
            name: 'special-defense',
            url: 'https://pokeapi.co/api/v2/stat/5/',
          },
        },
        {
          base_stat: 45,
          effort: 0,
          stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
        },
      ],
      types: [
        {
          slot: 1,
          type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
        },
        {
          slot: 2,
          type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
        },
      ],
      type: ['fire', 'ice'],
      weight: 69,
    };

    window.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        egg_groups: [{ name: 'monster', url: 'abc' }],
        flavor_text_entries: [{ flavor_text: 'abc', language: { name: 'en' } }],
        damage_relations: {
          double_damage_from: [
            { name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/' },
            { name: 'psychic', url: 'https://pokeapi.co/api/v2/type/14/' },
          ],
        },
      }),
    });
    jest.doMock('../Search/Search.js', () => {
      const ComponentToMock = () => <div />;
      return ComponentToMock;
    });
    render(<Description data={{ displayModal: true, modalData }} />);
    await screen.findByText('Monster', { exact: false });
  });
});
