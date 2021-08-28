import React, { useState } from 'react';
import HomeChartCard from '../Components/HomeChartCard';
import {Container} from 'semantic-ui-react';
import "./css/Home.css"
import ActivePools from '../Components/ActivePools';
import { LCDClient, Coin } from '@terra-money/terra.js';
import { mockAllContractsIds } from '../Helpers/QueryHelper';

const Home = ( ) => {
    const DummyTlv=[
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 }
    ]
    const DummyGov=[
      { x: 1, y: 2 },
      { x: 2, y: 2.4 },
      { x: 3, y: 3.9 },
      { x: 4, y: 4 },
      { x: 5, y: 3.8 }
    ]
    const DummyVol=[
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 4.2 }
    ]

      
  // const terra = new LCDClient({
  //   URL: 'https://tequila-lcd.terra.dev',
  //   chainID: 'tequila-0004',
  // });
  
  // To use LocalTerra

  const terra = new LCDClient({
    URL: 'http://localhost:1317',
    chainID: 'localterra'
  });

  // TODO:  
  // factoryAddr = someTerraAddress

  // allContractsJSON = terra.wasm.contractQuery(factoryAddr....)

  // const mockAllContractsIds = ["terra1mdsrlfcsttduvcs35dhc8cm99c4v752he3s86w"]
  const props = {contractIds: mockAllContractsIds, terra:terra}

    return (
        <div className="App">
          <Container>
            <Container id="HomeCharts">
              <HomeChartCard className="Chart" Title={"Total Value Locked"} Data={DummyTlv} />
              <HomeChartCard className="Chart" Title={"Trade Volume"} Data={DummyVol}/>
              <HomeChartCard className="Chart" Title={"Governance Token Price"} Data={DummyGov}/>
            </Container>
            
            <ActivePools props={props}/>

          </Container>
          
          
      </div>
    );
}
 
export default Home;