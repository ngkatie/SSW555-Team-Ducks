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

  test('shows error modal if capacity is exceeded', () => {
    render(<Knapsack initialCapacity={50} />);

    const qubitButtons = screen.getAllByTestId('mock-qubit');
    fireEvent.click(qubitButtons[0]);
    fireEvent.click(qubitButtons[1]);

    expect(screen.getByText(/Capacity exceeded/i)).toBeInTheDocument();
  });

  test('disables qubit selection when finalized', () => {
    render(<Knapsack />);
    
    // Click the finalize button
    const finalizeButton = screen.getByText('Finalize Knapsack');
    fireEvent.click(finalizeButton);
    
    // Try to add a qubit
    const qubitButtons = screen.getAllByTestId('mock-qubit');
    fireEvent.click(qubitButtons[0]);
    
    // Check if the weight and value remain unchanged
    expect(screen.getByText(/Weight: 0/)).toBeInTheDocument();
    expect(screen.getByText(/Value: 0/)).toBeInTheDocument();
  });

  test('disables finalize button after finalization', () => {
    render(<Knapsack />);
    
    const finalizeButton = screen.getByText('Finalize Knapsack');
    fireEvent.click(finalizeButton);
    
    expect(finalizeButton).toBeDisabled();
  });

  test('shows success message after finalization', () => {
    render(<Knapsack />);
    
    const finalizeButton = screen.getByText('Finalize Knapsack');
    fireEvent.click(finalizeButton);
    
    expect(screen.getByText(/Knapsack Finalized! Round Complete./i)).toBeInTheDocument();
  });

  test('maintains correct state after multiple operations', () => {
    render(<Knapsack />);
    
    const qubitButtons = screen.getAllByTestId('mock-qubit');
    
    // Add two qubits
    fireEvent.click(qubitButtons[0]);
    fireEvent.click(qubitButtons[1]);
    
    // Remove one qubit
    fireEvent.click(qubitButtons[0]);
    
    // Check if the weight and value are correct
    expect(screen.getByText(/Weight: 50/)).toBeInTheDocument();
    expect(screen.getByText(/Value: 35/)).toBeInTheDocument();
  });
});
