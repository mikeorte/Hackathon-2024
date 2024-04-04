const CalendarViewDay = (props: any) => {
    const day: string = props.day;
    const events: any[] = props.events;

    return (
        <div className="calendar-day-container flex flex-col">
            <h1>{day}</h1>
            {events.map((event) => (
                <CalendarEvent start_time={event.start_time} end_time={event.end_time}/>
            ))}
        </div>
    );
}

export default CalendarViewDay;

const CalendarEvent = (props: any) => {
    const eventStart = props.start_time;
    const eventEnt = props.end_time;

    return (
        <div className="my-2 py-3 px-3 bg-red-600">
            <h3>
                {new Date(eventStart).toLocaleTimeString()}
            </h3>
            <h3>
                {new Date(eventEnt).toLocaleTimeString()}
            </h3>
        </div>
    );
}