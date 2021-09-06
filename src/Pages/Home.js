import React, { useState, useEffect } from 'react';
import HomeChartCard from '../Components/HomeChartCard';
import {Container} from 'semantic-ui-react';
import "./css/Home.css"
import ActivePools from '../Components/ActivePools';
import { LCDClient } from '@terra-money/terra.js';
import { PoolFactory } from '../Helpers/QueryHelper';
import ResetReferenceCard from '../Components/ResetReferenceCard';
import { localTerraObj } from '../Helpers/QueryHelper';
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

  const [factory, setFactory] = useState({poolIds:[],lastRestampTime:0})

  useEffect( ()=> {
    getFactory();
  },[]);

  const terra = new LCDClient(localTerraObj);

  async function getFactory(){        
    const myPoolFactory = await new PoolFactory(terra);
    console.log(myPoolFactory)
    setFactory(myPoolFactory)
  }

  const props = {contractIds: factory.poolIds, terra:terra}

    return (
        <div className="App">
          <Container>
            <Container id="HomeCharts">
              <HomeChartCard className="Chart" Title={"Total Value Locked"} Data={DummyTlv} />
              <HomeChartCard className="Chart" Title={"Trade Volume"} Data={DummyVol}/>
              <HomeChartCard className="Chart" Title={"Governance Token Price"} Data={DummyGov}/>
              <ResetReferenceCard className="Chart" Title={"Reset Leverage Price points"} Factory={factory}/>
            </Container>
            
            <ActivePools className="Active-Pools" props={props}/>

          </Container>
          
          
      </div>
    );
}
 
export default Home;