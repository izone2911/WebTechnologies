import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";

function liveSearch({search_info ,courses}){
    var course_search = [];
    search_info = search_info.toLowerCase();
    for(var course of courses){
        var str = course.nameCourse.toLowerCase();
        if(str.indexOf(search_info) !== -1){
            course_search.push(course);
        }
    }
    return course_search;
}

export default liveSearch;