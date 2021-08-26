import React from 'react';
import { Container } from '@material-ui/core';
import LiquidityCard from './LiquidityCard';
import LeverageCard from './LeverageCard';
import "./css/LeveragedActions.css"

const LeveragedActions = ( {props} ) => {

    return (
        <div className="ui card fluid">
            <h2 className="ui header centered">{props.assetName}-{props.poolLeverage}x Pool</h2>
            <div className="content">
                <div className="ui cards">
                    <LiquidityCard props={props}/>   
                    <hr class="solid"/>                     
                    <LeverageCard props={props}/>
                </div>
            </div>
        </div>
    );
}
 
export default LeveragedActions;