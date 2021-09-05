import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { LeveragedPool } from '../Helpers/QueryHelper';

const LeveragedPoolRow = ({leveragedPoolId, terra}) => {
    
    const history = useHistory();
    const [props, setProps] = useState({
        price_context:{},
        assetInfo:{},
        leveragedPoolId:{},
        leveragedPoolInfo:{},
        leveragedPoolState:{},
        dynamicPoolValues:{}})

    const [isLoading, setLoading] = useState(true);

    useEffect( ()=> {
        getPoolQuery().then(setLoading(false))
    },[]);

    async function getPoolQuery(){        
        const myLeveragedPool = await new LeveragedPool(leveragedPoolId,terra)
        setProps(myLeveragedPool)
        // const data = getPoolData(leveragedPoolId,terra)
    }

    if (isLoading){
        // If waiting for data don't crash
        return<tr></tr>
    }
    
    function getProtocolRatio(){
        const tempPr = props.dynamicPoolValues.protocolRatio
        // TODO: multiply by current TS Price and current Leveraged Pool Price
        if (isNaN(tempPr)){
            return "No Assets in Reserve"
        }
        return tempPr
    }

    return (
        <tr onClick={() => { history.push({
            pathname:'/leveragedAsset',
            state: props
            }) }}>
            <td>{props.assetInfo.symbol}</td>
            <td>{props.leveragedPoolInfo.leverage_amount}</td>
            <td>{props.dynamicPoolValues.volume}</td> 
            <td>{getProtocolRatio()}</td>
            <td>{props.leveragedPoolInfo.minimum_protocol_ratio}</td>
            <td>{props.dynamicPoolValues.totalLockedValue} UST </td>
        </tr>
    );
}
 
export default LeveragedPoolRow;