import React from 'react';

const Logo: React.FC = () => {
  const logoStyle: React.CSSProperties = {
    display: 'inline-block'
  };

  const logoImageStyle: React.CSSProperties = {
    width: '50px', // Adjust the width as needed
    height: 'auto' // Maintain aspect ratio
  };

  return (
    <div style={logoStyle}>
      <img src="/logo.png" alt="Logo" style={logoImageStyle} />
    </div>
  );
}

export default Logo;
