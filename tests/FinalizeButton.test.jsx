import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FinalizeButton from '../src/components/game/FinalizeButton';

describe('FinalizeButton', () => {
  // Mock function to simulate the onFinalize callback
  const mockOnFinalize = jest.fn();

  // Check if the button is rendered
  it('should render the finalize button', () => {
    render(<FinalizeButton isFinalized={false} onFinalize={mockOnFinalize} />);
    const finalizeButton = screen.getByRole('button', { name: /finalize knapsack/i });
    expect(finalizeButton).toBeInTheDocument();
  });

  // Verify button is clickable when not finalized
  it('should be enabled when not finalized', () => {
    render(<FinalizeButton isFinalized={false} onFinalize={mockOnFinalize} />);
    const finalizeButton = screen.getByRole('button', { name: /finalize knapsack/i });
    expect(finalizeButton).not.toBeDisabled();
  });

  // Verify button becomes disabled after finalization
  it('should be disabled when finalized', () => {
    render(<FinalizeButton isFinalized={true} onFinalize={mockOnFinalize} />);
    const finalizeButton = screen.getByRole('button', { name: /finalize knapsack/i });
    expect(finalizeButton).toBeDisabled();
  });

  it('should call onFinalize when clicked', () => {
    render(<FinalizeButton isFinalized={false} onFinalize={mockOnFinalize} />);
    const finalizeButton = screen.getByRole('button', { name: /finalize knapsack/i });
    // Simulate user clicking the button
    fireEvent.click(finalizeButton);
    // Verify the callback was called exactly once
    expect(mockOnFinalize).toHaveBeenCalledTimes(1);
  });

  // Verify success message appears when finalized
  it('should show completion message when finalized', () => {
    render(<FinalizeButton isFinalized={true} onFinalize={mockOnFinalize} />);
    expect(screen.getByText(/knapsack finalized/i)).toBeInTheDocument();
  });
  
  // Verify success message is not present when not finalized
  it('should not show completion message when not finalized', () => {
    render(<FinalizeButton isFinalized={false} onFinalize={mockOnFinalize} />);
    expect(screen.queryByText(/knapsack finalized/i)).not.toBeInTheDocument();
  });
}); 