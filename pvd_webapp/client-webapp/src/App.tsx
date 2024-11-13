import React, { useState } from 'react';
import Start from './Start';
import Home from './Home';
import Contact from './Contact';
import Header from './Header';
import Submit from './Submit';
import Project from './Pvdx';
import Map from './Map';
import Cad from './Cad';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('start'); // Set initial page

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  const navigateToContact = () => {
    setCurrentPage('contact');
  };

  const navigateToSubmit = () => {
    setCurrentPage('submit');
  };

  const navigateToProject = () => {
    setCurrentPage('project');
  };

  const navigateToMap = () => {
    setCurrentPage('map');
  };

  const navigateToCad = () => {
    setCurrentPage('cad');
  };

  return (
    <div>
      {currentPage !== 'start' && <Header onNavigate={navigateToHome} onContact={navigateToContact} onSubmit={navigateToSubmit} onProject={navigateToProject} />}
      {currentPage === 'start' && <Start onNavigate={navigateToHome} />}
      {currentPage === 'home' && <Home onMap={navigateToMap} onCad={navigateToCad}/>}
      {currentPage === 'contact' && <Contact/>}
      {currentPage === 'submit' && <Submit/>}
      {currentPage === 'project' && <Project/>}
      {currentPage === 'map' && <Map/>}
      {currentPage === 'cad' && <Cad/>}
    </div>
  );
};

export default App;










