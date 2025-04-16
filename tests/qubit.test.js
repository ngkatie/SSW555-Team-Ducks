import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Qubit from '../src/components/game/Qubit/Qubit';
import '@testing-library/jest-dom';

jest.useFakeTimers();

// Lock Math.random to make test deterministic
beforeEach(() => {
  jest.spyOn(global.Math, 'random')
    .mockReturnValueOnce(0.8)
    .mockReturnValueOnce(0.4);
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('Qubit component', () => {
  test('renders with randomized value and calls onSelect when clicked', () => {
    const onSelectMock = jest.fn();

    render(<Qubit onSelect={onSelectMock} />);

    const badge = screen.getByText('+');
    expect(badge).toBeInTheDocument();

    // Simulate click
    fireEvent.click(badge);
    expect(onSelectMock).toHaveBeenCalledWith({ value: 20, weight: 10 });

    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
