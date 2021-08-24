import React from 'react';
import { useHistory } from "react-router-dom";

const LeveragedPoolRow = ({leveragedPool}) => {
    
    const history = useHistory();

    return (
        <tr onClick={() => { history.push({
            pathname:'/leveragedAsset',
            state: leveragedPool
            }) }}>
        <td>{leveragedPool.assetName}</td>
        <td>{leveragedPool.poolLeverage}x</td>
        <td>{leveragedPool.volume}</td>
        <td>{leveragedPool.pr}</td>
        <td>{leveragedPool.mpr}</td>
        <td class="right aligned">{leveragedPool.tlv}</td>
        </tr>
    );
}
 
export default LeveragedPoolRow;