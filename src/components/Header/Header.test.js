import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('should render Header', () => {
    render(<Header />);
    const element = screen.getAllByText('Pokémon');
    expect(element[0]).toBeInTheDocument();
  });
});
