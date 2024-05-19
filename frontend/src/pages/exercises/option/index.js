import { setExamAnswer } from "../provider/actions"
import { useExam } from "../provider"
import styles from './.module.css';
import '../customlibrary/basic.css';
import axios from 'axios'
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { useParams } from 'react-router-dom';

function Option ({ idOption, idQuestion, setIsRefreshParent }) {
    // exam-state
    const [state, dispatch] = useExam()
    const { type, options } = state.exam.questions[idQuestion]  
    const answer = state.user.answers[idQuestion] || []
    const {currentUser} = useContext(AuthContext)
    const { examID } = useParams()

    // function-handle
    const handleInputChange = async () => {
        console.log("choose",idQuestion,idOption,type,answer.includes(idOption))
        dispatch(setExamAnswer({idQuestion, idOption, type}))
        try {
                let dataUpdate = {}
                dataUpdate.answers = {idQuestion, idOption, type, choose : answer.includes(idOption)}
                dataUpdate.userID = currentUser.email
                console.log("dataUpdate_______",dataUpdate)
                const response = await axios.post('http://localhost:4000/api/exercise/update/'+examID, dataUpdate , {
                    headers: {'Content-Type': 'application/json'}
                })
            } catch (error) {
                console.error(error)
            }
        setIsRefreshParent(prev => !prev)
    }

    return <>
        <label className={styles.options}>
            <div style={{order: 1, width: '100%'}}>
            <p style={{paddingBottom: '1px', marginBottom: 0}}>{options[idOption]}</p>
            </div>
            <div className={"kimcenter " + styles.inputs}>
                <input 
                    type={type}
                    onChange={handleInputChange}
                    className={styles.inputOption}
                    checked={answer.includes(idOption)} />
            </div>
            <div className={"kimcenter " + styles.bins}>
            </div>
        </label>
    </>
}

export default Option