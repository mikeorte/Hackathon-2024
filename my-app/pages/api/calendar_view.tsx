import CalendarViewDay from "./calendar_view_day";
import { FilterEventsOnDay, GetDistinctDates } from "./event_parser";

const CalendarView = (props: any) => {
    console.log(props.events);
    const distinctDates = GetDistinctDates(props.events);

    return (
        <div className="flex calendar">
            {distinctDates.map((date) => (
                <CalendarViewDay day={new Date(date).toDateString()} events={FilterEventsOnDay(props.events, date)} />
            ))}
        </div>
    );
}

export default CalendarView;