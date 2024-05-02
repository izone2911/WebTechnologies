import { setExamAnswer } from "../provider/actions"
import { useExam } from "../provider"
import styles from './.module.css';
import '../customlibrary/basic.css';

function Option ({ idOption, idQuestion, setIsRefreshParent }) {
    // exam-state
    const [state, dispatch] = useExam()
    const { type, options } = state.exam.questions[idQuestion]  
    const answer = state.user.answers[idQuestion] || []

    // function-handle
    const handleInputChange = () => {
        dispatch(setExamAnswer({idQuestion, idOption, type}))
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