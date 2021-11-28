import NavbarAfterLogin from './NavbarAfterLogin';
import {useState} from 'react';
import CalendarComponent from './CalendarComponent';
import People from './People';
import Subjects from './Subjects';
import { useEffect} from 'react';
import axios from 'axios';

const Home = () => {
    const [subjectSelected, setSubjectSelected] = useState("");
    const [tabNumber, setTabNumber] = useState(1);
    
    function changeTabNumber(value) {
        setTabNumber(value);
    }

    function changeSubjectId(id) {
        setSubjectSelected(id);
    }
    return (
        subjectSelected.length===0?
        <div>
            <NavbarAfterLogin subjectSelected={false}/>
            <Subjects changeSubjectId={changeSubjectId}/>
        </div>
        :
        <div>
            <NavbarAfterLogin subjectSelected={true} changeTabNumber={changeTabNumber}/>
            {tabNumber===1?<CalendarComponent />:(tabNumber===2?<People />:"")}
        </div>
    );
}
 
export default Home;