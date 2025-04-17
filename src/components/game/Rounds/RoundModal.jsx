import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const RoundModal = ({title, explanations, buttonLabel}) => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <Modal open={isVisible} onClose={() => setIsVisible(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    color: "text.primary",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>

                {explanations.map((text, idx) => (
                    <Typography key={idx} sx={{ mt: idx === 0 ? 3 : 2, mb: idx === explanations.length - 1 ? 3 : 0 }}>
                        {text}
                    </Typography>
                ))}

                <Button variant="contained" onClick={() => setIsVisible(false)}>
                    {buttonLabel}
                </Button>
            </Box>
        </Modal>
    );
};

export default RoundModal;