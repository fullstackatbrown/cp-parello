import React from 'react';

const Home: React.FC<{ onMap: () => void; onCad: () => void}> = ({ onMap,onCad}) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main content.</p>
      <button
        onClick={onMap}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: 'rgba(129, 132, 140, 0.5)',
          color: '#ffffff',
          marginTop: '250px',
        }}
      >
        Map
      </button>
      <button
        onClick={onCad}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: 'rgba(129, 132, 140, 0.5)',
          color: '#ffffff',
          marginTop: '250px',
        }}
      >
        Cad
      </button>
    </div>
  );
};

export default Home;


