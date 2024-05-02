import Question from "../question"
import { useExam } from "../provider"
import { useContext } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { setExamFinished, setUserCurrentBox } from '../provider/actions'
import { AuthContext } from "../../../context/authContext.js";


import '../customlibrary/basic.css'
import styles from './.module.css'
import Circle from '../img/circle.png'
import axios from "axios";

function Form ({ setIsRefreshParent }) {
    // exam-state
    const [state, dispatch] = useExam()
    const currentBox = state.user.currentBox
    const lenQuestions = state.exam.questions.length
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { examId } = useParams();

    // function
    const handleShift = (e) => {
        e.preventDefault()
        dispatch(setUserCurrentBox(e.target.value))
        setIsRefreshParent(prev => !prev)
    }

    function checkFully() {
        const answers = state.user.answers;
        const length = state.exam.questions.length;

        for(let i=0; i<length; i++) 
            if(!answers[i] || !answers[i].length)
                return 'Answer is empty! Do you want to continue ?';

        return 'Submit?'
    } 

    const handleFormSubmit = (e) => {
        e.preventDefault()
        
        let results = window.confirm(checkFully());
        if(!results) return false;

        axios.post('http://localhost:4000/api/scores', {answers: state.user.answers, UserId: currentUser.UserId, ExamID: parseInt(examId)}, 
        { headers: { 'Content-Type': 'application/json' }})

        dispatch(setExamFinished());
        navigate('/mycourses')
    }
    
    const QuestionBoxs = () => {
        let maxQuestion = Math.min(currentBox + 5, lenQuestions);
        let questionBoxs = [];

        for(let id=currentBox; id < maxQuestion; id++)
            questionBoxs.push( 
                <Question key={id} idQuestion={id} setIsRefreshParent={setIsRefreshParent}/> )

        return questionBoxs
    }    

    return <>
        <form 
            id="userForm"
            className={styles.userForm}
            onSubmit={handleFormSubmit}
        >{QuestionBoxs()}
        </form>
        <footer className={"kimcenter "+styles.footer}>
            <div>
                <img src={Circle} alt="" width='37px' className={styles.logo}/>
            </div>
            <div className={styles.shift}>
                <button disabled={currentBox < 1} className='kimpointer'
                    value="prev" onClick={handleShift}>Prev</button>
                <button disabled={currentBox >= lenQuestions - 5} className='kimpointer'
                    value="next" onClick={handleShift}>Next</button>
            </div>
            <div>
                <button className='kimpointer' form="userForm" type="submit">Submit</button>
            </div>
        </footer>
    </>
}

export default Form