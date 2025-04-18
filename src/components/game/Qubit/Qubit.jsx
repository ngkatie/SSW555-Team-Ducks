import React, { useState, useEffect } from "react";
import { Card, CardContent, Badge, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "./Qubit.css"

const Qubit = ({ onSelect, onRemove, isAdded: propIsAdded, initialValue, initialWeight }) => {
  const [isHeavy, setIsHeavy] = useState(initialWeight === 10);
  const [weight, setWeight] = useState(initialWeight);
  const [displayValue, setDisplayValue] = useState(initialValue);
  const [frozenValue, setFrozenValue] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isAdded, setIsAdded] = useState(propIsAdded);

  // Update local state when prop changes
  useEffect(() => {
    setIsAdded(propIsAdded);
    setIsFixed(propIsAdded);
  }, [propIsAdded]);

  useEffect(() => {
    if (!isFixed) {
      const interval = setInterval(() => {
        // Generate a new random value for display while in superposition
        setDisplayValue(Math.floor(Math.random() * 50));
      }, 500);
      
      setTimeout(() => clearInterval(interval), 40000);
      
      return () => clearInterval(interval);
    }
  }, [isFixed]);

  useEffect(() => {
    setIsHeavy(initialWeight === 10);
  }, [initialWeight]);

  const handleSelect = () => {
    // Freeze the current displayed value at the moment of selection
    const currentValue = displayValue;
    setFrozenValue(currentValue);
    setIsFixed(true);
    
    const qubit = { value: currentValue, weight };
    if (!isAdded) {
      onSelect(qubit);
    } else {
      onRemove(qubit);
    }
  }

  return (
    <div>
      <Badge 
        badgeContent={isAdded ? "-" : "+"} 
        color={isAdded ? "error" : "success"} 
        overlap="circular" 
        onClick={handleSelect}
      >
        <motion.div
          style={{ width: 100, height: 100, border: 1, borderRadius: '50%' }}
          animate={isFixed ? {} : { boxShadow: [
            "0px 0px 10px rgba(0, 255, 255, 0.5)",
            "0px 0px 40px rgba(0, 255, 255, 0.8)",
            "0px 0px 10px rgba(0, 255, 255, 0.5)"
          ] }}
          transition={isFixed ? {} : { repeat: Infinity, duration: 1 }}
        >
          <Card sx={{ width: 100, height: 100, border: 1, borderRadius: '50%' }}>
            <CardContent>
              <motion.div
                className="text-2xl font-mono mt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Typography variant="h5">{isFixed ? frozenValue : displayValue}</Typography>
              </motion.div>
              <p>{isHeavy ? 'Heavy' : 'Light'}</p>
            </CardContent>
          </Card>
        </motion.div>
      </Badge>
    </div>
  );
};

export default Qubit;
