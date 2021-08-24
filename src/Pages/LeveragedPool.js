import React from 'react';
import { useLocation } from "react-router-dom";
import LeverageChart from '../Components/LeverageChart';
import {Container} from 'semantic-ui-react';
import LeverageSideCart from '../Components/LeverageSideCart';
import './css/LeveragedPool.css'

const LeveragedPool = ({ props }) => { 
    const location = useLocation();
    console.log(location)

    return (
       <div id='Leveraged Pool'>
           <Container id='Pool-Information'>
                <LeverageChart id='Lev-Chart' props={location.state}/>
                <LeverageSideCart id='Side-Cart' props={location.state}/>
           </Container>
       </div>
    );
}
 
export default LeveragedPool;