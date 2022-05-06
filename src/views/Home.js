import React, {useState, useEffect} from 'react'
import StudentCard from '../components/StudentCard';

export default function Home() {

    const [students, setStudents] = useState([])
    const [searchName, setSearchName] = useState([])

    useEffect(() => {
        var requestOptions = {
            method: 'GET', 
            redirect: 'follow'
        };

        fetch("https://api.hatchways.io/assessment/students", requestOptions)
            .then(res => res.json())
            .then(data => setStudents(data['students']))
    }, []);

    function searchNameHandler(e){
        setSearchName(e.target.value)
    }

    let filteredStudents = students.filter(
        (student) => {
            let fullName = student.firstName + " " + student.lastName
            return fullName.toLowerCase().indexOf(searchName.toString().toLowerCase()) !== -1;
        }
    );

    return (
        <>
            <input id="student-filter" type="text" onChange={(event) => searchNameHandler(event)} placeholder="Search by name" />
            {filteredStudents.map(s => <StudentCard student={s} key={s.id}/>)}
    
        </>
    )
}
