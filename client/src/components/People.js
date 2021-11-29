import {useState} from 'react';

// this component is used for showing the people enrolled in a particular subject
const People = () => {
    const teacher = "Bala";
    const students = ["Bala", "Sai", "Srinivas"];
    return (
        <div className = "people">
            <div className="people-container">
                <h2 style={{fontWeight: "200", color: "blue"}}>Teachers</h2>
                <hr style={{color: "blue"}}/>
                <p className="profile">{teacher}</p>
                <h2 style={{fontWeight: "200", color: "blue"}}>Students</h2>
                <hr style={{color: "blue"}}/>
                {
                    students.map((key, value) => {
                        return(
                        <>
                            <p className="profile">{key}</p>
                            <hr />
                        </>
                        )
                    })
                
                }
            </div>
        </div>
    );
}
 
export default People;