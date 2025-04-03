import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const Welcome = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <Modal open={isVisible} onClose={() => setIsVisible(false)}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" component="h2">
                    Round 1: Superposition
                </Typography>

                <Typography sx={{ mt: 3 }}>
                    To get started, let's learn about superposition. Quantum computing is powerful because quantum bits (qubits) 
                    leverage superposition, the quality of existing in multiple states simultaneously.
                </Typography>

                <Typography sx={{ mt: 3, mb: 3 }}>
                    In our game, each qubit has a fixed weight and a value in superposition. Our goal is to add qubits to our
                    knapsack to maximize our total value, without exceeding the weight capacity!
                </Typography>

                <Button 
                    variant="contained" 
                    onClick={() => setIsVisible(false)}>
                        Let's try!
                </Button>
            </Box>
        </Modal>
    );
};

export default Welcome;