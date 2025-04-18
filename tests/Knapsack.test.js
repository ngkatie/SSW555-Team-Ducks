import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Knapsack from '../src/components/game/Knapsack/Knapsack';
import '@testing-library/jest-dom';

jest.mock('../src/components/game/Qubit/Qubit', () => {
  let callCount = 0;
  const fixedQubits = [
    { weight: 10, value: 30 },
    { weight: 5, value: 19 }
  ];

  return (props) => {
    const mockQubit = fixedQubits[callCount % 2];
    callCount++;

    return (
      <button 
        onClick={() => props.onSelect(mockQubit)} 
        data-testid="mock-qubit"
        data-weight={mockQubit.weight}
        data-value={mockQubit.value}
      >
        Mock Qubit
      </button>
    );
  };
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

  test('shows error modal if capacity is exceeded', async () => {
    render(<Knapsack initialCapacity={10} />);
    const qubitButtons = screen.getAllByTestId('mock-qubit');

    fireEvent.click(qubitButtons[0]); 
    await fireEvent.click(qubitButtons[1]); 

    await screen.findByText((_, node) =>
      node.textContent === "Capacity exceeded! Cannot add this qubit to knapsack."
    );
  });

  test('disables qubit selection when finalized', () => {
    render(<Knapsack initialCapacity={100} />);
    
    // Click the finalize button
    const finalizeButton = screen.getByText('Finalize Knapsack');
    fireEvent.click(finalizeButton);
    
    // Try to add a qubit
    const qubitButtons = screen.getAllByTestId('mock-qubit');
    fireEvent.click(qubitButtons[0]);
    
    // Check if the weight and value remain unchanged
    expect(screen.getByText((_, node) => 
      node.textContent === 'Weight: 0')).toBeInTheDocument();
    expect(screen.getByText((_, node) => node.textContent === 'Value: 0')).toBeInTheDocument();
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
    render(<Knapsack initialCapacity={100} />);
  
    const qubitButtons = screen.getAllByTestId('mock-qubit');
    const q0 = qubitButtons[0];
    const q1 = qubitButtons[1];
  
    fireEvent.click(q0); // Add Qubit 0 (weight 10, value 30)
    fireEvent.click(q1); // Add Qubit 1 (weight 5, value 19)
    fireEvent.click(q0); // Remove Qubit 0
  
    expect(screen.getByText((_, node) =>
      node?.textContent?.replace(/\s+/g, '') === 'Weight:5')).toBeInTheDocument();
  
    expect(screen.getByText((_, node) =>
      node?.textContent?.replace(/\s+/g, '') === 'Value:19')).toBeInTheDocument();
  });
});
