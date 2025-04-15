import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DecoherenceEffect.css';

const DecoherenceEffect = ({ isActive, onComplete }) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShake(true);
      const timer = setTimeout(() => {
        setShake(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <motion.div
      className={`decoherence-overlay ${isActive ? 'active' : ''}`}
      animate={
        shake ? {
          x: [0, -10, 10, -10, 10, 0],
          y: [0, 10, -10, 10, -10, 0],
        } : {}
      }
      transition={{
        duration: 0.5,
        repeat: 3,
        repeatType: 'reverse',
      }}
    >
      <motion.div
        className="decoherence-message"
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0 }}
      >
        DECOHERENCE EVENT DETECTED!
      </motion.div>
    </motion.div>
  );
};

DecoherenceEffect.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onComplete: PropTypes.func,
};

export default DecoherenceEffect;
