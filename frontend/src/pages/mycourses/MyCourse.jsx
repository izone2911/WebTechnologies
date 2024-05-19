import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";
import axios from "axios";

import './dependencies/css/style.css';
import { AuthContext } from "../../context/authContext";

function MyCourse() {
    const student_acc = {
        email: "huydz@gmail.com",
        name: "Lê Đức Huy",
        role: "student"
    }; // fixed student account 

    const teacher_acc1 = {
        email: "huyteach@gmail.com",
        name: "Thầy Huy",
        role: "lecturer"
    }  // fixed teacher account 1

    const teacher_acc2 = {
        email: "huylostteach@gmail.com",
        name: "Thầy Huy Hà Thành",
        role: "lecturer"
    }  // fixed teacher account 2

    const [acc, setAcc] = useState({});

    // Get account
    const { currentUser } = useContext(AuthContext);
    console.log("email current : ");
    console.log(currentUser.email);

    useEffect(() => {
        if (currentUser && currentUser.email) {
            axios.post("http://localhost:4000/api/auth/login", { email: currentUser.email })
                .then(result => {
                    setAcc(result.data[0]);
                    console.log("DUMB");
                    console.log(acc);
                })
                .catch(err => console.log(err));
        }
    }, []);
    
    // console.log("Acc : ");
    // console.log(acc);

    const [courses, setCourses] = useState([]);

    const [indexCourseChoice, setIndexCourseChoice] = useState();

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

    // navigate course page
    const navigate = useNavigate();
    const handleSwitchToCourse = async (course)=>{
        navigate(`/course/${course.maLop}`);
    }

    // add student into course
    var addedStudent = "";
    const [addStudentPopUp, setAddStudentPopUp] = useState(false);
    const togglePopupAddStudent = (index) => {
        setIndexCourseChoice(index);
        setAddStudentPopUp(!addStudentPopUp);
    };

    const handleAddStudent = async ()=>{
        try {
            const course = courses[indexCourseChoice];
            console.log(course);
            const res = await axios.post("http://localhost:4000/api/mycourse/addstudent", {student: addedStudent, course: course});
            console.log(res.data);
            console.log("Add student successfull");
            togglePopupAddStudent();
        } catch (error) {
            console.log(error);
            console.log(error);
        }
    }

    // edit course
    // var indexEdit ;
    const [editCoursePopUp, setEditCoursePopUp] = useState(false);
    const toggleEditCourse = (index)=>{
        setIndexCourseChoice(index);
        setEditCoursePopUp(!editCoursePopUp);
    };

    const handleEditCourse = async(index, course)=>{
        const res = await axios.post("http://localhost:4000/api/mycourse/updatecourse", {course: course});
        console.log(res.data);
        courses[index] = course; 
        toggleEditCourse(course);

    }

    // delete course
    const handleDeleteCourse = async(index)=>{
        setIndexCourseChoice(index);
        const course = courses[index];
        console.log("Delete " + course.nameCourse);
        courses.splice(index, 1);
        const res = await axios.post("http://localhost:4000/api/mycourse/deletecourse", {course: course});
        console.log(res.data);
    }
    
    // display courses

    // get courses of acc from server
    useEffect(()=>{
        axios.post("http://localhost:4000/api/mycourse/getmycourse", {email: acc.email})
        .then(result =>{
            setCourses(result.data);
            // console.log(result.data);
        })
        .catch(err => console.log(err));
    }, []);

    // search course
    const [search_info, setSearchInfor] = useState('');
    console.log(search_info);
    const searchCourse = (search_info)=>{
        console.log(search_info);
        // setCourses(liveSearch({search_info, courses}));
    }
    

    const CourseList = ({ courses }) => {
        return (
            <div className="course-list-container">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
                <h1 style={{marginBottom: "20px"}}>Khóa học của tôi</h1>
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
                            <h2>{course.nameCourse}</h2>
                            <p><strong>Mã học phần:</strong> {course.maHP}</p>
                            <p><strong>Giảng viên:</strong> {course.author}</p>
                            <p><strong>Kỳ học:</strong> {course.kiHoc}</p>

                            <button onClick={()=> handleSwitchToCourse(course)}>Tiếp tục học</button>
                            
                            <div className="setting">
                                <button className="setting-button"><i class="fas fa-cog"></i></button>
                                {(acc.role == "lecturer") ? (
                                    <div className="dropDownSetting">
                                        <a onClick={()=>togglePopupAddStudent(index)}>Add student</a> <br />
                                        <a onClick={()=> toggleEditCourse(index)}>Edit</a> <br />
                                        <a onClick={()=> handleDeleteCourse(index)}>Delete</a>
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

    const popup_editCourse = (index) => {
        const course = courses[index];
        console.log("abc");
        console.log(index);
        return (
            <div className="popup-overlay">
                <div className="popup">
                    <div className="popup-content">
                        <h2>Chỉnh sửa khóa học</h2>

                        <div className="mb-2">
                            <label htmlFor="">Mã học phần</label>
                            <input type="text" className="form-control" defaultValue={course.maHP}
                            onChange={(e)=> course.maHP = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Kỳ học</label>
                            <input type="text" className="form-control" defaultValue={course.kiHoc}
                            onChange={(e)=> course.kiHoc = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Mã lớp</label>
                            <input type="text" className="form-control" defaultValue={course.maLop}
                            onChange={(e)=> course.maLop = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Tên môn học</label>
                            <input type="text"  className="form-control" defaultValue= {course.nameCourse}
                            onChange={(e)=> course.nameCourse = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Mô tả</label>
                            <input type="text"  className="form-control" defaultValue={course.description}
                            onChange={(e)=> course.description = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Ảnh mô tả</label>
                            <input type="url"  className="form-control" defaultValue={course.img}
                            onChange={(e)=> course.img = e.target.value}/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="">Ngày kết thúc</label>
                            <input type="date"  className="form-control" defaultValue={course.deleteAt}
                            onChange={(e)=> course.deleteAt = e.target.value}/>
                        </div>

                        <button className="btn btn-success" onClick={(e)=>handleEditCourse(index, course)}>Submit</button>
                        <button className="btn btn-danger" onClick={toggleEditCourse}>Close</button>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className="app-container">
            {addCoursePopUp && popup_addCourse}
            {addStudentPopUp && popup_addStudent}
            {editCoursePopUp && popup_editCourse(indexCourseChoice)}
            <div className="container">
                <CourseList courses={courses} />
                <div className="controller">
                    <div className="search-course">
                        <h2>Tìm trong khóa học của tôi</h2>
                        <input type="text" className="my-3" placeholder="Nhập tên khóa học" onChange={(e)=> setSearchInfor(e.target.value)}/>
                        <button onClick={() => searchCourse(search_info)}>Tìm kiếm</button>
                    </div>
                    {(acc.role == "lecturer")? (
                            <button id="add-course" onClick={togglePopup}>Thêm khóa học</button>
                    ): (null)}
                    
                </div>
            </div>
            
        </div>
    )
}

export default MyCourse;