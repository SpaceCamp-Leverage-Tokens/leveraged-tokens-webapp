import React, {useState, useEffect} from 'react';
import LeveragedActions from '../Components/LeveragedActions';
import { Container } from '@material-ui/core';
import "./css/MyPortfolio.css"
import TotalValueCard from '../Components/TotalValueCard';
import { LCDClient, Coin } from '@terra-money/terra.js';
import {  getAllData, mockAllContractsIds } from '../Helpers/QueryHelper';

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
        const myTempData = await getAllData(mockAllContractsIds,terra)
        setContractInformation(myTempData)
    }

    const Data = [
        {assetName:"Luna",poolLeverage:3,volume:40123,tlv:221000,pr:4,mpr:3,rbr:3.5,tmv:50000,mintfee:0.003},
        {assetName:"mTSLA",poolLeverage:2,volume:1323,tlv:20000,pr:6,mpr:3,rbr:3.5,tmv:1290,mintfee:0.003},
        {assetName:"mAPPL",poolLeverage:3,volume:466,tlv:30000,pr:3.4,mpr:2.5,rbr:3,tmv:1200,mintfee:0.003},
    ];

    function getLeverageActionCards( pool ){
        return <LeveragedActions props={pool}/>
    }

    return (
       <div id="Portfolio-Container">
           <TotalValueCard props={Data}/>

           {Object.values(contractInformation).map(getLeverageActionCards)}
       </div>
    );
}
 
export default MyPortfolio;