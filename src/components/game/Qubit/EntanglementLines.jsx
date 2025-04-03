import React from 'react';

const EntanglementLines = ({ qubits, entangledPairs }) => {
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'visible'
      }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {entangledPairs.map((pair, index) => {
        const qubit1 = qubits[pair[0]];
        const qubit2 = qubits[pair[1]];
        
        if (!qubit1 || !qubit2) return null;

        return (
          <g key={index}>
            <line
              x1={qubit1.position.x}
              y1={qubit1.position.y}
              x2={qubit2.position.x}
              y2={qubit2.position.y}
              stroke="rgba(0, 255, 0, 0.8)"
              strokeWidth="4"
              strokeDasharray="10,10"
              filter="url(#glow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;20"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
          </g>
        );
      })}
    </svg>
  );
};

export default EntanglementLines; 