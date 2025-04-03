import React, { useState, useEffect } from "react";
import { Card, CardContent, Badge } from "@mui/material";
import { motion } from "framer-motion";
import "./Qubit.css"

const Qubit = ({ onSelect }) => {
  const [value, setValue] = useState(Math.random() * 50);
  const [isFixed, setIsFixed] = useState(false);
  const weight = 1; // Fixed weight

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
    onSelect({value, weight});
  }

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
    <Badge badgeContent={"+"} color="success" overlap="circular" onClick={handleSelect}>
      <Card sx={{
        width: 100,
        height: 100,
        border: 1,
        borderRadius: '50%'
      }}>
        <CardContent>
          <motion.div
            className="text-2xl font-mono mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            {value.toFixed(2)}
          </motion.div>
          <p>Weight: {weight}</p>
        </CardContent>
      </Card>
    </Badge>
  );
};

export default Qubit;
