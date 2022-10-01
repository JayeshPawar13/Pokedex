import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

describe('PokemonCard component', () => {
  test('should render Pokemon Card with 1 type', () => {
    const pokemon = {
      id: '1',
      name: 'Bulbasaur',
      imageUrl: 'abc',
      type: ['fire'],
    };
    render(<PokemonCard data={pokemon} />);
    const element = screen.getByText('Bulbasaur');
    expect(element).toBeInTheDocument();
  });

  test('should render Pokemon Card with 2 type', () => {
    const pokemon = {
      id: '1',
      name: 'Bulbasaur',
      imageUrl: 'abc',
      type: ['fire', 'ice'],
    };
    render(<PokemonCard data={pokemon} />);
    const element = screen.getByText('Bulbasaur');
    expect(element).toBeInTheDocument();
  });
});
