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
                console.log("hehe",response.data,response.data.userAnswers)
                response.data.userAnswers.forEach(element => {
                    console.log("dulieu",element)
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
        if(state.isExamFinished) {
            localStorage.removeItem('storedExamData');
            navigate('/mycourses')
        }
    }, [navigate, state.isExamFinished])
    
    return(
        <Context.Provider value={ [state, dispatch] }>
            { state.isExamStarted && 
            !state.isExamFinished && children }
        </Context.Provider>
    )
} 

export default Provider