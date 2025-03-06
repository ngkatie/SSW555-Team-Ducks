export default class Qubit {
    // Defines qubit object
    constructor(value, weight) {
        this.value = value;
        this.weight = weight;
        this.intervalID = null;
    }
    
    // Sets qubit weight to value
    setWeight = (value) => {
        this.weight = value;
        return this; // Enable method chaining
    };

    // Clears qubit intervalID
    clearQubitIntervalID = () => {
        // if intervalID is set, clear intervalID and reset to null
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
        return this; // Enable method chaining
    };

    // Creates qubit object
    static createQubit = (maxCapacity) => {
        // weight of a qubit is fixed, random 0 to n (knapsack capacity)
        const weight = getRandomInt(maxCapacity);

        /* value fluctuates between a static range (0 to 50), and will either fixate to 
        whichever comes first:
            (1) the value at the moment I add it to my knapsack or
            (2) a random integer after 5s
        */
        let value = getRandomInt(50);

        // create new qubit object
        const qubit = new Qubit(value, weight);

        // updates the value of qubit every 100 milliseconds until either selection OR after 5 seconds
        qubit.intervalID = setInterval(() => {
            qubit.value = getRandomInt(50);
        }, 100);

        // stops updating the qubit value after 5 seconds
        setTimeout(() => {
            qubit.clearQubitIntervalID();
        }, 5000);

        // return new qubit object
        return qubit;
    };

    // Adds qubit to knapsack array
    selectQubit = (knapsack) => {
        this.clearQubitIntervalID();
        knapsack.updateKnapsack(this, 'select');
        return this;
    };

    // Removes qubit from knapsack array
    deselectQubit = (knapsack) => {
        knapsack.updateKnapsack(this, 'deselect');
        return this;
    };
}

// Generates random integer from 0 to n (inclusive)
const getRandomInt = (n) => {
    return Math.floor(Math.random() * (n + 1));
};
