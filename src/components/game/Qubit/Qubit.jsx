import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Badge } from "@mui/material";
import { motion } from "framer-motion";
import "./Qubit.css"

const Qubit = ({ onSelect, id, entangledWith = [], onEntangle, onPositionChange }) => {
  const [value, setValue] = useState(Math.random() * 50);
  const [isFixed, setIsFixed] = useState(false);
  const qubitRef = useRef(null);
  const weight = 1; // Fixed weight

  useEffect(() => {
    if (!qubitRef.current) return;

    const updatePosition = () => {
      const rect = qubitRef.current.getBoundingClientRect();
      const position = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2
      };
      onPositionChange?.(id, position);
    };

    // Initial position
    updatePosition();

    // Create ResizeObserver to track position changes
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(qubitRef.current);

    // Also update on scroll
    window.addEventListener('scroll', updatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updatePosition);
    };
  }, [id, onPositionChange]);

  useEffect(() => {
    /* value fluctuates between a static range (0 to 50), and will either fixate to whichever comes first:
      (1) the value at the moment I add it to my knapsack or
      (2) a random integer after 15s
    */
    if (!isFixed) {
      const interval = setInterval(() => {
        setValue(Math.random() * 50);
      }, 500);
      
      setTimeout(() => clearInterval(interval), 40000);
      
      return () => clearInterval(interval);
    }
  }, [isFixed]);

  const handleSelect = () => {
    setIsFixed(true);
    onSelect({value, weight, id});
  }

  const handleDoubleClick = () => {
    if (onEntangle) {
      onEntangle(id);
    }
  };

  // Adds qubit to knapsack array
  // const selectQubit = (knapsack) => {
  //   this.clearQubitIntervalID();
  //   knapsack.updateKnapsack(this, 'select');
  //   return this;
  // };

  // Removes qubit from knapsack array
  // const deselectQubit = (knapsack) => {
  //   knapsack.updateKnapsack(this, 'deselect');
  //   return this;
  // };

  return (
    <div ref={qubitRef} style={{ position: 'relative' }}>
      <Badge badgeContent={"+"} color="success" overlap="circular" onClick={handleSelect} onDoubleClick={handleDoubleClick}>
        <Card sx={{
          width: 100,
          height: 100,
          border: 1,
          borderRadius: '50%',
          backgroundColor: entangledWith.length > 0 ? 'rgba(0, 255, 0, 0.2)' : 'white',
          boxShadow: entangledWith.length > 0 ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          <CardContent>
            <motion.div
              className="text-2xl font-mono mt-2"
              animate={{ 
                opacity: entangledWith.length > 0 ? [0.7, 1, 0.7] : [0.5, 1, 0.5],
                scale: entangledWith.length > 0 ? [0.95, 1, 0.95] : 1
              }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              {value.toFixed(2)}
            </motion.div>
            <p>Weight: {weight}</p>
            {entangledWith.length > 0 && (
              <motion.p 
                className="text-xs text-green-600"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                Entangled
              </motion.p>
            )}
          </CardContent>
        </Card>
      </Badge>
    </div>
  );
};

export default Qubit;
