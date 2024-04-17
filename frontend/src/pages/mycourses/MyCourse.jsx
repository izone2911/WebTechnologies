import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";
import axios from "axios"

import './dependencies/css/style.css';

function MyCourse() {
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
    const [courses, setCourses] = useState([]);

    // add new course handle
    const [addCoursePopUp, setAddCoursePopUp] = useState(false);
    const togglePopup = () => {
        setAddCoursePopUp(!addCoursePopUp);
    };

    const newCourse = {
        maHP: "",
        kiHoc: "",
        maLop: "",
        author: acc.name,
        emailAuthor: acc.email,
        nameCourse: "",
        description: "",
        img: "",
        createAt: null,
        deleteAt: ""
    };

    const handleAddNewCourse = async () =>{
        // console.log(newCourse);
        try {
			const res = await axios.post("http://localhost:4000/api/mycourse/addnewcourse", newCourse);
			console.log(res.data);
			console.log("Add new course successfull");
            courses.unshift(newCourse);
            togglePopup(); // close popup
		} catch (err) {
			console.error("Add course failed",err);
		}
    }

    // add student into course
    var addedStudent = "";
    var [courseChoice, setCourseChoice] = useState();

    const [addStudentPopUp, setAddStudentPopUp] = useState(false);
    const togglePopupAddStudent = (course) => {
        setCourseChoice(course);
        setAddStudentPopUp(!addStudentPopUp);
    };

    const handleAddStudent = async ()=>{
        try {
            console.log("Dumb cost");
            console.log(courseChoice);
            const res = await axios.post("http://localhost:4000/api/mycourse/addstudent", {student: addedStudent, course: courseChoice});
            console.log(res.data);
            console.log("Add student successfull");
            togglePopupAddStudent();
        } catch (error) {
            console.log(error);
        }
    }

    // edit course
    var courseEdit = {};
    const [editCoursePopUp, setEditCoursePopUp] = useState(false);
    const toggleEditCourse = (course)=>{
        setCourseChoice(course);
        setEditCoursePopUp(!editCoursePopUp);
    };

    // delete course
    const handleDeleteCourse = async(index, course)=>{
        setCourseChoice(course);
        courseChoice = course;
        console.log(courseChoice);
        courses.splice(index, 1);
        const res = await axios.post("http://localhost:4000/api/mycourse/deletecourse", {course: courseChoice});
        console.log(res.data)
    }
    
    // display courses
    useEffect(()=>{
        axios.post("http://localhost:4000/api/mycourse/getmycourse", {email: acc.email})
        .then(result =>{
            setCourses(result.data);
            console.log(courses);
        })
        .catch(err => console.log(err));
    }, []);

    const CourseList = ({ courses }) => {
        return (
          <div className="container">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>

            <div className="course-list-container">
            <h1 style={{marginBottom: "20px"}}>Khóa học của tôi</h1>
            <ul className="course-list">
              {courses.map((course, index) => (
                <li key={index} className="course-item">
                    <img src={course.img} alt="" className="logo"/>
                    <div className="course-info">
                        <h2>{course.nameCourse}</h2>
                        <p><strong>Mã học phần:</strong> {course.maHP}</p>
                        <p><strong>Giảng viên:</strong> {course.author}</p>
                        <p><strong>Kỳ học:</strong> {course.kiHoc}</p>

                        <button>Tiếp tục học</button>
                        <div className="setting">
                            <button className="setting-button"><i class="fas fa-cog"></i></button>
                            {(acc.role == "lecturer") ? (
                                <div className="dropDownSetting">
                                    <a onClick={()=>togglePopupAddStudent(course)}>Add student</a> <br />
                                    <a onClick={()=> toggleEditCourse(course)}>Edit</a> <br />
                                    <a onClick={()=> handleDeleteCourse(index, course)}>Delete</a>
                                </div>
                            ) : (
                                <div className="dropDownSetting">
                                    <a href="" onClick="">Hủy ghi danh</a>
                                </div>
                            )}
                        </div>
                    </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="controller">
              <div className="search-course">
                <h2>Tìm trong khóa học của tôi</h2>
                <input type="text" placeholder="Nhập tên khóa học" />
                <button>Tìm kiếm</button>
              </div>
              {(acc.role == "lecturer")? (
                    <button id="add-course" onClick={togglePopup}>Thêm khóa học</button>
              ): (null)}
              
          </div>
        </div>
        );
    };

    // declare pop-up
    const popup_addCourse = (
        <div className="popup-overlay">
                <div className="popup">
                    <div className="popup-content">
                        <h2>Tạo một khóa học mới</h2>

                        <div className="mb-2">
                            <label htmlFor="">Mã học phần</label>
                            <input type="text" className="form-control"
                            onChange={(e)=> newCourse.maHP = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Kỳ học</label>
                            <input type="text" className="form-control"
                            onChange={(e)=> newCourse.kiHoc = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Mã lớp</label>
                            <input type="text" className="form-control"
                            onChange={(e)=> newCourse.maLop = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Tên môn học</label>
                            <input type="text"  className="form-control"
                            onChange={(e)=> newCourse.nameCourse = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Mô tả</label>
                            <input type="text"  className="form-control"
                            onChange={(e)=> newCourse.description = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Ảnh mô tả</label>
                            <input type="url"  className="form-control"
                            onChange={(e)=> newCourse.img = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Ngày kết thúc</label>
                            <input type="date"  className="form-control"
                            onChange={(e)=> newCourse.deleteAt = e.target.value}/>
                        </div>

                        <button className="btn btn-success" onClick={handleAddNewCourse}>Submit</button>
                        <button className="btn btn-danger" onClick={togglePopup}>Close</button>
                    </div>
                </div>
            </div>
    );

    const popup_addStudent = (
        <div className="popup-overlay">
            <div className="popup">
                <div className="popup-content">
                        <div className="mb-2">
                            <label htmlFor="">Nhập email sinh viên/ học sinh cần thêm</label>
                            <input type="email" className="form-control"
                            onChange={(e)=> addedStudent = e.target.value}/>
                        </div>
                    <button className="btn btn-success" onClick={handleAddStudent}>Submit</button>
                    <button className="btn btn-danger" onClick={togglePopupAddStudent}>Cancel</button>
                </div>
            </div>
        </div>
    );

    const popup_editCourse = (
        <div className="popup-overlay">
                <div className="popup">
                    <div className="popup-content">
                        <h2>Chỉnh sửa khóa học</h2>

                        <div className="mb-2">
                            <label htmlFor="">Mã học phần</label>
                            <input type="text" className="form-control"
                            onChange={(e)=> newCourse.maHP = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Kỳ học</label>
                            <input type="text" className="form-control"
                            onChange={(e)=> newCourse.kiHoc = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Mã lớp</label>
                            <input type="text" className="form-control"
                            onChange={(e)=> newCourse.maLop = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Tên môn học</label>
                            <input type="text"  className="form-control" value={courseEdit.nameCourse}
                            onChange={(e)=> newCourse.nameCourse = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Mô tả</label>
                            <input type="text"  className="form-control"
                            onChange={(e)=> newCourse.description = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Ảnh mô tả</label>
                            <input type="url"  className="form-control"
                            onChange={(e)=> newCourse.img = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Ngày kết thúc</label>
                            <input type="date"  className="form-control"
                            onChange={(e)=> newCourse.deleteAt = e.target.value}/>
                        </div>

                        <button className="btn btn-success" >Submit</button>
                        <button className="btn btn-danger" onClick={toggleEditCourse}>Close</button>
                    </div>
                </div>
            </div>
    );

    return (
        <div className="app-container">
            {addCoursePopUp && popup_addCourse}
            {addStudentPopUp && popup_addStudent}
            {editCoursePopUp && popup_editCourse}
            <CourseList courses={courses} />
        </div>
    )
}

export default MyCourse;
