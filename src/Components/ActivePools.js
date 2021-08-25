import React from 'react';
import { useHistory } from "react-router-dom";
import './css/ActivePools.css'
import LeveragedPoolRow from './LeveragedPoolRow';

const ActivePools = () => {
    const history = useHistory();

    // TODO: Rank according to highest volume
    const Data = [
        {assetName:"LUNA",poolLeverage:3,volume:"40,123 UST",tlv:"221k",pr:4,mpr:3,rbr:3.5,tmv:"50k"},
        {assetName:"MIR",poolLeverage:3,volume:"10,123 UST",tlv:"120k",pr:3.5,mpr:3,rbr:3.2,tmv:"3k"},
        {assetName:"mTSLA",poolLeverage:2,volume:"1,323 UST",tlv:"20k",pr:6,mpr:3,rbr:3.5,tmv:"129"},
        {assetName:"mAPPL",poolLeverage:3,volume:"466 UST",tlv:"30k",pr:3.4,mpr:2.5,rbr:3,tmv:"120k"},
    ]

    const renderLeveragedPoolRow = (leveragedPool) => {
        return(
        <LeveragedPoolRow leveragedPool={leveragedPool}/>
        )
    }

    return (
        <div class="ui card fluid">
            <div class="content">
            <h3 class="ui header">Most Active Pools</h3>
                <table class="ui selectable inverted table small">
                <thead>
                    <tr>
                    <th>Asset</th>
                    <th>Leverage</th>
                    <th>Volume</th>
                    <th>Protocol Ratio</th>
                    <th>Min Protocol Ratio</th>
                    <th class="right aligned">TLV</th>
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