
export default class Qubit {
    // Defines qubit object
    constructor(value, weight) {
        this.value = value;
        this.weight = weight;
        this.isSelected = false;
        this.isSuperposed = false;
        this.entangledWith = null;
    }
    
    // Sets qubit weight to value
    setWeight = (value) => {
        this.weight = value;
        return this;
    };
    
    // Creates qubit object
    static createQubit = (maxCapacity) => {
        // initializes weight of a qubit as random value from 1 to knapsack capacity
        let weight = getRandomInt(1, maxCapacity);
        
        // initializes value to random integer between 1 and 50
        let value = getRandomInt(1, 50);
       
        return new Qubit(value, weight);
    };
    
    // Adds qubit to knapsack array
    selectQubit = (knapsack) => {
        // checks if qubit is superposed
        if (Array.isArray(this.value)) this.resolveQubit();

        // checks if qubit is already selected
        if (this.isSelected)
            throw new Error('This qubit is already in the knapsack!');
        
        // selects the qubit
        this.isSelected = true;

        // calls to update knapsack with qubit added
        knapsack.updateKnapsack(this, 'select');

        // checks if qubit is entangled with another qubit
        if (this.entangledWith && !this.entangledWith.isSelected)
            this.entangledWith.selectQubit(knapsack);

        return this;
    };
    
    // Removes qubit from knapsack array
    deselectQubit = (knapsack) => {
        // checks if qubit is selected
        if (!this.isSelected)
            throw new Error("This qubit is not in the knapsack!");
        
        // deselects the qubit
        this.isSelected = false;

        // calls to update knapsack without qubit removed
        knapsack.updateKnapsack(this, 'deselect');

        // checks if qubit is entangled with another qubit
        if (this.entangledWith && this.entangledWith.isSelected)
            this.entangledWith.deselectQubit(knapsack);

        return this;
    };
    
    // Imposes superposition on qubits
    superposeQubit = () => {
        // checks if qubit is already superposed
        if (this.isSuperposed)
            throw new Error('This qubit is already superposed!');
        
        // gets current value of qubit before superposition
        const currentValue = this.value;
        
        // creates array to hold superposed values
        let superposedValues = [];

        /* populates newly superposed qubit with different values:
            - value less than current value
            - old value of qubit
            - value more than current value
        */
        superposedValues.push(getRandomInt(1, currentValue));
        superposedValues.push(currentValue);
        superposedValues.push(getRandomInt(currentValue, currentValue + 20));

        // updates qubit value with superposed values and updates flag
        this.value = superposedValues;
        this.isSuperposed = true;
        
        return this;
    };
    
    // Resolves qubit value by clearing the qubit's intervalID
    resolveQubit = () => {
        // checks if qubit is not already superposed
        if (!this.isSuperposed)
            throw new Error('This qubit is not superposed!');

        // resolves the qubit weight to one of the three superposed value
        const resolvedValue = this.value[Math.floor(Math.random() * this.value.length)];
        
        // updates qubit value with resolved value and updates flag
        this.value = resolvedValue;
        this.isSuperposed = false;
        
        return this;
    };

    // Imposes entanglement on a pair of qubits
    entangleQubit = (targetQubit) => {
        // updates current and target qubit's entangledWith properties to each other
        this.entangledWith = targetQubit;
        targetQubit.entangledWith = this;
        
        // checks if either qubit is superposed, resolves if true
        if (this.isSuperposed) this.resolveQubit();
        if (targetQubit.isSuperposed) targetQubit.resolveQubit();
        
        // sets target targetQubit's value to this qubit's value
        // targetQubit.value = this.value;

        return this;
    };
}

// Generates random integer from n to m (inclusive)
const getRandomInt = (n, m) => {
    return Math.floor(Math.random() * (m - n + 1)) + n;
};
