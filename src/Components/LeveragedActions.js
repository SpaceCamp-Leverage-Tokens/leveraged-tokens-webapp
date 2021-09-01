import React from 'react';
import LiquidityCard from './LiquidityCard';
import LeverageCard from './LeverageCard';
import "./css/LeveragedActions.css"
import { useHistory } from "react-router-dom";
import { Button } from 'semantic-ui-react'

const LeveragedActions = ( {props} ) => {
    const history = useHistory();

    return (
        <div className="ui card fluid">
            <Button  
            className="teal ui button"
            onClick={() => { history.push({
                pathname:'/leveragedAsset',
                state: props
                }) }} > 
                <h3>{props.assetInfo.symbol}-{props.leveragedPoolInfo.leverage_amount}x Pool</h3>               
                </Button>
                
            <div className="content">
                <div>
                    <LiquidityCard props={props}/>   
                    <hr class="Card-Dividers"/>                     
                    <LeverageCard props={props}/>
                </div>
            </div>
        </div>
    );
}
 
export default LeveragedActions;