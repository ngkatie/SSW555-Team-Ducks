import Knapsack from '../src/knapsack/knapsack';
import Qubit from '../src/qubit/qubit';
import { expect, describe, beforeEach, test } from "vitest"; 

describe('Qubit', () => {
    let knapsack;
    let qubit;

    beforeEach(() => {
        knapsack = new Knapsack(100);
        qubit = Qubit.createQubit(50);
    });

    test('should create a qubit with random value and weight', () => {
        expect(qubit.value).toBeGreaterThanOrEqual(0);
        expect(qubit.value).toBeLessThanOrEqual(50);
        expect(qubit.weight).toBeGreaterThanOrEqual(0);
        expect(qubit.weight).toBeLessThanOrEqual(50);
    });

    test('should select qubit and add to knapsack', () => {
        qubit.selectQubit(knapsack);
        expect(knapsack.qubits).toContain(qubit);
        expect(knapsack.currentWeight).toBe(qubit.weight);
        expect(knapsack.currentValue).toBe(qubit.value);
    });

    test('should deselect qubit and remove from knapsack', () => {
        qubit.selectQubit(knapsack);
        qubit.deselectQubit(knapsack);
        expect(knapsack.qubits).not.toContain(qubit);
        expect(knapsack.currentWeight).toBe(0);
        expect(knapsack.currentValue).toBe(0);
    });
});