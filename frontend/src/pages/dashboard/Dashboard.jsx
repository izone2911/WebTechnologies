import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";
import axios from "axios";

import './dependencies/css/style.css';

function Dashboard() {
    const [courses, setCourses] = useState([
        {
            maHP: "",
            kiHoc: "",
            maLop: "",
            author: "",
            emailAuthor: "",
            nameCourse: "",
            description: "",
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
        console.log(search_info);
        // setCourses(liveSearch({search_info, courses}));
    }
    const [search_info,setSearchInfor] = useState('');
    console.log(search_info)

    // course list
    const CourseList = ({ courses }) => {
        return (
            <div className="course-list-container">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
                <h1 style={{marginBottom: "20px",marginTop: "10px"}}>Khám phá khóa học</h1>
                <ul className="course-list">
                {courses.filter((course)=>{
                    var search_lower = search_info.toLowerCase();
                    if(course.nameCourse.toLowerCase().indexOf(search_lower) != -1
                    || course.maHP.toLowerCase().indexOf(search_lower) != -1
                    || course.maLop.toLowerCase().indexOf(search_lower) != -1){
                        return course;
                    }
                }).map((course, index) => (
                    <li key={index} className="course-item">
                        <img src={course.img} alt="" className="logo"/>
                        <div className="course-info">
                            <h2 style={{fontSize:"25px",fontWeight:"700"}}>{course.nameCourse}</h2>
                            <p style={{fontFamily:"Verdana"}}><strong>Mã học phần:</strong> {course.maHP}</p>
                            <p style={{fontFamily:"Verdana"}}><strong>Giảng viên:</strong> {course.author}</p>
                            <p style={{fontFamily:"Verdana"}}><strong>Kỳ học:</strong> {course.kiHoc}</p>

                            {/* <button onClick={() => handleSwitchToCourse(course)}>Xem thông tin khóa học</button> */}
                            <p style={{fontFamily:"Verdana",fontSize:"17px",color:"#F08047",fontWeight:"600"}}>{course.description}</p>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="container">
            <CourseList courses={courses}/>
            <div className="controller">
              <div className="search-course">
                <h2 style={{marginTop:"10px",fontSize:"27px"}}>Tìm trong khóa học của tôi</h2>
                <input type="text" style={{marginTop:"16px",marginBottom:"16px"}} placeholder="Nhập tên khóa học" onChange={(e)=> setSearchInfor(e.target.value)}/>
                <button style={{borderRadius:"15px"}} onClick={()=> searchCourse(search_info)}>Tìm kiếm</button>
              </div>
            </div>
        </div>
        
    )
}

export default Dashboard;

// import React, { useState } from "react";
// import { data } from "./data.js";

// function Dashboard(){
//     const styles = {
//         table: {
//           borderCollapse: 'collapse',
//           border: '1px solid black',
//           width: '100%',
//         },
//         th: {
//           border: '1px solid black',
//           padding: '8px',
//           textAlign: 'left',
//         },
//         td: {
//           border: '1px solid black',
//           padding: '8px',
//         },
//     };

//     const [search, setSearch] = useState('');
//     console.log(search);

//     return(
//         <div className="app-search">
//             <h1>Demo live search</h1>
//             <div>
//                 <form onChange={(e)=> setSearch(e.target.value)}>
//                     <input placeholder="Search course">
//                     </input>
//                 </form>
//             </div>
            
//             <table style={styles.table}>
//                 <thead>
//                     <tr>
//                         <th style={styles.th}>First Name</th>
//                         <th style={styles.th}>Last Name</th>
//                         <th style={styles.th}>Email</th>
//                         <th style={styles.th}>Phone number</th>
//                     </tr>
//                 </thead>
//                 <tbody >
//                     {data.filter((item) => {
//                         return search.toLowerCase() === '' 
//                         ? item 
//                         : item.first_name.toLowerCase().includes(search);
//                     }).map((item)=>{
//                         return(
//                             <tr key={item.id}>
//                                 <td style={styles.td}>{item.first_name}</td>
//                                 <td style={styles.td}>{item.last_name}</td>
//                                 <td style={styles.td}>{item.email}</td>
//                                 <td style={styles.td}>{item.phone}</td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default Dashboard;