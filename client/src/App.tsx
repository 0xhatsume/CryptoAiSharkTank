import React, { useEffect, useState } from 'react';
import { useWebApp } from './hooks/useWebApp';
import { motion } from 'framer-motion';
import { MarketCard, SAMPLE_MARKETS } from '@/components/MarketCard';


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const App = () => {
  const { webApp, isReady, isMobileOrTelegram } = useWebApp();
  
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
    // <div className={`min-h-screen w-full ${isMobileOrTelegram ? 'max-w-lg' : 'max-w-7xl'} mx-auto px-4 py-6`}>
    //   <header className="mb-6">
    //     <h1 className="text-2xl font-bold">Telegram Web App</h1>
    //   </header>
      
    //   <main className="space-y-4">
    //     <div className="bg-white rounded-lg shadow p-4">
    //       <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
    //       <p className="text-gray-600">
    //         This is your new Telegram Web App. Start building your features here.
    //       </p>
    //     </div>
    //   </main>
    // </div>

    <div className="min-h-screen bg-background">
      <div className={`${isMobileOrTelegram ? 'max-w-lg' : 'max-w-7xl'} mx-auto px-4 py-6`}>
        {/* Search and Filter Section */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search markets" 
              className="pl-9"
            />
          </div>
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Popular
          </Button>
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
  );
};

export default App;