import Card from '@material-ui/core/Card';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Button} from 'semantic-ui-react';
import Typography from '@material-ui/core/Typography';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
// import { useWallet } from '@terra-money/wallet-provider';
import { LocalTerra, LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { sendTransaction } from '../Helpers/helpers';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin:3,
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
  });


const ResetReferenceCard = ({Title, Factory}) => {
    const terra = new LocalTerra

    const classes = useStyles();
    
    function getSecondsToTomorrow() {
        let now = new Date();
      
        // tomorrow date
        let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
      
        let diff = tomorrow - now; // difference in ms
        return Math.round(diff / 1000); // convert to seconds
      }
    const secondsTillTomorrow = getSecondsToTomorrow()
    const secondsInADay = 60*60*24;
    
    async function handleOnClick() {
        console.log(Factory)
        await Factory.resetLeveragePriceReference(terra, terra.wallets.test1)
    }

    const children = ({ remainingTime }) => {
        const hours = Math.floor(remainingTime / 3600)
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = remainingTime % 60
      
        return `${hours}:${minutes}:${seconds}`
      }
        

    return (
        <Card className={classes.root}>
          <CardContent>
              <Typography className={classes.title} gutterBottom>
              {Title}
              </Typography>
              <CountdownCircleTimer
                    isPlaying
                    duration={secondsInADay}
                    initialRemainingTime={secondsTillTomorrow}
                    colors={[
                    ['#A30000', 0.33],
                    ['#F7B801', 0.33],
                    ['#004777', 0.33],
                    ]}
                >
                    {children}
                </CountdownCircleTimer>

          </CardContent>
          <CardActions>
            <Button onClick={handleOnClick}>Reset Leverage Price Reference Points</Button>
          </CardActions>
        </Card>
        );
}
 
export default ResetReferenceCard;