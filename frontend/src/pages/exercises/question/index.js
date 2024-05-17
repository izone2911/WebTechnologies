import { useExam } from "../provider";
import { useEffect, useState } from 'react';
import '../customlibrary/basic.css';
import styles from './.module.css';
import Option from '../option';

function Question ({ idQuestion, setIsRefreshParent }) {
    // exam-state
    const [state, ] = useExam()  
    const { options, question } = state.exam.questions[idQuestion]  

    // self-state
    const [isRefresh, setIsRefresh] = useState(false)
    useEffect(()=>{}, [isRefresh])

    return (
        <div id={"question"+idQuestion} className={styles.questionBox}>
            <div className={styles.question}>
                <p className={styles.indexs} style={{fontSize: 18}}><strong>{idQuestion+1}.</strong></p>
                <p style={{fontSize: 18}}>&nbsp;{question}</p>
            </div>
            <div className="kimcenter kimcolumn">
                { options.map((_, idOption) =>
                <Option
                    key={idOption}
                    idOption={idOption}
                    idQuestion={idQuestion}
                    setIsRefreshParent={setIsRefresh} />
                )}
            </div>
        </div>
    )
}

export default Question