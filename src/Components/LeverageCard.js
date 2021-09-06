import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import './css/LeverageCard.css'
import { Button, Form, Input } from 'semantic-ui-react'
import { LocalTerra, LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import LoadingMask from 'react-loadingmask';
import "react-loadingmask/dist/react-loadingmask.css";
import { localTerraObj, mk } from '../Helpers/QueryHelper';
const LeverageCard = ( {props} ) => {

    const [leverageMintAmount, setLeverageMintAmount] = useState(0)
    
    const terra = new LCDClient(localTerraObj);
    const myWallet = terra.wallet(mk)

    const [isLoading, setIsLoading] = useState(false)
    const [assetInPool, setAssetInPool] = useState(0)
    const [totalLP, setTotalLP] = useState(0)
    const [assetInPoolUST, setAssetInPoolUST] = useState("")


    useEffect( ()=> {
        getMyBalance()
    },[isLoading]);

    async function getMyBalance(){
        console.log(myWallet)
        console.log(myWallet.key.accAddress)
        const myTokenBalanceInPool = await props.getMyLevBalanceInPool(terra,myWallet.key.accAddress)
        console.log(myTokenBalanceInPool)
        setTotalLP(myTokenBalanceInPool.total)
        setAssetInPool(myTokenBalanceInPool.raw)
        setAssetInPoolUST(myTokenBalanceInPool.ust)
    }
    function getMaxMintable(){
        return Math.min( (props.tlv - props.rbr*props.tmv)/(props.rbr*(1 - props.mintfee) - 1) )
    }

    function handleRemoveChange(e){
        setLeverageMintAmount(e.target.value)
    }

    function handleMaxClick(){
        setLeverageMintAmount(getMaxMintable())
    }

    async function handleMintClickClick(){
        setIsLoading(true);
        await props.mintLeveragePosition(terra,myWallet, leverageMintAmount.toString());
        setIsLoading(false);
    }

    return (
        <LoadingMask loading={isLoading} text={'Loading...'}>
            <Container className='Leverage-Card'>
                <Container>
                <h3>Leveraged Position</h3>
                    <div> 
                        <h4 className="header">{assetInPool} {props.assetInfo.symbol}-{props.leveragedPoolInfo.leverage_amount}x owned in pool  
                        <h4>{totalLP} {props.assetInfo.symbol}-{props.leveragedPoolInfo.leverage_amount}x in total</h4> </h4> 
                        ~ {assetInPoolUST} UST
                    </div>
                </Container>
                <Container>
                    <Form className="ui form">
                        <div className="field">
                            <label>Convert {props.assetInfo.symbol} to {props.assetInfo.symbol}-{props.leveragedPoolInfo.leverage_amount}x</label>
                            <Input type="number" 
                            name="first-name" 
                            placeholder="0"
                            onChange={handleRemoveChange}></Input>
                        </div>
                        <Button className="ui basic green button" onClick={handleMaxClick}>Max</Button>
                        <Button className="ui basic green button" onClick={handleMintClickClick}>Take Leverage</Button>
                    </Form>
                </Container>
                <Container>
                    <Form className="ui form">
                        <Form.Field className="field">
                            <label>Convert {props.assetInfo.symbol}-{props.leveragedPoolInfo.leverage_amount}x to {props.assetInfo.symbol}</label>
                            <Input type="number" name="first-name" placeholder="0"/>
                        </Form.Field>
                        <Button className="ui basic red button">Max</Button>
                        <Button className="ui basic red button">Close Leverage</Button>

                    </Form>
                </Container>   
            </Container>
        </LoadingMask>
    );
}
 
export default LeverageCard;