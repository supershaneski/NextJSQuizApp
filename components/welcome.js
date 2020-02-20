import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    media: {
        height: 150,
    },
}));

function Welcome(props) {
    const classes = useStyles();
    const isAgain = props.isAgain || false;
    const buttonText = (isAgain)?'Take the Quiz Again':'Start the Quiz';
    return (
        <React.Fragment>
            <CardActionArea onClick={() => props.onClick(true)}>
                <CardMedia
                className={classes.media}
                image="/images/banner.jpg"
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Sample Quiz App
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    This is a Sample Quiz App made using Next.JS, 
                    Redux and ImmutableJS for data management
                    and Material-UI for layout and styling.
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                onClick={() => props.onClick(true)} 
                size="medium" 
                variant="contained" 
                color="primary"
                width="200"
                >
                {
                    buttonText
                }
                </Button>
            </CardActions>
        </React.Fragment>
    )
}

export default Welcome;