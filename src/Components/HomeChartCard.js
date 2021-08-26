import Card from '@material-ui/core/Card';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { VictoryChart, VictoryLine} from "victory";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin:3
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
  });


const HomeChartCard = ({Title, Data}) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
          <CardContent>
              <Typography className={classes.title} gutterBottom>
              {Title}
              </Typography>
              <VictoryChart>
                <VictoryLine style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc"}
                }}
                data={Data}/>
              </VictoryChart>

          </CardContent>
          <CardActions>
              <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        );
}
 
export default HomeChartCard;