import { useEffect, useReducer, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import reducer, { initState } from './reducer'
import { setExamData, setUserCurrentBox, setExamStarted, setStoredExamData, setExamAnswer } from './actions'
import Context from './Context'
import { useParams } from 'react-router-dom';
import { AuthContext } from "../../../context/authContext.js";

function Provider({ children }) {
    // declare
    const navigate = useNavigate();
    const { examID } = useParams()
    const [state, dispatch] = useReducer(reducer, initState)
    const [, setIsRefresh] = useState(false)
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            const storedExamData = localStorage.getItem('storedExamData');
            try {
                const response = await axios.post('http://localhost:4000/api/exam/run/'+examID, {
                    "userID" : currentUser.email
                } ,{
                    headers: {'Content-Type': 'application/json'}
                });
                dispatch(setExamData(response.data));
                response.data.userAnswers.forEach(element => {
                    if(element?.choose===false)
                        dispatch(setExamAnswer(element))
                });
            } catch (error) {
                console.error(error);
            }
            dispatch(setExamStarted());
            dispatch(setUserCurrentBox(0));
            setIsRefresh(prev => !prev)
        }
        fetchData();
    }, [examID,currentUser.email]);

    useEffect(() => {
        if (state)
          localStorage.setItem('storedExamData', JSON.stringify(state));
      }, [state]);
    

    useEffect(()=>{ 
        const FinishExam = async () => {
            if(state.isExamFinished) {
                await axios.post('http://localhost:4000/api/scoreExam', {answers: state.user.answers, userID: currentUser.email, examID: examID}, 
                { headers: { 'Content-Type': 'application/json' }})
                localStorage.removeItem('storedExamData');
                navigate('/course/'+examID.slice(0,6))
            }
        }
        FinishExam()
    }, [navigate, state.isExamFinished])
    
    return(
        <Context.Provider value={ [state, dispatch] }>
            { state.isExamStarted && 
            !state.isExamFinished && children }
        </Context.Provider>
    )
} 

export default Provider