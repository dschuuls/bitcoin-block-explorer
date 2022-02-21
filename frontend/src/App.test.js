import { render, screen } from '@testing-library/react';
import App from './App';
import List from './components/List';

it("Renders without crashing", () => {
  render(<App />);
});

test('Renders the \'Height\' column in table header', () => {
  render(<App />);
  const element = screen.getByText(/Height/i);
  expect(element).toBeInTheDocument();
});

test('Renders the \'Hash\' column in table header', () => {
  render(<App />);
  const element = screen.getByText(/Hash/i);
  expect(element).toBeInTheDocument();
});

test('Renders the \'Mined\' column in table header', () => {
  render(<App />);
  const element = screen.getByText(/Mined/i);
  expect(element).toBeInTheDocument();
});
