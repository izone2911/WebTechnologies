import { setExamFinished } from "../provider/actions";
import { useEffect, useState } from "react"
import { useExam } from "../provider"
import styles from './.module.css';

function Timer () {
    const [state, dispatch] = useExam()
    const [timeNow, ] = useState(() => (Date.now()))
    const initTimer = Math.floor((state.exam.deadline - timeNow) / 1000)

    console.log(state.exam.deadline, timeNow, initTimer)
    const [date, setDate] = useState(null)
    const [timer, setTimer] = useState(initTimer)

    useEffect(() => {
        const timeoutId = setTimeout(
            () => dispatch(setExamFinished())
            , (initTimer + 1) * 1000
        );
        
        return () => {clearTimeout(timeoutId)};
      }, [initTimer, dispatch]);
    
    useEffect(() => {
        const timerId = setInterval(
            () => setTimer(prev => prev - (prev > 0))
            , 1000
        );
        
        return () => {clearInterval(timerId)};
    }, [])

    useEffect(() => {timerConvertor(timer)}, [timer])

    function timerConvertor(time) {
        let dd = Math.floor(time / 86400)
        time -= dd * 86400
        let hh = Math.floor(time / 3600)
        time -= hh * 3600
        let mm = Math.floor(time/ 60)
        let ss = time - mm * 60
    
        dd = (!dd)        ? null : dd
        hh = (!dd && !hh) ? null : hh

        setDate({ dd, hh, mm, ss })
    }
    const numberConverter = (number) => 
    (number > 9) ? number : '0' + number 

    return (
        !date ? <></> :
        <div className={styles.timer}>
            <p style={{padding: '1px 0', marginBottom: 0}}>
                {date.dd !== null ? <>{numberConverter(date.dd)} : </> : <></>}
                {date.hh !== null ? <>{numberConverter(date.hh)} : </> : <></>}
                {numberConverter(date.mm)} : {numberConverter(date.ss)} 
            </p>
        </div> 
    )
}

export default Timer