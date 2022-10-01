import { render } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  jest.doMock('./components/Header/Header.js', () => {
    const ComponentToMock = () => <div />;
    return ComponentToMock;
  });

  jest.doMock('./components/Search/Search.js', () => {
    const ComponentToMock = () => <div />;
    return ComponentToMock;
  });

  render(<App />);
});
