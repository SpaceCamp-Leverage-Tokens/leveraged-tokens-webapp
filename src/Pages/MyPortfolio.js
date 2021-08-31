import React, {useState, useEffect} from 'react';
import LeveragedActions from '../Components/LeveragedActions';
import { Container } from '@material-ui/core';
import "./css/MyPortfolio.css"
import TotalValueCard from '../Components/TotalValueCard';
import { LCDClient, Coin } from '@terra-money/terra.js';
import {  leveragedPool, mockAllContractsIds } from '../Helpers/QueryHelper';

const MyPortfolio = () => {
   
    const [contractInformation, setContractInformation] = useState(0)

    const terra = new LCDClient({
        URL: 'http://localhost:1317',
        chainID: 'localterra'
    });

    useEffect(()=>{
        queryAllData();
    },[])

    const props = {contractIds: mockAllContractsIds, terra:terra}

    async function queryAllData(){
        var myLeveragedPools = [];
        for (let i = 0; i < mockAllContractsIds.length; i++) {
            const myTempPool = await new leveragedPool(mockAllContractsIds[i],terra)
            myLeveragedPools.push(myTempPool)
        }
        setContractInformation(myLeveragedPools)
        console.log(myLeveragedPools)
    }

    function getLeverageActionCards( pool ){
        return <LeveragedActions props={pool}/>
    }

    return (
       <div id="Portfolio-Container">
           <TotalValueCard props={contractInformation}/>
           {Object.values(contractInformation).map(getLeverageActionCards)}
       </div>
    );
}
 
export default MyPortfolio;