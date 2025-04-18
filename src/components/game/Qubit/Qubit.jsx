import React, { useState, useEffect, use } from "react";
import { Card, CardContent, Badge, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "./Qubit.css"

const Qubit = ({ onSelect }) => {

  const [isHeavy, setIsHeavy] = useState(Math.round(Math.random()));
  const [weight, setWeight] = useState(0);
  const [value, setValue] = useState(Math.floor(Math.random() * 50));
  const [isFixed, setIsFixed] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {

    /* value fluctuates between a static range (0 to 50), and will either fixate to whichever comes first:
      (1) the value at the moment I add it to my knapsack or
      (2) a random integer after 15s
    */

    if (isHeavy) {
      setWeight(10)
    } else {
      setWeight(5)
    }

    if (!isFixed) {
      const interval = setInterval(() => {
        setValue(Math.floor(Math.random() * 50));
      }, 500);
      
      setTimeout(() => clearInterval(interval), 40000);
      
      return () => clearInterval(interval);
    }
  }, [isFixed]);

  const handleSelect = () => {
    setIsFixed(true);
    onSelect({value, weight});
  }

  return (
    <div>
      {isFixed ? 
      <Badge badgeContent={"-"} color="error" overlap="circular" onClick={handleSelect}>

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
                <Typography variant="h5">{value}</Typography>
              </motion.div>
              <p>{isHeavy ? 'Heavy' : 'Light'}</p>
            </CardContent>

          </Card>

        </motion.div>
      
      </Badge> :

      <Badge badgeContent={"+"} color="success" overlap="circular" onClick={handleSelect}>

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
              <Typography variant="h5">{value}</Typography>
            </motion.div>
            <p>{isHeavy ? 'Heavy' : 'Light'}</p>
          </CardContent>

        </Card>

      </motion.div>
    
    </Badge>
    }
    </div>
  );
};

export default Qubit;
