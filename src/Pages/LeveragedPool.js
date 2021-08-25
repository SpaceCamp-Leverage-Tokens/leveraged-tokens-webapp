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
           
           <div class="ui card fluid">
                <div class="content">
                    <div class="ui cards">
                        <div class="ui card fluid">
                            <div class="content">
                            <div class="header">
                                Liquidity Provider / Hedged Position
                            </div>
                            </div>
                            <div class="extra content">
                            <div class="ui two buttons">
                                <div class="ui basic green button">Add Liquidity</div>
                                <div class="ui basic red button">Remove Liquidity</div>
                            </div>
                            </div>
                        </div>
                        <div class="ui card fluid">
                            <div class="content">
                            <div class="header">
                                Leveraged Position
                            </div>
                            </div>
                            <div class="extra content">
                            <div class="ui two buttons">
                                <div class="ui basic green button">Take Leverage</div>
                                <div class="ui basic red button">Close Leverage</div>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
       </div>
    );
}
 
export default LeveragedPool;