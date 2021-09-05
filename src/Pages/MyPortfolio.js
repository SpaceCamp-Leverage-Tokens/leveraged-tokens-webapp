import React, {useState, useEffect} from 'react';
import LeveragedActions from '../Components/LeveragedActions';
import "./css/MyPortfolio.css"
import TotalValueCard from '../Components/TotalValueCard';
import { LCDClient } from '@terra-money/terra.js';
import {  LeveragedPool, PoolFactory } from '../Helpers/QueryHelper';
import { useWallet } from '@terra-money/wallet-provider';

const MyPortfolio = () => {
    const { status, network, wallets } = useWallet();

    const [contractInformation, setContractInformation] = useState(0)

    const terra = new LCDClient({
        URL: 'http://localhost:1317',
        chainID: 'localterra'
    });

    useEffect(()=>{
        queryAllData();
    },[])

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