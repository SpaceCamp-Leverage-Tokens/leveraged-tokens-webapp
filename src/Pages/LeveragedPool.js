import React from 'react';
import { useLocation } from "react-router-dom";
import LeverageChart from '../Components/LeverageChart';
import {Container} from 'semantic-ui-react';
import LeverageSideCart from '../Components/LeverageSideCart';
import './css/LeveragedPool.css'
import LeveragedActions from '../Components/LeveragedActions';
import { LCDClient, Coin } from '@terra-money/terra.js';

const LeveragedPool = ({ props }) => { 
    const location = useLocation();
    console.log(location)
    //  const terra = new LCDClient({
    //     URL: 'https://tequila-lcd.terra.dev',
    //     chainID: 'tequila-0004',
    //   });
    
    //   To use LocalTerra

    const terra = new LCDClient({
    URL: 'http://localhost:1317',
    chainID: 'localterra'
    });

    return (
       <Container id='Leveraged-Pool'>
           <Container id='Pool-Information'>
                <LeverageChart id='Lev-Chart' props={location.state}/>
                <LeverageSideCart id='Side-Cart' props={location.state}/>
           </Container>
           
           <LeveragedActions props={location.state}/>      
       </Container>
    );
}
 
export default LeveragedPool;