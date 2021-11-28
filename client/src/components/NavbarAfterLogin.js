import {Tabs, Tab} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useState } from 'react';

const cursorStyle = {cursor: "pointer"};

const NavbarAfterLogin = ({ subjectSelected, changeTabNumber }) => {

    const [value, setValue] = useState(0);

    return (
        <div>
            <div className="NavbarAfterLogin">
                <div style={cursorStyle}>
                    <div className="Website-name">
                        <EventIcon />
                        <div>Scheduler</div>
                    </div>
                </div>
                {subjectSelected?
                <div>
                    <Tabs value={value} onChange = {(event, value) => {setValue(value); console.log(value); changeTabNumber(value)}}>
                    <Tab label="Announcements"/>
                    <Tab label="Calendar" />
                    <Tab label="People" />
                    </Tabs>
                </div>:""
                }   
                <div className="Login-Signup-container">
                    <div style={cursorStyle}>Login</div>
                    <div style={cursorStyle}>SignUp</div>
                </div>
            </div>
            <hr style={{margin: "0px", padding: "0px"}}/>
        </div>
    );
}
 
export default NavbarAfterLogin;