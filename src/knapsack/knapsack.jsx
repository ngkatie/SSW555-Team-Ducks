export default class Knapsack {
    // Defines knapsack object
    constructor(capacity) {
        this.capacity = capacity;
        this.qubits = [];
        this.currentWeight = 0;
        this.currentValue = 0;
    }

    // Updates knapsack after qubit selection and deselection
    updateKnapsack = (qubit, action) => {
        // performs 'selection'
        if (action === 'select') {
            // checks if knapsack capacity is exceeded after adding a qubit
            if (this.currentWeight + qubit.weight > this.capacity)
                throw new Error("Knapsack capacity exceeded!");

            this.qubits.push(qubit);
            this.currentWeight += qubit.weight;
            this.currentValue += qubit.value;
        }
        // performs 'deselection'
        else if (action === 'deselect') {
             // checks if knapsack capacity is below lower bound after removing a qubit
            if (this.currentWeight - qubit.weight < 0) 
                throw new Error("Knapsack capacity cannot be negative!");

            this.qubits = this.qubits.filter(q => q !== qubit);
            this.currentWeight -= qubit.weight;
            this.currentValue -= qubit.value;
        }
        else {
            throw new Error("Could not update knapsack!");
        }

        return this; 
    };
}
