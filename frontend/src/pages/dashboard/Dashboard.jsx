import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";
import axios from "axios";

import './dependencies/css/style.css';
import liveSearch from "../mycourses/LiveSearch";

function Dashboard() {
    const [courses, setCourses] = useState([
        {
            maHP: "IT1234",
            kiHoc: "1234",
            maLop: "123456",
            author: "Failed ",
            emailAuthor: "huyteach@gmail.com",
            nameCourse: "Failed",
            description: "Very excited",
            img: "",
            createAt: null,
            deleteAt: ""
        }
    ]);

    // get all courses from server
    useEffect(()=>{
        axios.post("http://localhost:4000/api/mycourse/getallcourse")
        .then(result =>{
            setCourses(result.data.courses);
        })
        .catch(err => console.log(err));
    }, []);

    // navigate course page after click "Xem thông tin khóa học"
    const navigate = useNavigate();
    const handleSwitchToCourse = async (course)=>{
        navigate(`/course/${course.maLop}`);
    }

    // search 
    const searchCourse = (search_info)=>{
        setCourses(liveSearch({search_info, courses}));
    }

    // course list
    const CourseList = ({ courses }) => {
        var search_infor = "default";
        return (
          <div className="container">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>

            <div className="course-list-container">
                <h1 style={{marginBottom: "20px"}}>Khám phá khóa học</h1>
                <ul className="course-list">
                {courses.map((course, index) => (
                    <li key={index} className="course-item">
                        <img src={course.img} alt="" className="logo"/>
                        <div className="course-info">
                            <h2>{course.nameCourse}</h2>
                            <p><strong>Mã học phần:</strong> {course.maHP}</p>
                            <p><strong>Giảng viên:</strong> {course.author}</p>
                            <p><strong>Kỳ học:</strong> {course.kiHoc}</p>

                            <button onClick={() => handleSwitchToCourse(course)}>Xem thông tin khóa học</button>
                            
                        </div>
                    </li>
                ))}
                </ul>
            </div>
          <div className="controller">
              <div className="search-course">
                <h2>Tìm trong khóa học của tôi</h2>
                <input type="text" placeholder="Nhập tên khóa học" onChange={(e)=> search_infor = e.target.value}/>
                <button onClick={()=> searchCourse(search_infor)}>Tìm kiếm</button>
              </div>
          </div>
        </div>
        );
    };

    return (
        <CourseList courses={courses}/>
    )
}

export default Dashboard;