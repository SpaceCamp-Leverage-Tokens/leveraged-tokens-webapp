import React, {useState} from 'react';
import { Container } from '@material-ui/core';
import './css/LeverageCard.css'
import { Button, Form, Input } from 'semantic-ui-react'

const LeverageCard = ( {props} ) => {
    const [leverageMintAmount, setLeverageMintAmount] = useState(0)

    function getMaxMintable(){
        return Math.min( (props.tlv - props.rbr*props.tmv)/(props.rbr*(1 - props.mintfee) - 1) )
    }

    function handleRemoveChange(e){
        setLeverageMintAmount(e.target.value)
    }
    function handleMaxClick(){
        setLeverageMintAmount(getMaxMintable())
        console.log("Max amount leverage")
        console.log(leverageMintAmount)
    }
    return (
        <Container className='Leverage-Card'>
            <Container>
            <h3>Leveraged Position</h3>
                <div> 
                    <h4 className="header">30.3 {props.assetInfo.symbol} owned in pool</h4>
                    ~ 30 UST
                </div>
                <h4 >50 {props.assetInfo.symbol} in Wallet </h4>
            </Container>
            <Container>
                <Form className="ui form">
                    <div className="field">
                        <label>Convert {props.assetInfo.symbol} to {props.assetInfo.symbol}-{props.leveragedPoolInfo.leverage_amount}x</label>
                        <Input type="number" 
                        name="first-name" 
                        placeholder="0"
                        value={leverageMintAmount}
                        onChange={handleRemoveChange}></Input>
                    </div>
                    <Button className="ui basic green button" onClick={handleMaxClick}>Max</Button>
                    <Button className="ui basic green button">Take Leverage</Button>
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
    );
}
 
export default LeverageCard;