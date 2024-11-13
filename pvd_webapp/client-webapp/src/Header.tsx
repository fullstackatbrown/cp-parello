import React from 'react';

const Header: React.FC<{ onNavigate: () => void; onContact: () => void; onSubmit: () => void; onProject: () => void}> = ({ onNavigate,onContact,onSubmit,onProject}) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        color: 'white',
      }}
    >
      <div>
      <img
          src="/logo2.png" 
          alt="Logo"
          style={{ height: '50px' }}
        />
      </div>
      <nav>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate();
          }}
          style={{ marginRight: '15px', color: 'white' }}
        >
          Home
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onProject();
          }}
          style={{ marginRight: '15px', color: 'white' }}
        >
          PVDX
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          style={{ marginRight: '15px', color: 'white' }}
        >
          Code Submission
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onContact();
          }}
          style={{ marginRight: '15px', color: 'white' }}
        >
          About Us
        </a>

      </nav>
    </header>
  );
};

export default Header;


