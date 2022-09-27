import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders todo grid component', () => {
    render(<App />);
    const todoGridComponent = screen.getByText(/Todos/i)
    expect(todoGridComponent).toBeInTheDocument();
  })
})
