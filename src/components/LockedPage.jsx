import React from "react";
import { Box, Typography, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LockedPage = ({ roundNum }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
        bgcolor: '#f3f4f6',
        borderRadius: 4,
        boxShadow: 3
      }}
    >
      <Box sx={{ maxWidth: 500 }}>
        <LockIcon sx={{ fontSize: 64, color: '#9e9e9e' }} />
        
        <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
          Oops! Round {roundNum} is Locked
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
          Try the previous round(s) before unlocking this one. Mastering the foundations will help
          us build up to more complex quantum concepts!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={history.back()}
        >
          Back to Previous Rounds
        </Button>
      </Box>
    </Box>
  );
};

export default LockedPage;
