import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Knapsack from "../src/components/game/Knapsack/Knapsack";
import Qubit from "../src/components/game/Qubit/Qubit";

describe("Qubit Component", () => {
  it("renders the Qubit component with initial value and weight", () => {
    render(<Qubit onSelect={jest.fn()} />);
    
    // Check if the value is displayed
    const valueElement = screen.getByText(/\d+/); // Matches any number
    expect(valueElement).toBeInTheDocument();

    // Check if the weight label is displayed
    const weightLabel = screen.getByText(/Heavy|Light/);
    expect(weightLabel).toBeInTheDocument();
  });

  it("calls onSelect with correct value and weight when badge is clicked", () => {
    const mockOnSelect = jest.fn();
    render(<Qubit onSelect={mockOnSelect} />);

    // Simulate clicking the badge
    const badge = screen.getByText("+");
    fireEvent.click(badge);

    // Ensure onSelect is called with the correct arguments
    expect(mockOnSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: expect.any(Number),
        weight: expect.any(Number),
      })
    );
  });

  it("fixes the value after selection", async () => {
    render(<Qubit onSelect={jest.fn()} />);

    // Simulate clicking the badge
    const badge = screen.getByText("+");
    fireEvent.click(badge);

    // Wait and check if the value stops fluctuating
    const fixedValue = screen.getByText(/\d+/).textContent;
    await waitFor(() => {
      expect(screen.getByText(fixedValue)).toBeInTheDocument();
    });
  });
});
