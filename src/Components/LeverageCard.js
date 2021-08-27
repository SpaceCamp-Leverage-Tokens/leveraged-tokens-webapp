import React, {useState} from 'react';
import { Container } from '@material-ui/core';
import './css/LeverageCard.css'
import { Button, Form, Input } from 'semantic-ui-react'

const LeverageCard = ( {props} ) => {
    const [leverageMintAmount, setLeverageMintAmount] = useState(0)
    const dummyPosition = 10000000

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
                <h3 className='ui header'>{props.title} Leveraged Position</h3>
                <h4 className='ui header'>Current Position: {dummyPosition} {props.assetName}</h4>
            </Container>
            <Container>
                <Form className="ui form">
                    <div className="field">
                        <label>Amount</label>
                        <Input type="number" 
                        name="first-name" 
                        placeholder="0"
                        type='number'
                        value={leverageMintAmount}
                        onChange={handleRemoveChange}/>
                    </div>
                    <Button className="ui basic green button" onClick={handleMaxClick}>Max</Button>
                    <Button className="ui basic green button">Take Leverage</Button>
                </Form>
            </Container>
            <Container>
                <Form className="ui form">
                    <Form.Field className="field">
                        <label>Amount</label>
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