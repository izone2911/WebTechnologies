import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import reducer, { initState } from './reducer'
import { setExamData, setUserCurrentBox, setExamStarted, setStoredExamData } from './actions'
import Context from './Context'
import { useParams } from 'react-router-dom';

function Provider({ children }) {
    // declare
    const navigate = useNavigate();
    const { examID } = useParams()
    const [state, dispatch] = useReducer(reducer, initState)
    const [, setIsRefresh] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const storedExamData = localStorage.getItem('storedExamData');
            
            try {
                const response = await axios.get('http://localhost:4000/api/exam/run/'+examID, {
                    headers: {'Content-Type': 'application/json'}
                });
                dispatch(setExamData(response.data));
            } catch (error) {
                console.error(error);
            }
            dispatch(setExamStarted());
            dispatch(setUserCurrentBox(0));
            setIsRefresh(prev => !prev)
        }
        fetchData();
    }, [examID]);

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