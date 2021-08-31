import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Navigation from './Pages/Navigation';
import LeveragedPool from './Pages/LeveragedPool'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import MyPortfolio from './Pages/MyPortfolio';
import {
  NetworkInfo,
  WalletProvider,
  WalletStatus,
} from '@terra-money/wallet-provider';

function App() {
  const mainnet = {
    name: 'mainnet',
    chainID: 'columbus-4',
    lcd: 'https://lcd.terra.dev',
  };
  
  const testnet = {
    name: 'testnet',
    chainID: 'tequila-0004',
    lcd: 'https://tequila-lcd.terra.dev',
  };

  // WalletConnect separates chainId by number.
  // Currently TerraStation Mobile uses 0 as Testnet, 1 as Mainnet.
  const walletConnectChainIds = {
    0: testnet,
    1: mainnet,
  };


  return (
    <div className="App">
      <WalletProvider
      defaultNetwork={mainnet}
      walletConnectChainIds={walletConnectChainIds}
    >
      <div>
      <script
  crossorigin
  src="https://unpkg.com/@terra-money/terra.js/dist/bundle.js"
></script>
          <BrowserRouter>
          <div>
            <Navigation />
              <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/about" component={About}/>
              <Route path="/MyPortfolio" component={MyPortfolio}/>
              <Route path="/leveragedAsset" component={LeveragedPool}/>
            </Switch>
          </div> 
        </BrowserRouter>
      </div>
      </WalletProvider>
    </div>
  );
}

export default App;
