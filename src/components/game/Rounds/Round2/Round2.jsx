import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const Round2 = () => {
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
                    Round 2: Entanglement
                </Typography>

                <Typography sx={{ mt: 3 }}>
                    Now that you've seen superposition in action, let's dive into entanglement, another key principle in quantum computing. Entanglement is a special connection between qubits where the state of one instantly influences the state of another, no matter how far apart they are.
                </Typography>

                <Typography sx={{ mt: 3, mb: 3 }}>
                    In our game, some qubits are entangled. When you add one to your knapsack, its partner will automatically adjust to match. Your challenge is to think strategically about how these linked pairs impact your total value and capacity!
                </Typography>

                <Button 
                    variant="contained" 
                    onClick={() => setIsVisible(false)}>
                        Let's try!
                </Button>
            </Box>
        </Modal>
    );
}

export default Round2;