import React, {useState, useEffect} from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import BackpackIcon from '@mui/icons-material/Backpack';
import Qubit from '../Qubit/Qubit';
import './Knapsack.css';

const useKnapsack = (initialCapacity = 50, roundId = "1") => {
    const [capacity, setCapacity] = useState(initialCapacity);
    const [weight, setWeight] = useState(0);
    const [value, setValue] = useState(0);
    const [addedQubits, setAddedQubits] = useState([]);
    const [entangledPairs, setEntangledPairs] = useState([]);
    const [showError, setShowError] = useState(false);

    // useEffect(() => {
    //     if (roundId === "2") {
    //         const numPairs = 3;
    //         const indices = Array.from({ length: 12 }, (_, i) => i);
    //         const shuffled = indices.sort(() => Math.random() - 0.5);
    //         const pairs = [];

    //         for (let i = 0; i < numPairs * 2; i += 2) {
    //             pairs.push([shuffled[i], shuffled[i + 1]]);
    //         }

    //         setEntangledPairs(pairs);
    //     }
    // }, [roundId]);

    // const isEntangled = (id) => {
    //     for (const [a, b] of entangledPairs) {
    //         if (a === id) return b;
    //         if (b === id) return a;
    //     }
    //     return null;
    // };

    const addQubit = (qubit) => {
        const { id: id, weight: w, value: v } = qubit;

        // Over capacity
        if (weight + w > capacity) {
            setShowError(true);
            return;
        }
        
        if (addedQubits.includes(id)) {
            setShowError(true);
            return;
        }
    
        setAddedQubits((prevAdded) => {

            // const partnerId = isEntangled(id);
            // if (partnerId !== null && !prevAdded.includes(partnerId)) {
            //     const partner = {
            //         id: partnerId,
            //         weight: 5,
            //         value: 10
            //     };
    
            //     setTimeout(() => addQubit(partner), 100);
            // }
    
            return [...prevAdded, id];
        });

        // Update state
        setWeight((prev) => prev + w);
        setValue((prev) => prev + v);

        return true;
    };
    

    return {
        capacity,
        weight,
        value,
        addQubit,
        showError,
        setShowError,
        addedQubits,
        entangledPairs
    };
};


const Knapsack = ({initialCapacity, roundId}) => {

    const { 
        capacity,
        weight,
        value,
        addQubit,
        showError,
        setShowError,
        addedQubits,
        entangledPairs
    } = useKnapsack(initialCapacity, roundId);

    const numQubits = 16;
    const qubits = Array.from({ length: numQubits }, (_, i) => (
        <Qubit key={i} id={i} onSelect={addQubit} />
    ));
    

    const ErrorModal = ({ open, onClose }) => (
        <Modal open={open} onClose={onClose}>
            <Box className="modal-error-box">
                <Typography variant="h6" component="h2">
                    Error
                </Typography>
                <Typography sx={{ mt: 3 }}>
                    Capacity exceeded! Cannot add this qubit to knapsack.
                </Typography>
            </Box>
        </Modal>
    );
    

    return (
        <div className="game-container">
            <div className="knapsack-container">

                <Box component="section" className="knapsack-box" textAlign="center">
                    <BackpackIcon sx={{ fontSize: 70, color: "primary.main" }} />
                    <Typography variant="h5" mt={1}>My Knapsack</Typography>
                    <div className="knapsack-stats">
                        <p><strong>Capacity:</strong> {capacity}</p>
                        <p><strong>Weight:</strong> {weight}</p>
                        <p><strong>Value:</strong> {value}</p>
                        {/* <p><strong>Qubits:</strong> {qubits.length}</p> */}
                    </div>
                </Box>

                <Grid className="qubit-container" container spacing={2}>
                    {qubits}
                </Grid>

            </div>

            <ErrorModal open={showError} onClose={() => setShowError(false)}/>
        </div>
    );
};

export default Knapsack;