import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Welcome from '../src/components/game/Welcome/Welcome';

describe('Welcome component', () => {
  test('renders modal with correct content', () => {
    render(<Welcome />);

    expect(screen.getByText(/Round 1: Superposition/i)).toBeInTheDocument();
    expect(
      screen.getByText(/let's learn about superposition/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Let's try!/i)).toBeInTheDocument();
  });

  test('closes modal when "Let\'s try!" button is clicked', () => {
    render(<Welcome />);
    const button = screen.getByText(/Let's try!/i);

    // Click the button to close the modal
    fireEvent.click(button);

    // The modal should be gone now
    expect(screen.queryByText(/Round 1: Superposition/i)).not.toBeInTheDocument();
  });
});
