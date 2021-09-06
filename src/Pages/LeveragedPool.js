import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import LeverageChart from '../Components/LeverageChart';
import {Container} from 'semantic-ui-react';
import LeverageSideCart from '../Components/LeverageSideCart';
import './css/LeveragedPool.css'
import LeveragedActions from '../Components/LeveragedActions';
import { LCDClient } from '@terra-money/terra.js';


const LeveragedPool = ({ props }) => { 
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
    },[isLoading])

    const location = useLocation();
    return (
       <Container id='Leveraged-Pool'>
           <Container id='Pool-Information'>
                <LeverageChart id='Lev-Chart' props={location.state}/>
                <LeverageSideCart id='Side-Cart' props={location.state}/>
           </Container>
           
           <LeveragedActions props={location.state} isLoading={isLoading} setIsLoading={setIsLoading}/>      
       </Container>
    );
}
 
export default LeveragedPool;