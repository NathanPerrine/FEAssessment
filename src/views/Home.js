import React, {useState, useEffect} from 'react'
import StudentCard from '../components/StudentCard';

export default function Home() {

    const [students, setStudents] = useState([])
    const [searchName, setSearchName] = useState([])
    const [searchTag, setSearchTag] = useState("")

    // Get students on load
    useEffect(() => {
        var requestOptions = {
            method: 'GET', 
            redirect: 'follow'
        };

        fetch("https://api.hatchways.io/assessment/students", requestOptions)
            .then(res => res.json())
            .then(data => {
                // Data is stored under the 'students' key
                data = data['students']
                // Loop through data and add a 'tags' section before it goes through to any other sections
                for(let i = 0; i < data.length; i++){
                    data[i]['tags'] = null
                }
                setStudents(data)
        })
    }, []);

    function searchNameHandler(e){
        setSearchName(e.target.value)
    }

    function searchTagHandler(e){
        setSearchTag(e.target.value)
    }

    let filteredStudents = students.filter(
        (student) => {
            let fullName = student.firstName + " " + student.lastName
            return fullName.toLowerCase().indexOf(searchName.toString().toLowerCase()) !== -1;
        }
    );

    let tagFilteredStudents = filteredStudents.filter(
        (student) => {
            if (searchTag === ""){return true}
            else if (student.tags !== null){
                    for (let tag of student.tags){
                        if (tag.includes(searchTag)) {return true}
                    }
                }
            return false
        }
    )

    const enterHandler = (e, id) => {
        if (students[id]['tags'] == null){
            students[id]['tags'] = []
        }
        students[id]['tags'].push(e.target.value)
    };

    return (
        <>
            <input className="student-filter" type="text" onChange={(event) => searchNameHandler(event)} placeholder="Search by name" />
            <input className="student-filter" type="text" onChange={(event) => searchTagHandler(event)} placeholder="Search by tag" />
            {tagFilteredStudents.map(s => <StudentCard student={s} key={s.id} enterHandler={enterHandler}/>)}
        </>
    )
}
