import React from 'react';
import { Container } from '@material-ui/core';
import { VictoryPie } from 'victory';
import './css/TotalValueCard.css'
import { Button } from 'semantic-ui-react'

const TotalValueCard = ({props}) => {

    function renderListItem( item ){
        // console.log(item)
        return <div className="item"> 
            <div className="header">{item.assetInfo.symbol} </div>
            100 UST
        </div>
    }

    return (
        <div className="ui card fluid">
            <div className="content">
                    <div className="Panels" style={{display:"flex"}}>
                        <Container className="Portfolio-Text">
                            <div className="ui list">
                                <h2>Total Value: {"300 UST"}</h2>
                                {Object.values(props).map(renderListItem)}
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
                            data={[
                                { x: 1, y: 1, label: "MIR" },
                                { x: 2, y: 1, label: "MIR" },
                                { x: 3, y: 1, label: "MIR" }
                            ]}
                            />
                        </Container>                  
                </div>
            </div>
    </div>
    );
}
 
export default TotalValueCard;