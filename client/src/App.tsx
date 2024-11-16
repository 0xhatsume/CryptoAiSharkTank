import React, { useEffect, useState } from 'react';
import { useWebApp } from './hooks/useWebApp';
import { MarketCard, SAMPLE_MARKETS } from '@/components/MarketCard';
import { Navbar } from '@/components/Navbar';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import { sharks } from './constants/sharks';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const { webApp, isReady, isMobileOrTelegram } = useWebApp();
  const [currentSharkIndex, setCurrentSharkIndex] = useState(0);

  console.log("is telegram: ", isMobileOrTelegram)

  // Add auto-rotation effect for carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSharkIndex((prev) => (prev + 1) % sharks.length);
    }, 4000); // Changed from 3000 to 5000 (5 seconds)

    return () => clearInterval(timer);
  }, []);
  
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
    <div className="min-h-screen bg-background relative">
      {/* Background Image */}
      {/* <div 
        className="fixed inset-0 opacity-80 pointer-events-none"
        style={{
          backgroundImage: 'url("/assets/sharksswimming.png")', // Update path
          backgroundPosition: 'center',
          backgroundSize: 'cover',  //fill screen
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#020817', // Dark background color
        }}
      /> */}

      {/* Content */}
      <div className="relative w-full">
        <Navbar isMobileOrTelegram={isMobileOrTelegram} />
        
        <div className={`mx-auto px-4 py-6 max-w-[1400px] w-full`}>

          {/* Search and Filter Section */}
          <div className="mb-6 flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search Projects" 
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Popular
            </Button>
          </div>


        {/* Shark Carousel */}
        <div className="relative w-full h-[300px] overflow-hidden bg-black/20 mb-6 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSharkIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute w-[300px] h-[300px] group cursor-pointer"
            >
              <img
                src={sharks[currentSharkIndex].image}
                alt={sharks[currentSharkIndex].name}
                className="w-full h-full object-contain"
              />
              {/* Hover overlay with strengths */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 overflow-y-auto">
                <div className="text-white space-y-3">
                  <h3 className="font-bold text-lg">{sharks[currentSharkIndex].name}</h3>
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Specialty:</p>
                    <p className="mb-2">{sharks[currentSharkIndex].specialty}</p>
                    
                    <p className="font-semibold mb-1">Strengths:</p>
                    {Object.entries(sharks[currentSharkIndex].strengths).map(([key, value]) => (
                      <div key={key} className="mb-2">
                        <p className="italic">{key}:</p>
                        {typeof value === 'string' ? (
                          <p>{value}</p>
                        ) : (
                          <div className="ml-2">
                            {Object.entries(value as Record<string, string>).map(([subKey, subValue]) => (
                              <p key={subKey} className="mb-1">• {subValue}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Shark name - added group-hover:opacity-0 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 p-2 rounded-lg text-white z-10 
                            transition-opacity duration-300 group-hover:opacity-0">
                {sharks[currentSharkIndex].name}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>


          {/* Markets Section */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Markets</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="politics">Politics</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {SAMPLE_MARKETS.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </TabsContent>
            
            {/* Add other TabsContent for different categories */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default App;