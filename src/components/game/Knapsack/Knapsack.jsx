import React, {useState, useEffect} from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import Qubit from '../Qubit/Qubit';
import './Knapsack.css';

const useKnapsack = (initialCapacity = 100) => {
    const [capacity, setCapacity] = useState(initialCapacity);
    const [weight, setWeight] = useState(0);
    const [value, setValue] = useState(0);
    const [qubits, setQubits] = useState([]);
    const [showError, setShowError] = useState(false);

    const addQubit = (qubit) => {
        // checks if knapsack capacity is exceeded after adding a qubit
        if (weight + qubit.weight > capacity) {
            setShowError(true);
        }

        // setQubits(prevQubits => [...prevQubits, qubit]);
        setWeight(currentWeight => currentWeight + qubit.weight);
        setValue(currentValue => currentValue + qubit.value);
    };

    return { capacity, weight, value, qubits, addQubit, showError, setShowError };
}

const Knapsack = ({initialCapacity}) => {

    const { capacity, weight, value, addQubit, showError, setShowError } = useKnapsack(initialCapacity);

    const numQubits = 10;
    const qubits = Array.from({ length: numQubits }, (_, i) => (
        <Qubit key={i} onSelect={addQubit} />
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
        <div>
            <Grid container className="knapsack-container" sx={{ justifyContent: "center", alignItems: "center" }}>

                <Box component="section" className="knapsack-box">
                    <h2>My Knapsack</h2>
                    <div className="knapsack-stats">
                        <p><strong>Capacity:</strong> {capacity}</p>
                        <p><strong>Weight:</strong> {weight}</p>
                        <p><strong>Value:</strong> {value}</p>
                        {/* <p><strong>Qubits:</strong> {qubits.length}</p> */}
                    </div>
                </Box>

                <Grid container spacing={2}>
                    {qubits}
                </Grid>

            </Grid>

            <ErrorModal open={showError} onClose={() => setShowError(false)}/>
        </div>
    );
};

export default Knapsack;