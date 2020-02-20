import { createStore, combineReducers } from 'redux';
import Immutable, { Record } from 'immutable';

class QuizData extends Record({
    questions: Immutable.List()
}){
    
    get size() {
        return this.questions.size;
    }
    
    getQuestionData(index) {
        const item = this.getQuestionByIndex(index);
        const category = item.getIn(['data', 'category']);
        const question = item.getIn(['data', 'question']);
        const answers = item.getIn(['data', 'answers']).map((ans) => {
            return ans.get('text');
        }).toArray();
        return {
            category,
            question,
            answers
        }
    }

    isCorrect(questionIndex, answerIndex) {
        const item = this.getQuestionByIndex(questionIndex);
        
        let correctIndex = -1;
        let flag = false;
        item.getIn(['data', 'answers']).toArray().forEach((ans, index) => {
            const correct = ans.get('isCorrect');
            if(correct) {
                if(index === questionIndex) flag = true;
                correctIndex = index;
            }
        })

        return {
            correct: correctIndex,
            flag: flag
        };
    }
    
    setQuestions(questions) {
        return this.set('questions', Immutable.fromJS(questions));
    }
    
    getQuestionByIndex(index) {
        return this.questions.get(index);
    }
    
}

const initialQuiz = () => {
    return new QuizData()
}

const initQuiz = (state, action) => {
    return state.setQuestions(action.payload);
}

const quiz = (state = initialQuiz(), action) => {
    switch (action.type) {
        case 'INIT_QUIZ':
            return initQuiz(state, action);
        default:
            return state;
    }
}

const initialData = () => {
    return {
        data: [],
    }
}

const setData = (state, action) => {
    return {
        ...state,
        data: action.payload
    }
}

const data = (state = initialData(), action) => {
    switch (action.type) {
        case 'SET_DATA':
            return setData(state, action);
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    quiz,
    data
});

export default createStore(rootReducer);