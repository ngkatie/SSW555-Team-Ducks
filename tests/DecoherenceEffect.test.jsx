import React from 'react';
import { render, screen, act } from '@testing-library/react';
import DecoherenceEffect from '../src/components/game/DecoherenceEffect';

describe('DecoherenceEffect', () => {
  // Mock function for onComplete callback
  const mockOnComplete = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    mockOnComplete.mockClear();
  });

  // Check if the effect is hidden when inactive
  it('should be hidden when inactive', () => {
    render(<DecoherenceEffect isActive={false} onComplete={mockOnComplete} />);
    const message = screen.queryByText('DECOHERENCE EVENT DETECTED!');
    expect(message).not.toBeVisible();
  });

  // Check if the effect is visible when active
  it('should be visible when active', () => {
    render(<DecoherenceEffect isActive={true} onComplete={mockOnComplete} />);
    const message = screen.getByText('DECOHERENCE EVENT DETECTED!');
    expect(message).toBeVisible();
  });

  // Verify callback is called after animation
  it('should call onComplete after animation ends', () => {
    render(<DecoherenceEffect isActive={true} onComplete={mockOnComplete} />);
    
    // Fast forward past the animation duration
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  // Verify callback is not called when inactive
  it('should not call onComplete when inactive', () => {
    render(<DecoherenceEffect isActive={false} onComplete={mockOnComplete} />);
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockOnComplete).not.toHaveBeenCalled();
  });

  // Verify cleanup on unmount
  it('should clean up timer on unmount', () => {
    const { unmount } = render(
      <DecoherenceEffect isActive={true} onComplete={mockOnComplete} />
    );

    unmount();
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockOnComplete).not.toHaveBeenCalled();
  });

  // Verify animation styles are applied
  it('should apply shake animation when active', () => {
    render(<DecoherenceEffect isActive={true} onComplete={mockOnComplete} />);
    const overlay = screen.getByText('DECOHERENCE EVENT DETECTED!').parentElement;
    
    expect(overlay).toHaveStyle({
      position: 'fixed',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    });
  });
});
