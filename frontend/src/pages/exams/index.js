import { useState, useEffect, useContext} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";

import './customlibrary/basic.css';
import styles from './.module.css';
import Play from './img/play.svg';

function Exams({examData}) {
    // self-state
    const [listExams,] = useState(examData);
    const [listScores, setListScores] = useState({})
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const listVariants = {
        open: { opacity: 1, y: "0vh" },
        closed: { opacity: 0, y: "-10vh" },
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            let response = await axios.get(`http://localhost:4000/api/scores`); 
            setListScores(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, []);

    function checkExist(ExamID, UserId) {
        for(let i=0; i<listScores.length; i++)
            if(listScores[i].ExamID === ExamID && listScores[i].UserId === UserId)
                return listScores[i].Score;
        
        return null;
    }

    function UI() {
        return !listExams ? <></> :
        <motion.div className={"kimcenter kimcolumn "+styles.listExams} variants={listVariants}>
            <div className={"kimcenter " + styles.table_header}>
                <div className="kimcenter" style={{width:'75%'}} >Title</div>
                <div className="kimcenter" style={{width:'25%'}} >Status</div>
            </div>
            { listExams.map((exam, index) => 
            <div key={index} className={"kimcenter " + styles.exam}>
                <div className={styles.title}>
                    <strong>{index + 1}.</strong> &nbsp;
                    {exam.title}
                </div>
                <div className={"kimcenter " + styles.operator}>
                {checkExist(exam.ExamID, currentUser.UserId) ? <p>{checkExist(exam.ExamID, currentUser.UserId)} / {exam.questions.questions.length} </p> :
                    <img className='kimpointer' alt={exam.ExamID} src={Play}
                    onClick={(e)=>{navigate('/exam/' + e.target.alt);}} />}
                </div>
            </div>
            )}
            <div className={'kimpointer '+styles.buttonCreate}></div>
        </motion.div>
    }

    return <UI/>
}

export default Exams