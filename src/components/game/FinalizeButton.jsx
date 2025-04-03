import React from 'react';
import PropTypes from 'prop-types';

function FinalizeButton({ isFinalized, onFinalize }) {
  return (
    <div>
      <button 
        // Finalize button that calls onFinalize when clicked 
        onClick={onFinalize}
        // Disable button if knapsack is finalized
        disabled={isFinalized}
        className="finalize-button"
      >
        Finalize Knapsack
      </button>
      {isFinalized && (
        // Success message that appears when knapsack is finalized
        <p className="success-message">Knapsack Finalized! Round Complete.</p>
      )}
    </div>
  );
}

FinalizeButton.propTypes = {
  isFinalized: PropTypes.bool.isRequired,
  onFinalize: PropTypes.func.isRequired,
};

export default FinalizeButton; 