import { Container } from '@material-ui/core';
import React from 'react';

const LeverageSideCart = ({props}) => {
    console.log(props)

    return (
        <Container>
            <Container className="ui card fluid"> 
                <div className="content">
                    <h2 className="ui header">Pool Information</h2>
                    <div className="ui vertical menu fluid">
                        <a className="teal item active">
                            Total Value Locked (UST)
                            <div className="ui teal label">TODO</div>
                        </a>
                        <a className="item">
                            Total Minted Value (UST)
                            <div className="ui label">TODO</div>
                        </a>
                        <a className="item">
                            Leverage Amount
                            <div className="ui label">{props.leveragedPoolInfo.leverage_amount}X</div>
                        </a>
                        <a className="item">
                            Volume (24 Hrs)
                            <div className="ui label">TODO</div>
                        </a>    
                        <a className="item">
                            Protocol Ratio
                            <div className="ui label">TODO</div>
                        </a> 
                        <a className="item">
                            Rebalance Ratio
                            <div className="ui label">{props.leveragedPoolInfo.rebalance_ratio}</div>
                        </a>    
                        <a className="item">
                            Min Protocol Ratio
                            <div className="ui label">{props.leveragedPoolInfo.minimum_protocol_ratio}</div>
                        </a>  
                        <a className="item">
                            Leverage Mint Fee
                            <div className="ui label">0.{props.leveragedPoolInfo.mint_premium}%</div>
                        </a>                   
                        </div>  
                    </div>
                </Container>
        </Container>
        
    );
}
 
export default LeverageSideCart;