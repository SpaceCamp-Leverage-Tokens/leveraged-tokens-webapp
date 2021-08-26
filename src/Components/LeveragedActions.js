import React from 'react';
import { Container } from '@material-ui/core';
import LiquidityCard from './LiquidityCard';
import LeverageCard from './LeverageCard';

const LeveragedActions = ( {props} ) => {

    console.log(props)

    return (
        <div className="ui card fluid">
            <h2 className="ui header centered">{props.assetName}-{props.poolLeverage}x Pool</h2>
            <div className="content">
                <div className="ui cards">
                    <div className="ui card fluid">
                        <div className="content">
                            <LiquidityCard props={props}/>
                        </div>
                        
                    </div>
                    <div className="ui card fluid">
                        <div className="content">
                            <LeverageCard props={props}/>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    );
}
 
export default LeveragedActions;