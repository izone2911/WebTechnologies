import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";
import axios from "axios"
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from "framer-motion";
import './dependencies/css/style.css';
import { AuthContext } from "../../context/authContext";

function Course() {
    const navigate = useNavigate();

    const {currentUser} = useContext(AuthContext);
    const acc = currentUser

    const [course, setCourse] = useState({
        nameCourse: "",
        description: ""
    });

    const [exams, setExams] = useState([
        {
            maHP: "",
            kiHoc: "",
            maLop: "",
            numQuestion: 20,
            score: null,
            title: "",
            type: "",
            createAt: "",
            deleteAr: ""
        }
    ]);

    const [exercises, setExercises] = useState([
        {
            maHP: "",
            kiHoc: "",
            maLop: "",
            numExcercise: 1,
            numQuestion: 15,
            score: null, 
            title: "",
            type: "",
            createAt: "",
            deleteAt: ""
        },

        {
            maHP: "",
            kiHoc: "",
            maLop: "",
            numExcercise: 2,
            numQuestion: 10,
            score: null,
            title: "",
            type: "",
            createAt: "",
            deleteAt: ""
        }
    ]);

    const maLop = useParams();

    useEffect(()=>{
        axios.post("http://localhost:4000/api/mycourse/getcourse", {maLop: maLop, userID: acc.email})
        .then(result =>{
            setCourse(result.data.course[0]);
            setExams(result.data.exams);
            setExercises(result.data.exercises);
        })
        .catch(err => console.log(err));
    }, []);


    const ParseCSV_Exercise = () => {
        const fileInput = document.getElementById('inputFile');
        const file = fileInput?.files[0];
  
        if (file && file.type === 'text/csv') {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const csvData = e.target.result;
            const jsonData = convertCsvToJson_Exercise(csvData);
            console.log("DATA",jsonData)
            await axios.post("http://localhost:4000/api/exercise/updateExercise",jsonData)
            console.log("Success")
          };
          reader.readAsText(file);
        } else {
          alert('Please select a valid CSV file');
        }
      }
    
    function convertCsvToJson_Exercise(csvData) {
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',');
        let data = {};
        data.questions = {}
        data.answers = {}
        const rowOne = lines[1].split(',')
        for(let j=0; j < headers.length; j++) {
            if(headers[j]!=='option' && headers[j]!=='question' && headers[j]!=='timeLimit' && headers[j]!=='answer' && headers[j]!=='type' && headers[j]!=='!important ')
                data[headers[j]] = rowOne[j]
            if(headers[j]==='timeLimit') {
                let newDate = new Date(rowOne[j])
                let timeStamp = newDate.getTime()
                data.questions.timeLimit = timeStamp
            }
        }
        data.exerciseID = data.maLop + data.maHP + data.kiHoc + data.title
        
        data.questions.questions = []
        data.answers.answers = []

        for(let i=1;i<lines.length; i++) {
            const rowI = lines[i].split(',')
            let questionData = {}
            let answerData = []
            for(let j=0; j<headers.length; j++) {
                if(headers[j]==='question')
                    questionData[headers[j]] = rowI[j]
                if(headers[j]==='option')
                    questionData.options = rowI[j].split(';')
                if(headers[j]==='type')
                    questionData.type = rowI[j]
                if(headers[j]==='answer') {
                    let newArr = rowI[j].split(';')
                    newArr = newArr.map((item) => {
                        return parseInt(item)
                    })
                    answerData = newArr
                }
            }
            data.questions.questions = [...data.questions.questions,questionData]
            data.answers.answers = [...data.answers.answers,answerData]
        }

        return data
    }

    const ParseCSV_Exam = () => {
        const fileInput = document.getElementById('inputFileExam');
        const file = fileInput?.files[0];
  
        if (file && file.type === 'text/csv') {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const csvData = e.target.result;
            const jsonData = convertCsvToJson_Exam(csvData);
            console.log("DATA",jsonData)
            await axios.post("http://localhost:4000/api/exam/updateExam",jsonData)
            console.log("Success")
          };
          reader.readAsText(file);
        } else {
          alert('Please select a valid CSV file');
        }
      }
    
    function convertCsvToJson_Exam(csvData) {
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',');
        let data = {};
        data.questions = {}
        data.answers = {}
        const rowOne = lines[1].split(',')
        for(let j=0; j < headers.length; j++) {
            if(headers[j]!=='option' && headers[j]!=='question' && headers[j]!=='timeLimit' && headers[j]!=='answer' && headers[j]!=='type' && headers[j]!=='!important ')
                data[headers[j]] = rowOne[j]
            if(headers[j]==='timeLimit') {
                data.questions.timeLimit = parseInt(rowOne[j])
            }
        }
        data.examID = data.maLop + data.maHP + data.kiHoc + data.title
        
        data.questions.questions = []
        data.answers.answers = []

        for(let i=1;i<lines.length; i++) {
            const rowI = lines[i].split(',')
            let questionData = {}
            let answerData = []
            for(let j=0; j<headers.length; j++) {
                if(headers[j]==='question')
                    questionData[headers[j]] = rowI[j]
                if(headers[j]==='option')
                    questionData.options = rowI[j].split(';')
                if(headers[j]==='type')
                    questionData.type = rowI[j]
                if(headers[j]==='answer') {
                    let newArr = rowI[j].split(';')
                    newArr = newArr.map((item) => {
                        return parseInt(item)
                    })
                    answerData = newArr
                }
            }
            data.questions.questions = [...data.questions.questions,questionData]
            data.answers.answers = [...data.answers.answers,answerData]
        }

        return data
    }  

    const ExamList = () => {
        return(
            <div style={{marginLeft:"50px",marginRight:"50px"}} className="container2">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>

                <h2 style={{marginTop:"10px",fontSize:"40px"}}>{course.nameCourse}</h2>
                <p style={{fontFamily:"Verdana",fontSize:"20px"}}>{course.description}</p>
                <div className="quiz-list-container">
                {exercises.map((quiz, index) => (
                    <li key={index} className="quiz-item">
                        <div className="all-div-ex">
                            <div className="div-image">
                                <img src="https://img.freepik.com/premium-vector/quiz-logo-with-speech-bubble-symbols-concept-questionnaire-show-sing-quiz-button-question-competition-exam-interview-modern-emblem_180786-72.jpg" className="logo"/>
                                <div className="quiz-info">
                                
                                    <p style={{fontFamily:"Verdana",fontSize:"20px"}}>{quiz.title}</p>
                                    <p style={{fontFamily:"Verdana"}}>{"Số câu hỏi: " + quiz.numQuestion}</p>
                                    <p style={{fontFamily:"Verdana"}}>Thời hạn: {quiz.timeLimit}</p>

                                    {acc.role === 'Teacher'?
                                    <button style={{borderRadius:"15px"}} className="setting-button" onClick={(e) => {navigate('/exercise/'+quiz.exerciseID)}}>Xem đề thi</button>:
                                    null}
                                    {acc.role === 'Student'? quiz.score !== -100 ?
                                    <p style={{fontFamily:"Verdana",fontSize:"16px",fontWeight:"700",color:"red"}}>Điểm: {quiz.score} ({quiz.numTrue}/{quiz.numQues})</p>:
                                    <button style={{borderRadius:"15px"}} className="setting-button" onClick={(e) => {navigate('/exercise/'+quiz.exerciseID)}}>Vào thi</button>:
                                    null}
                                    {acc.role === 'Teacher'?
                                    <>
                                    <input type="file" onChange={ParseCSV_Exercise} id='inputFile' accept=".csv" style={{display:"none"}}/>
                                    <button style={{borderRadius:"15px",marginLeft:"5px"}} className="setting-button" onClick={()=>{document.getElementById('inputFile').value="";document.getElementById('inputFile').click()}}>Upload</button>
                                    </>
                                    :null}
                                </div>
                            </div>

                            <div className="div-chart">
                            </div>
                            {acc.role === 'Teacher'?
                            <div className="div-delete">
                                <div className="icon-delete">
                                <motion.button
                                    whileHover={{ scale: 1.4 }}
                                    style={{width:"30px",height:"50px",display:"flex",justifyContent:"center",color:"#4a4a4a",backgroundColor:"white"}}
                                    onClick={()=>{console.log("hello")}}>
                                    <DeleteIcon title="Delete" style={{scale:"1.2"}}/>
                                </motion.button>
                                </div>
                            </div>
                            :null}
                        </div>
                    </li>
              ))}
                </div>

                <div className="exam-container">
                    {exams.map((exam, index) => (
                        <li key={index} className="exam-item">
                            <div className="all-div-ex">
                                <div className="div-image">
                                    <img src="data:image/jpeg;base64,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" className="logo"/>
                                    <div className="exam-info">
                                        <p style={{fontFamily:"Verdana",fontSize:"20px"}}>{exam.title}</p>
                                        <p style={{fontFamily:"Verdana"}}>{"Số câu hỏi: " + exam.numQuestion}</p>
                                        <p style={{fontFamily:"Verdana"}}>{"Thời gian: " + exam.timeLimit + " minute"}</p>

                                        {acc.role === 'Teacher'?
                                        <button style={{borderRadius:"15px"}} className="setting-button" onClick={(e) => {navigate('/exam/'+exam.examID)}}>Xem đề thi</button>:
                                        null}
                                        {acc.role === 'Student'? exam.score !== -100 ?
                                        <p style={{fontFamily:"Verdana",fontSize:"16px",fontWeight:"700",color:"red"}}>Điểm: {exam.score} ({exam.numTrue}/{exam.numQues})</p>:
                                        <button style={{borderRadius:"15px"}} className="setting-button" onClick={(e) => {navigate('/exam/'+exam.examID)}}>Vào thi</button>:
                                        null}
                                        {acc.role === 'Teacher'?
                                        <>
                                        <input type="file" onChange={ParseCSV_Exam} id='inputFileExam' accept=".csv" style={{display:"none"}}/>
                                        <button style={{borderRadius:"15px",marginLeft:"5px"}} className="setting-button" onClick={()=>{document.getElementById('inputFileExam').value="";document.getElementById('inputFileExam').click()}}>Upload</button>
                                        </>
                                        :null}
                                    </div>
                                </div>

                                <div className="div-chart">
                                </div>
                                {acc.role === 'Teacher'?
                                <div className="div-delete">
                                    <div className="icon-delete">
                                    <motion.button
                                        whileHover={{ scale: 1.4 }}
                                        style={{width:"30px",height:"50px",display:"flex",justifyContent:"center",color:"#4a4a4a",backgroundColor:"white"}}
                                        onClick={()=>{console.log("hello")}}>
                                        <DeleteIcon title="Delete" style={{scale:"1.2"}}/>
                                    </motion.button>
                                    </div>
                                </div>
                                :null}
                            </div>
                        </li>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="app-container">
            <ExamList/>
        </div>
    )

    // Test code hiển thị file pdf

  //   const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleUpload = () => {
  //   // Thực hiện xử lý tệp tại đây, ví dụ: tải lên server
  //   if (selectedFile) {
  //     console.log("Đã chọn tệp:", selectedFile);
  //     // Gửi tệp đến máy chủ hoặc thực hiện xử lý khác ở đây
  //   } else {
  //     console.log("Không có tệp được chọn.");
  //   }
  // };

  // return (
  //   <div>
  //     <h2>Tải lên tệp PDF</h2>
  //     <input type="file" onChange={handleFileChange} accept=".pdf" />
  //     <button onClick={handleUpload}>Tải lên</button>
  //   </div>
  // );
}

export default Course;
