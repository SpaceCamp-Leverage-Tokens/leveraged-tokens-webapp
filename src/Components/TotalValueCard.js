import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import { VictoryPie } from 'victory';
import './css/TotalValueCard.css'
import { Button } from 'semantic-ui-react'
import { LocalTerra, LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { tsMappedType } from '@babel/types';
import { useWallet } from '@terra-money/wallet-provider';

const TotalValueCard = ({props}) => {
    const { status, network, wallets } = useWallet();

    const terra = new LocalTerra;
    const myWallet = terra.wallets.test3;
    const [position,setPositions] = useState([]);
    const [totalVal,setTotalVal] = useState([]);
    const [circleData,setCircleData] = useState([]);

    useEffect(()=>{
        getData()
    },[props])

    async function getData(){
        const tempPositions = []
        const tmpCircleData = []
        var temp_total_val = 0
        for( let pool_index = 0; pool_index < props.length; pool_index++){
            const pool_earning = await props[pool_index].getMyBalanceInPool(terra,myWallet.key.accAddress)
            if (pool_earning.ust > 0){
                pool_earning.symbol = props[pool_index].assetInfo.symbol
                tempPositions.push(pool_earning)
                temp_total_val += parseFloat(pool_earning.ust)
    
                tmpCircleData.push({
                    x:2*pool_index,
                    y:pool_earning.ust,
                    label:pool_earning.symbol,
                })
            }         

            const pool_lev_earning = await props[pool_index].getMyLevBalanceInPool(terra,myWallet.key.accAddress)
            if (pool_lev_earning.ust> 0){
                pool_lev_earning.symbol = props[pool_index].assetInfo.symbol +" "+ props[pool_index].leveragedPoolInfo.leverage_amount +"x"
                console.log(pool_lev_earning)
                tempPositions.push(pool_lev_earning)
                temp_total_val += parseFloat(pool_lev_earning.ust)

    
                tmpCircleData.push({
                    x:(2*pool_index)+1,
                    y:pool_lev_earning.ust,
                    label:pool_lev_earning.symbol,
                })
            }

            
        }
        setPositions(tempPositions);
        setTotalVal(temp_total_val);
        setCircleData(tmpCircleData);
    }
    function renderListItem( item ){
        // console.log(item)
        return <div className="item"> 
            <div className="header">{item.raw} LP Shares: {item.symbol} ~ {item.ust} UST</div>
            
        </div>
    }

    return (
        <div className="ui card fluid">
            <div className="content">
                    <div className="Panels" style={{display:"flex"}}>
                        <Container className="Portfolio-Text">
                            <div className="ui list">
                                <h2>Total Value Locked <h3>{totalVal} UST</h3></h2>
                                
                                {Object.values(position).map(renderListItem)}
                            </div>
                            <Button>Claim Gov Rewards</Button>
                        </Container>
                        <Container>
                            <VictoryPie
                            colorScale="qualitative"
                            width={300} height={180}
                            startAngle={90}
                            endAngle={450}
                            innerRadius={50}
                            data={circleData}
                            />
                        </Container>                  
                </div>
            </div>
    </div>
    );
}
 
export default TotalValueCard;