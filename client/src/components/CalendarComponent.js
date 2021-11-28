import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddIcon from '@mui/icons-material/Add';
import DatePicker from "react-datepicker";

const locales = {
    "en-IN": require("date-fns/locale/en-IN")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,

});

const events = [
    {
        title: "meeting 1",
        allDay: false,
        start: new Date(2021, 10, 28, 10, 0, 0),
        end: new Date(2021, 10, 28, 11, 0, 0)
    },
    {
        title: "meeting 2",
        allDay: false,
        start: new Date(2021, 10, 28, 11, 0, 0),
        end: new Date(2021, 10, 28, 12, 0, 0)
    }
]
const CalendarComponent = () => {
    return (
        <div>
            <div className="create-a-meeting">
                    <AddIcon bg="blue"/>
                    <div className="create-a-meeting-text">create a meeting</div>
            </div>
            <Calendar 
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{height: 500, margin: "50px"}}
            onSelectEvent = {(e) => console.log(e)}/>
        </div>
    );
}
 
export default CalendarComponent;