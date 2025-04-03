import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";

import Qubit from "../Qubit/Qubit";

const Knapsack = ({initialCapacity = 100}) => {

    const [capacity, setCapacity] = useState(initialCapacity);
    const [weight, setWeight] = useState(0);
    const [value, setValue] = useState(0);
    const [qubits, setQubits] = useState([]);

    // Random decoherence
    // useEffect(() => {
    //     const reduceCapacity = () => {
    //         setCapacity(cap => Math.max(cap * 0.9, 0));
    //         nextDecoherence();
    //     };

    //     const nextDecoherence = () => {
    //         const interval = Math.random() * 30000;
    //         const timeoutId = setTimeout(reduceCapacity, interval);
    //         return timeoutId;
    //     };

    //     const timeoutId = nextDecoherence();

    //     return () => clearTimeout();
    // }, []);

    // Updates knapsack after qubit selection
    const addQubit = (qubit) => {

        try {
            // checks if knapsack capacity is exceeded after adding a qubit
            if (weight + qubit.weight > capacity)
                throw new Error("Knapsack capacity exceeded!");

            setQubits(prevQubits => [...prevQubits, qubit]);
            setWeight(currentWeight => currentWeight + qubit.weight);
            setValue(currentValue => currentValue + qubit.value);
        }
        // // performs 'deselection'
        // else if (action === 'deselect') {
        //      // checks if knapsack capacity is below lower bound after removing a qubit
        //     if (weight - qubit.weight < 0) 
        //         throw new Error("Knapsack capacity cannot be negative!");

        //     setQubits(qubits.filter(q => q !== qubit));
        //     setWeight(currentWeight => currentWeight - qubit.weight);
        //     setValue(currentValue => currentValue - qubit.value);
        // }
        catch(e) {
            throw new Error("Could not update knapsack!");
        }
    };

    return (
        <div className="knapsack-container">

            <Box component="section"
                sx={{
                    padding: 2,
                    margin: 2,
                    paddingBottom: 4,
                    width: 200,
                    color: '#000000',
                    backgroundColor: '#ADD8E6',
                    border: 1,
                    borderRadius: '10%'
                }}>
                <h2>My Knapsack</h2>
                <div className="knapsack-stats">
                    <p><strong>Capacity:</strong> {capacity.toFixed(0)}</p>
                    <p><strong>Weight:</strong> {weight.toFixed(0)}</p>
                    <p><strong>Value:</strong> {value.toFixed(2)}</p>
                    {/* <p><strong>Qubits:</strong> {qubits.length}</p> */}
                </div>
            </Box>

            <Qubit onSelect={addQubit}/>
            <Qubit onSelect={addQubit}/>
            <Qubit onSelect={addQubit}/>

            {/* <button className="add-btn" onClick={addQubit}>➕ Add Qubit</button> */}

            {/* <ul className="qubit-list">
                {qubits.map((qubit) => (
                    <li key={qubit.id} className="qubit-item">
                        <span>⚛ Qubit {qubit.id} - W: {qubit.weight}, V: {qubit.value}</span>
                        <button className="remove-btn" onClick={() => removeQubit(qubit.id)}>❌ Remove</button>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default Knapsack;