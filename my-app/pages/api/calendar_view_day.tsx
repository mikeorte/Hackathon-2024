import { ConvertToEventListWithBlockedAttributes } from "./event_parser";

const CalendarViewDay = (props: any) => {
    const day: string = props.day;
    const events_with_gap_info: any[] = ConvertToEventListWithBlockedAttributes(props.events);

    return (
        <div className="calendar-day-container flex flex-col">
            <h1>{day}</h1>
            {events_with_gap_info.map((event) => (
                <CalendarEvent start_time={event.start_time} end_time={event.end_time} blocked={event.blocked}/>
            ))}
        </div>
    );
}

export default CalendarViewDay;

const CalendarEvent = (props: any) => {
    const eventStart = props.start_time;
    const eventEnt = props.end_time;
    let eventClass = "";

    if (props.blocked === true) {
        eventClass = "blocked-event";
    }
    else {
        eventClass = "unblocked-event";
    }

    return (
        <div className={eventClass}>
            <h3>
                {new Date(eventStart).toLocaleTimeString()}
            </h3>
            <h3>
                {new Date(eventEnt).toLocaleTimeString()}
            </h3>
        </div>
    );
}