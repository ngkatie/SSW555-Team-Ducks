import Knapsack from '../src/knapsack/knapsack';
import Qubit from '../src/qubit/qubit';

// Initialize variables for each object
describe('Qubit', () => {
    let knapsack;
    let qubit;

    // Create new knapsack and qubit objects
    beforeEach(() => {
        knapsack = Knapsack.createKnapsack(100);
        qubit = Qubit.createQubit(50);
    });

    // Test creation of qubit
    test('should create a qubit with random value and weight', () => {
        expect(qubit.value).toBeGreaterThanOrEqual(0);
        expect(qubit.value).toBeLessThanOrEqual(50);
        expect(qubit.weight).toBeGreaterThanOrEqual(0);
        expect(qubit.weight).toBeLessThanOrEqual(50);
    });

    // Test superposition of qubit
    test('should superpose qubit with random value for 5 seconds every 100 milliseconds', () => {
        let prevValue = qubit.value;
        qubit.superposeQubit(qubit);
        expect(qubit.intervalID).not.toBeNull();
        setTimeout(() => {
            let currValue = qubit.value;
            expect(qubit.intervalID).not.toBeNull();
            expect(currValue).not.to.equal(prevValue);
        }, 5000);
    });

    // Test selection of qubit
    test('should select qubit and add to knapsack', () => {
        qubit.selectQubit(knapsack);
        expect(knapsack.qubits).toContain(qubit);
        expect(knapsack.currentWeight).toBe(qubit.weight);
        expect(knapsack.currentValue).toBe(qubit.value);
    });

    // Test deselection of qubit
    test('should deselect qubit and remove from knapsack', () => {
        qubit.selectQubit(knapsack);
        qubit.deselectQubit(knapsack);
        expect(knapsack.qubits).not.toContain(qubit);
        expect(knapsack.currentWeight).toBe(0);
        expect(knapsack.currentValue).toBe(0);
    });
});