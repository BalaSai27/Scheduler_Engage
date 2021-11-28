
const Subjects = ({changeSubjectId}) => {
    const subjects = ["maths", "physics", "chemistry"];
    return (
        <div className="people">
            <div className="people-container">
                <h2 style={{fontWeight: "200", color: "blue"}}>Subjects</h2>
                <hr style={{color: "blue"}}/>
                {
                    subjects.map((key, value) => {
                        return(
                            <>
                                <p className="subject" onClick={() => changeSubjectId("subjectId")}>{key}</p>
                                <hr />
                            </>
                            )
                    })
                    
                }
            </div>
        </div>
    );
}
 
export default Subjects;