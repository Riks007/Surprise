// Balloon.tsx
import React from 'react';

interface BalloonProps {
  position: string;
}

const Balloon: React.FC<BalloonProps> = ({ position }) => {
  return (
    <div
      className="absolute"
      style={{
        bottom: position,
        //left: Math.random() * 100 + "vw",
        transition: 'bottom 2s ease-in',
      }}
    >
      <img src="/balloon.png" alt="Balloon" style={{ width: "50px" }} />
    </div>
  );
};

export default Balloon;