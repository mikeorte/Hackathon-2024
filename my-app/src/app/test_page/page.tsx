'use client'

import CalendarView from "../../../pages/api/calendar_view";
import { GetOverlappingEvents, MergeEvents, GetSoonestPossibleMeeting } from "../../../pages/api/event_parser"

export default function TestPage() {

    const testEvent = {
        start_time: new Date("2024-04-01T12:00:00").toISOString(),
        end_time: new Date("2024-04-01T13:00:00").toISOString()
    };

    const testEvent1 = {
        start_time: new Date("2024-04-01T13:00:00").toISOString(),
        end_time: new Date("2024-04-01T14:00:00").toISOString()
    };

    const testEvent2 = {
        start_time: new Date("2024-04-01T11:00:00").toISOString(),
        end_time: new Date("2024-04-01T12:00:01").toISOString()
    };

    const testEvent3 = {
        start_time: new Date("2024-04-01T11:59:00").toISOString(),
        end_time: new Date("2024-04-01T15:00:00").toISOString()
    };

    const testEvent4 = {
        start_time: new Date("2024-04-01T08:59:00").toISOString(),
        end_time: new Date("2024-04-01T13:00:00").toISOString()
    };

    const testEvents: any[] = [];
    testEvents.push(testEvent);
    testEvents.push(testEvent2);
    testEvents.push(testEvent3);
    testEvents.push(testEvent4);

    const weekdays: string[] = ["mon", "tue", "wed", "thu", "fri"];

    const handleClick = () => {
        MergeEvents(testEvents);
        var events = GetOverlappingEvents(testEvent1, testEvents);
        console.log(events);
        let isoString = GetSoonestPossibleMeeting(1, testEvents, 8, 18, weekdays);
        console.log("Possible soonest date", new Date(isoString.start_time), new Date(isoString.end_time));
    }

    return (
        <div>
            Hello world.
            <button onClick={handleClick}>
                Button for Testing
            </button>
            <CalendarView events={testEvents}/>
        </div>
    )
}