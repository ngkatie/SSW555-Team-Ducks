import React, {useState, useEffect} from "react";

const Knapsack = ({initialCapacity = 100}) => {

    const [capacity, setCapacity] = useState(initialCapacity);
    const [weight, setWeight] = useState(0);
    const [value, setValue] = useState(0);
    const [qubits, setQubits] = useState([]);

    useEffect(() => {
        const reduceCapacity = () => {
            setCapacity(Math.max(capacity * 0.9, 0));
            nextDecoherence();
        };

        const nextDecoherence = () => {
            const interval = Math.random() * 30000;
            setTimeout(reduceCapacity, interval);
        };

        nextDecoherence();

        return () => clearTimeout();
    }, []);

    // Updates knapsack after qubit selection and deselection
    updateKnapsack = (qubit, action) => {
        // performs 'selection'
        if (action === 'select') {
            // checks if knapsack capacity is exceeded after adding a qubit
            if (weight + qubit.weight > capacity)
                throw new Error("Knapsack capacity exceeded!");

            setQubits(currentQubits => [...currentQubits, qubit]);
            setWeight(currentWeight => currentWeight + qubit.weight);
            setValue(currentValue => currentValue + qubit.value);
        }
        // performs 'deselection'
        else if (action === 'deselect') {
             // checks if knapsack capacity is below lower bound after removing a qubit
            if (weight - qubit.weight < 0) 
                throw new Error("Knapsack capacity cannot be negative!");

            setQubits(qubits.filter(q => q !== qubit));
            setWeight(currentWeight => currentWeight - qubit.weight);
            setValue(currentValue => currentValue - qubit.value);
        }
        else {
            throw new Error("Could not update knapsack!");
        }

        return this; 
    };
};

export default Knapsack;