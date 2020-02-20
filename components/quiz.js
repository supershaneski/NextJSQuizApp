import React from 'react';
import { connect }  from 'react-redux';
import { styled } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const MyButton = styled(Button)({
    width: `100px`,
})

class Quiz extends React.Component {
    constructor(props) {
        super(props)
        
        this.size = this.props.quiz.size;
        this.state = {
            mode: 0,
            score: 0,
            index: 0,
            selected: -1
        }
        
        this.handleRadio.bind(this)
        this.handleSubmit.bind(this)
        this.handleNext.bind(this)
        this.handleReset.bind(this)
        this.handleClose.bind(this)

    }
    
    handleRadio(event) {
        this.setState({
            selected: parseInt(event.target.value),
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.state.mode === 1) return;
        if(this.state.selected < 0) return;

        const selected = this.state.selected;
        const index = this.state.index;
        let score = this.state.score;
        
        const result = this.props.quiz.isCorrect(index, selected);
        if(result.correct === selected) {
            score = score + 1
        }

        let mode = 1;
        if(this.state.index === this.size - 1) {
            mode = 2;
        }

        this.setState({
            mode: mode,
            correct: result.correct,
            score: score
        })
    }

    handleNext(event) {
        event.preventDefault();
        if(this.state.mode === 0) return;
        const index = this.state.index;
        if (index === this.size - 1) return;
        this.setState({
            index: (index + 1),
            mode: 0,
            selected: -1,
            correct: -1,
        })
    }

    handleReset(event) {
        event.preventDefault();
        this.props.onReset();
        this.setState({
            mode: 0,
            score: 0,
            index: 0,
            selected: -1
        })
    }

    handleClose(event) {
        event.preventDefault();
        this.props.onReset();
        this.props.onClose(false)
    }

    render() {
        const score = this.state.score;
        const index = this.state.index;
        const quizData = this.props.quiz.getQuestionData(index);

        return (
            <React.Fragment>
            <CardHeader
                avatar={
                <Avatar aria-label="quiz">
                { score }
                </Avatar>
                }
                title={`${quizData.category}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                    Question { (index + 1) }
                </Typography>
                <Typography variant="body1" color="textPrimary" component="p">
                    { quizData.question }
                </Typography>
            </CardContent>
            <CardContent>
                <FormControl component="fieldset">
                    <RadioGroup value={this.state.selected.toString()} 
                    onChange={() => this.handleRadio(event)} 
                    aria-label="position" name="position" column="true">
                    {
                    quizData.answers.map((item, index) => {
                        return (
                            <div key={index}>
                            <FormControlLabel
                            value={`${index}`}
                            control={<Radio 
                            color="primary" 
                            disabled={(this.state.mode === 0)?false:true} />}
                            label={item}
                            labelPlacement="end"
                            />
                            
                            {
                                (this.state.mode > 0 && this.state.correct !== index && this.state.selected === index) &&
                                <span className="wrong">&nbsp;&#x2717;</span>
                            }
                            {
                                (this.state.mode > 0 && this.state.correct === index) &&
                                <span className="correct">&nbsp;&#10004;</span>
                            }
                            
                            </div>
                        )
                    })
                    }
                    </RadioGroup>
                </FormControl>
            </CardContent>
            
            <CardContent>
            {
            (this.state.mode === 2 && this.state.score === this.size) &&
            <Typography variant="body1" color="textPrimary" component="h5">
            Congratulation! You got perfect { this.state.score } score!
            </Typography>
            }
            {
            (this.state.mode === 2 && this.state.score >= (this.size/2) && this.state.score < this.size) &&
            <Typography variant="body1" color="textPrimary" component="h5">
            Not bad! { this.state.score } out of { this.size } Try again?
            </Typography>
            }
            {
            (this.state.mode === 2 && this.state.score < (this.size/2)) &&
            <Typography variant="body1" color="textPrimary" component="h5">
            You scored below the average. { this.state.score } out of { this.size } Try again?
            </Typography>
            }
            </CardContent>
            
            <CardActions>
            {
                this.state.mode === 0 &&
                <MyButton 
                size="medium"
                onClick={() => this.handleSubmit(event)} 
                variant="contained" 
                color="primary">
                Submit
                </MyButton>
            }
            {
                this.state.mode === 1 &&
                <MyButton 
                onClick={() => this.handleNext(event)} 
                size="medium" 
                variant="contained" 
                color="primary">
                Next
                </MyButton>
            }
            {
                this.state.mode === 2 &&
                <React.Fragment>
                    <Button 
                    onClick={() => this.handleReset(event)} 
                    size="medium" 
                    variant="contained" 
                    color="primary">
                        Take the Quiz Again
                    </Button>                    
                </React.Fragment>
            }
            <Button onClick={() => this.handleClose(event)} 
            size="medium" 
            variant="contained" 
            color="secondary">
            Close Quiz
            </Button>
            </CardActions>
            
            <style jsx>
                {`
                span.wrong {
                    font-size: 1.1em;
                    font-weight: bold;
                    color: #f50057;
                }
                span.correct {
                    font-size: 1.1em;
                    font-weight: bold;
                    color: #3f51b5;
                }
                `}
            </style>
        </React.Fragment>
        )
    }
}

const initQuiz = (item) => {
    return {
        type: 'INIT_QUIZ',
        payload: item
    }
}

const mapStateToProps = (state) => {
    return {
      quiz: state.quiz
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      initQuiz: (item) => {
        dispatch(initQuiz(item))
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);