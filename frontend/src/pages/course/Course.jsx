import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";
import axios from "axios"

import './dependencies/css/style.css';

function Course() {
    const student_acc = {
        email: "huydz@gmail.com",
        name: "Lê Đức Huy",
        role: "student"
    }; // fixed student account 

    const teacher_acc = {
        email: "huyteach@gmail.com",
        name: "Thầy Huy",
        role: "lecturer"
    }  // fixed teacher account

    const acc = teacher_acc;

    const course = {
        name: "Machine Learning",
        description: "This is course about basic machine learning"
    }

    const exam = {
        maHP: "IT3150",
        kiHoc: "2023.2",
        maLop: "123321",
        numQuestion: 20,
        type: "Giua ky",
        createAt: "20/03/2023",
        deleteAr: ""
    }

    const excercises = [
        {
            maHP: "IT3150",
            kiHoc: "2023.2",
            maLop: "123321",
            numExcercise: 1,
            numQuestion: 15,
            score: null, 
            type: "luyện tập",
            createAt: "20/03/2023",
            deleteAt: ""
        },

        {
            maHP: "IT3150",
            kiHoc: "2023.2",
            maLop: "123321",
            numExcercise: 2,
            numQuestion: 10,
            score: null,
            type: "luyện tập",
            createAt: "20/03/2023",
            deleteAt: ""
        }
    ];

    const ExamList = () => {
        return(
            <div className="container">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>

                <h2>{course.name}</h2>
                <p>{course.description}</p>
                <div className="quiz-list-container">
                {excercises.map((quiz, index) => (
                <li key={index} className="quiz-item">
                    <img src="https://img.freepik.com/premium-vector/quiz-logo-with-speech-bubble-symbols-concept-questionnaire-show-sing-quiz-button-question-competition-exam-interview-modern-emblem_180786-72.jpg" className="logo"/>
                    <div className="quiz-info">
                        <h2>{"Quiz " + quiz.numExcercise}</h2>
                        <p>{"Số câu hỏi: " + quiz.numQuestion}</p>
                        <p>{"Điểm: " + quiz.score}</p>

                        <button className="setting-button">Vào thi</button>
                        <div className="setting">
                            <button className="setting-button"><i class="fas fa-cog"></i></button>
                            {(acc.role == "lecturer") ? (
                                <div className="dropDownSetting">
                                    <a >Edit</a> <br />
                                    <a >Delete</a>
                                </div>
                            ) : (null)}
                        </div>
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
}

export default Course;
