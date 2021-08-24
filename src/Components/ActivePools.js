import React from 'react';
import { useHistory } from "react-router-dom";
import './css/ActivePools.css'
import LeveragedPoolRow from './LeveragedPoolRow';

const ActivePools = () => {
    const history = useHistory();

    // TODO: Rank according to highest volume
    const Data = [
        {assetName:"LUNA",poolLeverage:3,volume:"40,123 UST",tlv:"221k"},
        {assetName:"MIR",poolLeverage:3,volume:"10,123 UST",tlv:"120k"},
        {assetName:"mTSLA",poolLeverage:2,volume:"1,323 UST",tlv:"20k"},
        {assetName:"mAPPL",poolLeverage:3,volume:"466 UST",tlv:"30k"},

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
                <table class="ui selectable inverted table">
                <thead>
                    <tr>
                    <th>Asset</th>
                    <th>Leverage</th>
                    <th>Volume</th>
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