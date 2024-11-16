import React, { useEffect, useState } from 'react';
import { useWebApp } from './hooks/useWebApp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';


const App = () => {
  const { webApp, isReady, isMobileOrTelegram } = useWebApp();

  console.log("is telegram: ", isMobileOrTelegram)
  
  useEffect(() => {
    if (webApp) {
      webApp.ready();
      webApp.setHeaderColor('#020817');
    }
  }, [webApp]);

  if (!isReady) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar isMobileOrTelegram={isMobileOrTelegram} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;