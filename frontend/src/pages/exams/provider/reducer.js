import {
    SET_STORED_EXAM_DATA,
    SET_USER_CURRENT_BOX,
    SET_EXAM_DATA, SET_EXAM_ANSWER,
    SET_EXAM_STARTED, SET_EXAM_FINISHED
} from "./constants"

export const initState = {
    user: {
        answers: {},
        currentBox: null,
        isExamStarted: false,
        isExamFinished: false,
    },
    exam: {
        title: '',
        timeLimit: 0,
        deadline: '',
        questions: [],
    }
}

const reducer = (state, action) => {
    // console.log('Action: ', action)
    // console.log('Prev state: ', state)

    let newState,
        idQuestion, idOption,
        type, isSelected, answers,
        operator

    switch (action.type) {
        case SET_STORED_EXAM_DATA: 
            newState = {
                ...action.payload
            }
            break;
            
        case SET_EXAM_STARTED:
            newState = {
                ...state,
                "isExamStarted": true
            }
            break;
        case SET_EXAM_FINISHED:
            newState = {
                ...state,
                "isExamFinished": true
            }
            break;

        case SET_USER_CURRENT_BOX:
            operator = action.payload
            newState = state
            
            if(Number.isInteger(operator))
                newState.user.currentBox = operator
            else
                newState.user.currentBox += 5 * (operator === "prev" ? -1 : 1)
            break;
               
        case SET_EXAM_DATA:
            newState = state
            if(action.payload === null) 
                newState = {...initState}
            else
                newState.exam = {
                    ...newState.exam,
                    ...action.payload
                }
            newState.exam.deadline = Date.now() + newState.exam.timeLimit * 1000;
            break;

        case SET_EXAM_ANSWER:
            idQuestion = action.payload.idQuestion
            idOption = action.payload.idOption
            type = action.payload.type
            newState = state
            
            if(!newState.user.answers[idQuestion]) {
                newState.user.answers[idQuestion] = [idOption]
                break;
            }

            answers = newState.user.answers[idQuestion]
            if (type === "radio") {
                newState.user.answers[idQuestion] = [idOption];
            }
            else {
                isSelected = answers.includes(idOption)
                
                if(!isSelected)
                    newState.user.answers[idQuestion] = [...answers, idOption].sort()
                else
                    newState.user.answers[idQuestion] = answers.filter(item => item !== idOption)
            }
            break;

        default:
            break;
    }

    console.log('New state: ', newState)

    return newState
}

export default reducer