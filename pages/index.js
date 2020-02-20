import React, { useState } from 'react';
import { connect }  from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Welcome from '../components/welcome';
import Quiz from '../components/quiz';
import { shuffleArray } from  '../lib/utils';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        width: 'calc(100% - 20px)',
        height: 'calc(100% - 20px)',
        margin: 10,
    },
}));

function QuizPanel(props) {
    return (props.isStart)?<Quiz onReset={props.onReset} onClose={props.onClick} />:<Welcome onClick={props.onClick} />
}

function Index(props) {
    const [isStart, setStart] = useState(false);
    const classes = useStyles();
    
    const startQuiz = (flag) => {
        setStart(flag)
    }

    const resetQuiz = () => {
        var rawdata = props.rawdata;
        rawdata.map(item => {
            
            const {category, question, answers} = item.data;
            const slug = item.slug;

            // randomize answers
            shuffleArray(answers);

            const data = {
                category,
                question,
                answers
            }

            return {
                data,
                slug
            }
        })
        
        // randomize questions
        shuffleArray(rawdata);

        // maxcount taken from next.config.js
        const max_count = process.env.MaxCount;
        var questions = [];

        if(rawdata.length > max_count) {
            questions = rawdata.slice(0, max_count);
        } else {
            questions = rawdata;
        }

        // reset quiz
        props.initQuiz(questions)
        
    }
    
    return (
        <Card className={classes.root}>
            <QuizPanel isStart={isStart} onReset={resetQuiz} onClick={startQuiz} />
        </Card>
    )
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
        dispatch(initQuiz(item));
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);