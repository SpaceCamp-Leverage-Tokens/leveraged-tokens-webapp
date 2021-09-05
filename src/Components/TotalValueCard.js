import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import { VictoryPie } from 'victory';
import './css/TotalValueCard.css'
import { Button } from 'semantic-ui-react'
import { LocalTerra, LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { tsMappedType } from '@babel/types';

const TotalValueCard = ({props}) => {

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
            pool_earning.symbol = props[pool_index].assetInfo.symbol
            tempPositions.push(pool_earning)
            temp_total_val += pool_earning.ust

            tmpCircleData.push({
                x:pool_index+1,
                y:pool_earning.ust,
                label:pool_earning.symbol,
            })
        }
        setPositions(tempPositions);
        setTotalVal(temp_total_val);
        setCircleData(tmpCircleData);
    }
    function renderListItem( item ){
        // console.log(item)
        return <div className="item"> 
            <div className="header">{item.raw} : {item.symbol} ~ {item.ust} UST</div>
            
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