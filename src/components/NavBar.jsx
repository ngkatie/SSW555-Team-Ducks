import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import roundContent from '../components/game/Rounds/roundContent.json';

const rounds = [1,2,3]

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentRound = location.pathname.match(/\/round\/(\d+)/)?.[1];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRoundSelect = (round) => {
    navigate(`/round/${round}`);
    handleMenuClose();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Quantum Knapsack
        </Typography>

        <IconButton size="large" edge="end" color="inherit" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {rounds.map((round) => (
            <MenuItem
              key={round}
              selected={currentRound === String(round)}
              onClick={() => handleRoundSelect(round)}
            >
              {roundContent[round].title}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
