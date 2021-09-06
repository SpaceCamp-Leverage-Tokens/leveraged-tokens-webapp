import React, {useState, useEffect} from 'react';
import LeveragedActions from '../Components/LeveragedActions';
import "./css/MyPortfolio.css"
import TotalValueCard from '../Components/TotalValueCard';
import { LCDClient } from '@terra-money/terra.js';
import {  LeveragedPool, PoolFactory } from '../Helpers/QueryHelper';
import { useWallet } from '@terra-money/wallet-provider';
import { localTerraObj, mk } from '../Helpers/QueryHelper';
const MyPortfolio = () => {
    const { status, network, wallets } = useWallet();
    const [contractInformation, setContractInformation] = useState(0)
    const terra = new LCDClient(localTerraObj);
    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=>{
        queryAllData();
    },[isLoading])

    async function queryAllData(){
        const myPoolFactory = await new PoolFactory(terra);

        var myLeveragedPools = [];

        for (let i = 0; i < myPoolFactory.poolIds.length; i++) {
            const myTempPool = await new LeveragedPool(myPoolFactory.poolIds[i],terra)
            myLeveragedPools.push(myTempPool)
        }
        setContractInformation(myLeveragedPools)
    }

    function getLeverageActionCards( pool ){
        return <LeveragedActions props={pool} isLoading={isLoading} setIsLoading={setIsLoading}/>
    }

    return (
       <div id="Portfolio-Container">
           <TotalValueCard props={contractInformation}/>
           {Object.values(contractInformation).map(getLeverageActionCards)}
       </div>
    );
}
 
export default MyPortfolio;