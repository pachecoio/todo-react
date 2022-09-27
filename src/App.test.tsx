import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App', () => {
  test('renders todo grid component', () => {
    render(<App />);
    const todoGridComponent = screen.getByText(/Todos/i)
    expect(todoGridComponent).toBeInTheDocument();
  })
})
