import {render, screen} from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders tictactoe header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Tic Tac Toe/i);
  expect(headerElement).toBeInTheDocument();
});
