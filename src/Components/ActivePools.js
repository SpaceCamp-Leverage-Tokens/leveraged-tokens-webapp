import React from 'react';
import { useHistory } from "react-router-dom";
import './css/ActivePools.css'
import LeveragedPoolRow from './LeveragedPoolRow';

const ActivePools = () => {
    const history = useHistory();

    // TODO: Rank according to highest volume
    const Data = [
        {assetName:"LUNA",poolLeverage:3,volume:40123,tlv:221000,pr:4,mpr:3,rbr:3.5,tmv:50000},
        {assetName:"mTSLA",poolLeverage:2,volume:1323,tlv:20000,pr:6,mpr:3,rbr:3.5,tmv:1290},
        {assetName:"mAPPL",poolLeverage:3,volume:466,tlv:30000,pr:3.4,mpr:2.5,rbr:3,tmv:1200},
    ]

    const renderLeveragedPoolRow = (leveragedPool) => {
        return(
        <LeveragedPoolRow leveragedPool={leveragedPool}/>
        )
    }

    return (
        <div className="ui card fluid">
            <div className="content">
            <h3 className="ui header">Most Active Pools</h3>
                <table className="ui selectable inverted table small">
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
                    {Object.values(Data).map(renderLeveragedPoolRow)}
                </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default ActivePools;