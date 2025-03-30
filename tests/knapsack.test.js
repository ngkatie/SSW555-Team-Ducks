import Knapsack from "../src/knapsack/knapsack";
import Qubit from "../src/qubit/qubit";
import { expect, describe, beforeEach, test } from "vitest"; 

// Initialize variables for each variable
describe('Knapsack', () => {
    let knapsack;
    let qubit1;
    let qubit2;
    let qubit3;

    // Create new knapsack and qubit objects
    beforeEach(() => {
        knapsack = Knapsack.createKnapsack(100);
        qubit1 = Qubit.createQubit(50);
        qubit2 = Qubit.createQubit(50);
        qubit3 = Qubit.createQubit(51);
    });

    // Tests updating of knapsack after selection
    test('should add qubit to knapsack', () => {
        qubit1.selectQubit(knapsack);
        expect(knapsack.qubits).toContain(qubit1);
        expect(knapsack.currentWeight).toBe(qubit1.weight);
        expect(knapsack.currentValue).toBe(qubit1.value);
    });

    // Tests updating of knapsack after deselection
    test('should remove qubit from knapsack', () => {
        qubit1.selectQubit(knapsack);
        qubit1.deselectQubit(knapsack);
        expect(knapsack.qubits).not.toContain(qubit1);
        expect(knapsack.currentWeight).toBe(0);
        expect(knapsack.currentValue).toBe(0);
    });

    // Tests error checking of knapsack capacity if exceeds capacity
    test('should throw error if capacity is exceeded', () => {
        qubit1.setWeight(200);
        expect(() => qubit1.selectQubit(knapsack)).toThrow('Knapsack capacity exceeded!');
    });

    // Tests error checking of knapsack is qubit has already been added
    test('should throw error if qubit being selected has already been added', () => {
        qubit1.selectQubit(knapsack);
        expect(() => qubit1.selectQubit(knapsack)).toThrow('This qubit is already in the knapsack!');
    });

    // Tests error checking of knapsack capacity if below 0
    test('should throw error if negative capacity', () => {
        qubit1.selectQubit(knapsack);
        qubit3.selectQubit(knapsack);
        qubit3.setWeight(100);
        expect(() => qubit1.deselectQubit(knapsack)).not.toThrow();
        expect(() => qubit3.deselectQubit(knapsack)).toThrow('Knapsack capacity cannot be negative!');
    });

    // Tests error checking of knapsack if qubit has already been removed
    test('should throw error if qubit being deselected has already been removed', () => {
        qubit1.selectQubit(knapsack);
        expect(() => qubit1.deselectQubit(knapsack)).not.toThrow();
        expect(() => qubit1.deselectQubit(knapsack)).toThrow('This qubit is not in the knapsack!');
    });
});