import React, {useState, useEffect} from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import Qubit from '../Qubit/Qubit';
import FinalizeButton from '../FinalizeButton';
import './Knapsack.css';

const useKnapsack = (initialCapacity = 100) => {
    const [capacity, setCapacity] = useState(initialCapacity);
    const [weight, setWeight] = useState(0);
    const [value, setValue] = useState(0);
    const [qubits, setQubits] = useState([]);
    const [showError, setShowError] = useState(false);
    const [isFinalized, setIsFinalized] = useState(false);
    const [addedQubitIds, setAddedQubitIds] = useState(new Set());

    const addQubit = (qubit) => {
        if (isFinalized) return false;
        
        if (weight + qubit.weight > capacity) {
            setShowError(true);
            return false;
        }

        setWeight(currentWeight => currentWeight + qubit.weight);
        setValue(currentValue => currentValue + qubit.value);
        setQubits(prevQubits => [...prevQubits, qubit]);
        setAddedQubitIds(prev => new Set([...prev, qubit.id]));
        return true;
    };

    const removeQubit = (qubit) => {
        if (isFinalized) return false;

        setWeight(currentWeight => currentWeight - qubit.weight);
        setValue(currentValue => currentValue - qubit.value);
        setQubits(prevQubits => prevQubits.filter(q => q.id !== qubit.id));
        setAddedQubitIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(qubit.id);
            return newSet;
        });
        return true;
    };

    const handleFinalize = () => {
        setIsFinalized(true);
    };

    return { 
        capacity, 
        weight, 
        value, 
        qubits, 
        addQubit,
        removeQubit,
        showError, 
        setShowError,
        isFinalized,
        handleFinalize,
        addedQubitIds
    };
}

const Knapsack = ({initialCapacity}) => {
    const { 
        capacity, 
        weight, 
        value, 
        addQubit,
        removeQubit,
        showError, 
        setShowError,
        isFinalized,
        handleFinalize,
        addedQubitIds
    } = useKnapsack(initialCapacity);

    const [qubitStates, setQubitStates] = useState({}); // Track individual qubit states

    const numQubits = 20;
    const qubits = Array.from({ length: numQubits }, (_, i) => {
        const qubit = { 
            id: i,
            value: Math.floor(Math.random() * 50), 
            weight: Math.random() > 0.5 ? 10 : 5 
        };

        const handleSelect = () => {
            if (!qubitStates[i]) {
                if (addQubit(qubit)) {
                    setQubitStates(prev => ({ ...prev, [i]: true }));
                }
            } else {
                if (removeQubit(qubit)) {
                    setQubitStates(prev => ({ ...prev, [i]: false }));
                }
            }
        };

        return (
            <Qubit 
                key={i} 
                onSelect={handleSelect}
                onRemove={handleSelect}
                isAdded={qubitStates[i] || false}
            />
        );
    });

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
                    </div>
                    <FinalizeButton 
                        isFinalized={isFinalized}
                        onFinalize={handleFinalize}
                    />
                </Box>

                <Grid container spacing={2} sx={{ maxWidth: '800px', margin: '0 auto' }}>
                    {qubits}
                </Grid>
            </Grid>

            <ErrorModal open={showError} onClose={() => setShowError(false)}/>
        </div>
    );
};

export default Knapsack;