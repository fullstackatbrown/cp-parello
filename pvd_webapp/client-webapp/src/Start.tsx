import React from 'react';

interface StartProps {
  onNavigate: () => void;
}

const Start: React.FC<StartProps> = ({ onNavigate }) => {
  return (
    <div
      style={{
        backgroundImage: "url('/start.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={onNavigate}
        style={{
          padding: '10px 30px',
          fontSize: '18px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: 'rgba(129, 132, 140, 0.5)',
          color: '#ffffff',
          marginTop: '250px',
        }}
      >
        Make Space Accesible
      </button>
    </div>
  );
};

export default Start;


