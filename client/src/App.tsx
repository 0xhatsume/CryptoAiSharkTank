import React, { useEffect, useState } from 'react';
import { useWebApp } from './hooks/useWebApp';

const App = () => {
  const { webApp, isReady, isMobileOrTelegram } = useWebApp();
  
  useEffect(() => {
    if (webApp) {
      webApp.ready();
      webApp.setHeaderColor('#0C2054');
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
    <div className={`min-h-screen w-full ${isMobileOrTelegram ? 'max-w-lg' : 'max-w-7xl'} mx-auto px-4 py-6`}>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Telegram Web App</h1>
      </header>
      
      <main className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
          <p className="text-gray-600">
            This is your new Telegram Web App. Start building your features here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;