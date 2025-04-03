import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const Round3 = () => {
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
                    Round 3: Decoherence
                </Typography>

                <Typography sx={{ mt: 3 }}>
                    You've mastered superposition and explored entanglement, and now it's time to face decoherence. In the real world, quantum systems are fragile. Decoherence happens when outside forces disrupt qubits, causing them to lose their quantum properties.
                </Typography>

                <Typography sx={{ mt: 3, mb: 3 }}>
                    In this round, random decoherence events may occur, reducing your knapsack's capacity. You'll need to adapt quickly, making smart choices even as the system shifts beneath you. Stay alert and plan carefully to overcome the noise!
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

export default Round3;