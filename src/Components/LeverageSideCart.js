import { Container } from '@material-ui/core';
import React from 'react';
import { VictoryChart, VictoryLegend, VictoryAxis, VictoryScatter, VictoryTooltip, VictoryLine} from "victory";

const LeverageSideCart = ({props}) => {
    
    return (
        <Container>
            <div class="ui card fluid"> 
                <div class="content">
                    <h2 class="ui header">Pool Information</h2>
                    <div class="ui vertical menu fluid">
                        <a class="teal item active">
                            Total Value Locked (UST)
                            <div class="ui teal label">{props.tlv}</div>
                        </a>
                        <a class="item">
                            Total Minted Value (UST)
                            <div class="ui label">51</div>
                        </a>
                        <a class="item">
                            Leverage Amount
                            <div class="ui label">{props.poolLeverage}</div>
                        </a>
                        <a class="item">
                            Volume (24 Hrs)
                            <div class="ui label">{props.volume}</div>
                        </a>    
                        <a class="item">
                            Protocol Ratio
                            <div class="ui label">{props.pr}</div>
                        </a> 
                        <a class="item">
                            Rebalance Ratio
                            <div class="ui label">1</div>
                        </a>    
                        <a class="item">
                            Min Protocol Ratio
                            <div class="ui label">{props.mpr}</div>
                        </a>                   
                        </div>  
                    </div>
                </div>
        </Container>
        
    );
}
 
export default LeverageSideCart;