import React from 'react';
import './css/ActivePools.css'
import LeveragedPoolRow from './LeveragedPoolRow';

const ActivePools = ({ props }) => {
    // TODO: Rank according to highest volume
    const contractIds = props.contractIds
    // console.log(props)
    
    const renderLeveragedPoolRow = (leveragedPoolId) => {
        return(
        <LeveragedPoolRow leveragedPoolId={leveragedPoolId} terra={props.terra}/>
        )
    }

    return (
        <div className="ui card fluid">
            <div className="content">
                <div className="Title">
                    <h3 className="ui header">Most Active Pools</h3>
                </div>
            
                <table className="ui selectable inverted large table">
                <thead>
                    <tr>
                    <th>Asset</th>
                    <th>Leverage</th>
                    <th>Volume</th>
                    <th>Protocol Ratio</th>
                    <th>Min Protocol Ratio</th>
                    <th className="right aligned">TLV</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(contractIds).map(renderLeveragedPoolRow)}
                </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default ActivePools;