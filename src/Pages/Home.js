import React, { useState } from 'react';
import HomeChartCard from '../Components/HomeChartCard';
import {Container} from 'semantic-ui-react';
import "./css/Home.css"
import ActivePools from '../Components/ActivePools';

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
    return (
        <div className="App">
          <Container id="HomeCharts">
            <HomeChartCard className="Chart" Title={"Total Value Locked"} Data={DummyTlv} />
            <HomeChartCard className="Chart" Title={"Trade Volume"} Data={DummyVol}/>
            <HomeChartCard className="Chart" Title={"Governance Token Price"} Data={DummyGov}/>
          </Container>
          
          <ActivePools>
          </ActivePools>
          
      </div>
    );
}
 
export default Home;