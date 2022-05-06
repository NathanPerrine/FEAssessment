import React from 'react'

export default function StudentCard(props) {
    const student = props.student;
    const average = student.grades.reduce((a, b) => parseInt(a) + parseInt(b)) / student.grades.length;

    const grades = student.grades.map((grade, index) =>
        <div className="row">
            <div className="col-2">
                <p className="card-text">Test {index + 1}:</p>
            </div>
            <div className="col-2">
                <p className="card-text">{grade}%</p>
            </div>
        </div>
    );

    function enterHandler(e){
        console.log(e.target.value)
    };

    return (
        <>
        <div className="card mb-3 border-0">
            <div className="row g-0">
                <div className="col-md-4 d-flex justify-content-center mt-2 ">
                    <img src={ student.pic } alt="student profile"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="row">
                        <div className="col-9">
                            <h1 className="card-title student-title">{ student.firstName } { student.lastName }</h1>
                        </div>
                        <div className="col-3 d-flex justify-content-center align-items-center">
                            <a className="btn" data-bs-toggle="collapse" href={`#collapse${ student.id }`} role="button" aria-expanded="false" aria-controls={`collapse${ student.id}`}>
                                <i className="fas fa-plus fa-2x"></i>
                            </a>
                        </div>

                        </div>
                        <div className="ms-4">
                            <p className="card-text">Email: { student.email }</p>
                            <p className="card-text">Company: { student.company }</p>
                            <p className="card-text">Skill: { student.skill }</p>
                            <p className="card-text">Average: { average } </p>

                            <div className="collapse mt-3" id={`collapse${ student.id }`}>
                                {grades}
                            </div>

                            <div>
                                <input type="text" onKeyDown={(e) => {if (e.key === "Enter") {enterHandler(e)}} } placeholder="Add a tag" />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <hr/>
        </>
    )
}
