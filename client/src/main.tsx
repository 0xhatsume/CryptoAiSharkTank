import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// wallets
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import {
  createConfig,
  WagmiProvider,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet, localhost, flowMainnet, sepolia, arbitrumSepolia } from 'viem/chains';

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";

const config = createConfig({
  chains: [mainnet, localhost, flowMainnet, sepolia, arbitrumSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [localhost.id]: http(),
    [flowMainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});
  
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DynamicContextProvider

      
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
        
        walletConnectors: [EthereumWalletConnectors, FlowWalletConnectors],
      }}
    >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <div className="dark">
                <App />
                </div>
              </DynamicWagmiConnector>
            </QueryClientProvider>
          </WagmiProvider> 
    </DynamicContextProvider>
  </React.StrictMode>
);
