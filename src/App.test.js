import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('it renders', () => {
    render(<App />);

    expect(screen.getByTestId('app')).toBeTruthy()
  });
})
