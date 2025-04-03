import React, {useState, useEffect} from "react";
import { Box, Grid } from "@mui/material";
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

            // setQubits(prevQubits => [...prevQubits, qubit]);
            setWeight(currentWeight => currentWeight + qubit.weight);
            setValue(currentValue => currentValue + qubit.value);
        }

        catch(e) {
            throw new Error("Could not update knapsack!");
        }
    };

    return (
        <Grid container className="knapsack-container" sx={{ justifyContent: "center", alignItems: "center" }}>

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
                    <p><strong>Capacity:</strong> {capacity}</p>
                    <p><strong>Weight:</strong> {weight}</p>
                    <p><strong>Value:</strong> {value}</p>
                    {/* <p><strong>Qubits:</strong> {qubits.length}</p> */}
                </div>
            </Box>

            <Grid container spacing={2}>
                <Qubit onSelect={addQubit}></Qubit>
                <Qubit onSelect={addQubit}></Qubit>
                <Qubit onSelect={addQubit}></Qubit>
                <Qubit onSelect={addQubit}></Qubit>
                <Qubit onSelect={addQubit}></Qubit>
                <Qubit onSelect={addQubit}></Qubit>
                <Qubit onSelect={addQubit}></Qubit>
                <Qubit onSelect={addQubit}></Qubit>
                <Qubit onSelect={addQubit}></Qubit>
                <Qubit onSelect={addQubit}></Qubit>
            </Grid>

            {/* {Array.from({ length: 10 }).map((_, qubit) => (
                <Qubit key={qubit} onSelect={addQubit}></Qubit>
            ))} */}

            {/* <ul className="qubit-list">
                {qubits.map((qubit) => (
                    <li key={qubit.id} className="qubit-item">
                        <span>⚛ Qubit {qubit.id} - W: {qubit.weight}, V: {qubit.value}</span>
                        <button className="remove-btn" onClick={() => removeQubit(qubit.id)}>❌ Remove</button>
                    </li>
                ))}
            </ul> */}
        </Grid>
    );
};

export default Knapsack;