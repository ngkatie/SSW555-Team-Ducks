import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Qubit from "../src/components/game/Qubit/Qubit";

describe("Qubit Component", () => {
  it("renders the Qubit component with initial value and weight", () => {
    render(<Qubit onSelect={jest.fn()} initialValue={25} initialWeight={10} />);
    
    // Check if the value is displayed
    expect(screen.getByText("25")).toBeInTheDocument();
    // Check if the weight label is displayed
    expect(screen.getByText("Heavy")).toBeInTheDocument();
  });

  it("calls onSelect with correct value and weight when badge is clicked", () => {
    const mockOnSelect = jest.fn();
    render(<Qubit onSelect={mockOnSelect} initialValue={25} initialWeight={10} />);

    // Simulate clicking the badge
    const badge = screen.getByText("+");
    fireEvent.click(badge);

    // Ensure onSelect is called with the correct arguments
    expect(mockOnSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 25,
        weight: 10,
      })
    );
  });

  it("fixes the value after selection", () => {
    const { rerender } = render(<Qubit onSelect={jest.fn()} initialValue={25} initialWeight={10} />);
    
    // Simulate clicking the badge
    const badge = screen.getByText("+");
    fireEvent.click(badge);
    
    // Rerender with isAdded=true to simulate selection
    rerender(<Qubit onSelect={jest.fn()} initialValue={25} initialWeight={10} isAdded={true} />);
    
    // Value should be fixed at 25
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("changes badge symbol when added", () => {
    const { rerender } = render(<Qubit onSelect={jest.fn()} initialValue={25} initialWeight={10} isAdded={false} />);
    expect(screen.getByText("+")).toBeInTheDocument();
    
    rerender(<Qubit onSelect={jest.fn()} initialValue={25} initialWeight={10} isAdded={true} />);
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("calls onRemove when clicked in added state", () => {
    const mockOnRemove = jest.fn();
    render(
      <Qubit 
        onSelect={jest.fn()} 
        onRemove={mockOnRemove} 
        initialValue={25} 
        initialWeight={10} 
        isAdded={true} 
      />
    );
    
    const badge = screen.getByText("-");
    fireEvent.click(badge);
    
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it("displays correct weight type based on weight", () => {
    const { rerender } = render(<Qubit onSelect={jest.fn()} initialValue={25} initialWeight={10} />);
    expect(screen.getByText("Heavy")).toBeInTheDocument();
    
    rerender(<Qubit onSelect={jest.fn()} initialValue={25} initialWeight={5} />);
    expect(screen.getByText("Light")).toBeInTheDocument();
  });

  it("maintains state after multiple clicks", () => {
    const mockOnSelect = jest.fn();
    const mockOnRemove = jest.fn();
    const { rerender } = render(
      <Qubit 
        onSelect={mockOnSelect} 
        onRemove={mockOnRemove} 
        initialValue={25} 
        initialWeight={10}
        isAdded={false} 
      />
    );
    
    // First click (add)
    const badge = screen.getByText("+");
    fireEvent.click(badge);
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    
    // Rerender with added state
    rerender(
      <Qubit 
        onSelect={mockOnSelect} 
        onRemove={mockOnRemove} 
        initialValue={25} 
        initialWeight={10}
        isAdded={true} 
      />
    );
    
    // Second click (remove)
    fireEvent.click(screen.getByText("-"));
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});