import { useExam } from "../provider"
import { setUserCurrentBox } from '../provider/actions'
import Timer from "../timer"
import '../customlibrary/basic.css'
import styles from './.module.css'
import { useContext } from "react"
import { AuthContext } from "../../../context/authContext"

function Aside({ setIsRefreshParent }) {
    const [state, dispatch] = useExam()
    const questions = state.exam.questions
    const answers = state.user.answers
    const {currentUser} = useContext(AuthContext)

    const handleAClick = (e) => {
        let value = e.target.getAttribute('value')
        dispatch(setUserCurrentBox(Math.floor(value / 5) * 5))
        setIsRefreshParent(prev => !prev)
    }
    function LinkBoxs() {
        let linkBoxs = [], background

        for (let i=0; i < questions.length; i++) {
            background = (answers[i] && answers[i].length) ?
                'rgb(0, 89, 255)': 'white'

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
                <p style={{fontFamily:"Verdana",fontSize:"20px",fontWeight:"900",color:"black"}}>{state.exam.title} </p>
            </div>
            <div className={"kimcenter kimcolumn " + styles.informations}>
                {currentUser.role === 'Teacher'?
                null:
                <div className={styles.timer}>
                    <Timer />
                </div>}
                <div className={"kimcenter " + styles.linkBoxs}>
                    {LinkBoxs()}
                </div>
            </div>
        </aside>
    )
}

export default Aside