import { 
    SET_STORED_EXAM_DATA,
    SET_USER_CURRENT_BOX,
    SET_EXAM_DATA, SET_EXAM_ANSWER,
    SET_EXAM_STARTED, SET_EXAM_FINISHED
} from "./constants"

export const setExamStarted = (payload) => {
    return {
        type: SET_EXAM_STARTED,
        payload
    }
}

export const setExamFinished = (payload) => {
    return {
        type: SET_EXAM_FINISHED,
        payload
    }
}

export const setUserCurrentBox = (payload) => {
    return {
        type: SET_USER_CURRENT_BOX,
        payload
    }
}

export const setExamData = (payload) => {
    return {
        type: SET_EXAM_DATA,
        payload
    }
}


export const setExamAnswer = (payload) => {
    return {
        type: SET_EXAM_ANSWER,
        payload
    }
}

export const setStoredExamData = (payload) => {
    return {
        type: SET_STORED_EXAM_DATA,
        payload
    }
}
