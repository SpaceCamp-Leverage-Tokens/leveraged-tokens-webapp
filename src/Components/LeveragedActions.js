import React from 'react';
import { Container } from '@material-ui/core';
import LiquidityCard from './LiquidityCard';
import LeverageCard from './LeverageCard';
import "./css/LeveragedActions.css"
import { useHistory } from "react-router-dom";
import { Button, Form, Input } from 'semantic-ui-react'

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
                <h3>{props.assetName}-{props.poolLeverage}x Pool </h3>               
                </Button>
                
            <div className="content">
                <div>
                    <LiquidityCard props={props}/>   
                    <hr class="solid"/>                     
                    <LeverageCard props={props}/>
                </div>
            </div>
        </div>
    );
}
 
export default LeveragedActions;