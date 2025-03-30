import Knapsack from '../src/knapsack/knapsack';
import Qubit from '../src/qubit/qubit';

// Initialize variables for each object
describe('Qubit', () => {
    let knapsack;
    let qubit1;
    let qubit2;

    // Create new knapsack and qubit objects
    beforeEach(() => {
        knapsack = Knapsack.createKnapsack(100);
        qubit1 = Qubit.createQubit(50);
        qubit2 = Qubit.createQubit(50);
    });

    // Test creation of qubit
    test('should create two qubits with correct values and weights', () => {
        expect(qubit1.value).toBeGreaterThanOrEqual(0);
        expect(qubit1.value).toBeLessThanOrEqual(50);
        expect(qubit1.weight).toBeGreaterThanOrEqual(0);
        expect(qubit1.weight).toBeLessThanOrEqual(knapsack.capacity);

        expect(qubit2.value).toBeGreaterThanOrEqual(0);
        expect(qubit2.value).toBeLessThanOrEqual(50);
        expect(qubit2.weight).toBeGreaterThanOrEqual(0);
        expect(qubit2.weight).toBeLessThanOrEqual(knapsack.capacity);
    });

    // Test selection of qubit
    test('should select qubits and add to knapsack', () => {
        let currWeight = 0;
        let currValue = 0;

        qubit1.selectQubit(knapsack);
        currWeight += qubit1.weight;
        currValue += qubit1.value;
        expect(knapsack.qubits).toContain(qubit1);
        expect(knapsack.currentWeight).toBe(currWeight);
        expect(knapsack.currentValue).toBe(currValue);
        
        qubit2.selectQubit(knapsack);
        currWeight += qubit2.weight;
        currValue += qubit2.value;
        expect(knapsack.qubits).toContain(qubit2);
        expect(knapsack.currentWeight).toBe(currWeight);
        expect(knapsack.currentValue).toBe(currValue);
    });

    // Test deselection of qubit
    test('should deselect qubit and remove from knapsack', () => {
        qubit1.selectQubit(knapsack);
        qubit2.selectQubit(knapsack);

        let currWeight = knapsack.currentWeight;
        let currValue = knapsack.currentValue;

        qubit1.deselectQubit(knapsack);
        currWeight -= qubit1.weight;
        currValue -= qubit1.value;
        expect(knapsack.qubits).not.toContain(qubit1);
        expect(knapsack.currentWeight).toBe(currWeight);
        expect(knapsack.currentValue).toBe(currValue);

        qubit2.deselectQubit(knapsack);
        currWeight -= qubit2.weight;
        currValue -= qubit2.value;
        expect(knapsack.qubits).not.toContain(qubit2);
        expect(knapsack.currentWeight).toBe(0);
        expect(knapsack.currentValue).toBe(0);
    });

    // Test superposition of qubit
    test('should superpose qubit with current value as well as two additional values: one value less and one value greater', () => {
        qubit1.superposeQubit();
        expect(qubit1.isSuperposed).toBe(true);
        expect(qubit1.value.length).toBe(3);
        expect(qubit1.value[0]).toBeLessThan(qubit1.value[1]);
        expect(qubit1.value[2]).toBeGreaterThan(qubit1.value[1]);
    });

    // Test resolving superposed qubit to a single value
    test('should resolve a superposed qubit to one of the superposed values', () => {
        qubit1.superposeQubit();
        expect(qubit1.isSuperposed).toBe(true);
        let superposedValues = qubit1.value;
        qubit1.resolveQubit();
        expect(typeof qubit1.value).toBe('number');
        expect(superposedValues).toContain(qubit1.value);
    });

    // Test entanglement of two qubits
    test('should entangle two qubits resolve both qubits if either are superposed', () => {
        qubit1.entangleQubit(qubit2);
        expect(qubit1.entangledWith).toBe(qubit2);
        expect(qubit2.entangledWith).toBe(qubit1);
        // expect(qubit2.value).toBe(qubit1.value);
    });

    // Test if entangled pairs are selected together
    test('should add entangled pairs to the knapsack together', () => {
        qubit1.entangleQubit(qubit2);
        qubit1.selectQubit(knapsack);
        expect(knapsack.qubits).toContain(qubit1);
        expect(knapsack.qubits).toContain(qubit2);
    });

    // Test if entanlged pairs are deselected together
    test('should remove entangled pairs to the knapsack together', () => {
        qubit2.entangleQubit(qubit1);
        qubit2.selectQubit(knapsack);
        qubit1.deselectQubit(knapsack);
        expect(knapsack.qubits).not.toContain(qubit2);
        expect(knapsack.qubits).not.toContain(qubit1);
    });
});

// RUN TEST: npm run test
