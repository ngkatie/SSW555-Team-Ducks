export default class Knapsack {
    // Defines knapsack object
    constructor(capacity) {
        this.capacity = capacity;
        this.qubits = [];
        this.currentWeight = 0;
        this.currentValue = 0;
    }

    // Error Checking: Checks if capacity is a valid value
    isValidCapacity = (qubitWeight) => {
        // checks if qubitWeight is a valid value
        if (typeof qubitWeight !== 'number' || qubitWeight < 0)
            throw new Error("Invalid qubit weight!");

        // checks if knapsack capacity is exceeded after adding a qubit
        if (this.currentWeight + qubitWeight > this.capacity)
            throw new Error("Knapsack capacity exceeded!");

        // checks if knapsack capacity is below lower bound after removing a qubit
        if (this.currentWeight - qubitWeight < 0) 
            throw new Error("Knapsack capacity cannot be negative!");

        return true;
    };

    // Updates knapsack after qubit selection and deselection
    updateKnapsack = (qubit, action) => {
        // checks if knapsack can be updated based on qubit weight
        if (this.isValidCapacity(qubit.weight)) {
            // performs 'selection'
            if (action === 'select') {
                this.qubits.push(qubit);
                this.currentWeight += qubit.weight;
                this.currentValue += qubit.value;
            }
            // performs 'deselection'
            else if (action === 'deselect') {
                this.qubits = this.qubits.filter(q => q !== qubit);
                this.currentWeight -= qubit.weight;
                this.currentValue -= qubit.value;
            }
            else {
                throw new Error("Could not update knapsack!");
            }
        }

        return this; 
    };
}