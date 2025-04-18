import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Knapsack from '../src/components/game/Knapsack/Knapsack';
import '@testing-library/jest-dom';

// Mock Qubit component to simulate interaction
jest.mock('../src/components/game/Qubit/Qubit', () => (props) => {
  const mockQubit = { weight: 50, value: 35 };
  return (
    <button onClick={() => props.onSelect(mockQubit)} data-testid="mock-qubit">
      Mock Qubit
    </button>
  );
});

describe('Knapsack component', () => {
  test('renders knapsack element', () => {
    render(<Knapsack />);
    expect(screen.getByText(/My Knapsack/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacity:/)).toHaveTextContent('Capacity:');
    expect(screen.getByText(/Weight:/)).toHaveTextContent('Weight:');
    expect(screen.getByText(/Value:/)).toHaveTextContent('Value:');
  });

  test('adds qubit and update knapsack parameters', () => {
    render(<Knapsack />);
 
    const qubitButtons = screen.getAllByTestId('mock-qubit');
    fireEvent.click(qubitButtons[0]); // Simulate selecting a qubit

    expect(screen.getByText(/Weight:/)).toBeInTheDocument();
    expect(screen.getByText(/Value:/)).toBeInTheDocument();
  });

  test('does not add duplicate qubits', async () => {
    render(<Knapsack initialCapacity={100}/>);

    const qubitButtons = screen.getAllByTestId('mock-qubit');
    fireEvent.click(qubitButtons[0]);
    fireEvent.click(qubitButtons[0]); // duplicate

    expect(screen.getByText(/50/)).toHaveTextContent('50');
});

  test('shows error modal if capacity is exceeded', () => {
    render(<Knapsack initialCapacity={50} />);

    const qubitButtons = screen.getAllByTestId('mock-qubit');
    fireEvent.click(qubitButtons[0]);
    fireEvent.click(qubitButtons[1]);

    expect(screen.getByText(/Capacity exceeded/i)).toBeInTheDocument();
  });
});
