import { useExam } from "../provider"
import { setUserCurrentBox } from '../provider/actions'
import Timer from "../timer"
import '../customlibrary/basic.css'
import styles from './.module.css'

function Aside ({ setIsRefreshParent }) {
    const [state, dispatch] = useExam()
    const questions = state.exam.questions
    const answers = state.user.answers

    const handleAClick = (e) => {
        let value = e.target.getAttribute('value')
        dispatch(setUserCurrentBox(Math.floor(value / 5) * 5))
        setIsRefreshParent(prev => !prev)
    }
    function LinkBoxs() {
        let linkBoxs = [], background
        
        for (let i=0; i < questions.length; i++) {
            background = (answers[i] && answers[i].length) ?
                'linear-gradient(0deg, lightgrey 48%,': 'linear-gradient(0deg, whitesmoke 48%,'

            background += (state.user.currentBox<=i && i<state.user.currentBox+5) ?
                'whitesmoke 49%, lightgrey 50%)' : 'whitesmoke 49%, whitesmoke 50%)'

            linkBoxs.push(
                <label key={i} className={"kimcenter "+styles.linkBox} style={{background}}>
                    <a  value={i}
                        href={"#question"+i} 
                        onClick={handleAClick}
                    >{i+1}</a>
                </label>
            )
        }

        return <>{linkBoxs}</>
    }

    return (
        <aside className={"kimcenter kimcolumn " + styles.aside}>
            <div className={styles.peditable}>
                <p fontSize={17}>{state.exam.title} </p>
            </div>
            <div className={"kimcenter kimcolumn " + styles.informations}>
                <div className={styles.timer}>
                    <Timer/>
                </div>
                <div className={"kimcenter "+styles.linkBoxs}>
                    {LinkBoxs()}
                </div>
            </div>
        </aside>
    )
}

export default Aside