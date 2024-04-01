'use client'

import { GetOverlappingEvents } from "../../../pages/api/event_parser"

export default function TestPage() {

    const testEvent = {
        start_time: "2024-07-29T12:00:00Z",
        end_time: "2024-07-29T13:00:00Z"
    };

    const testEvent1 = {
        start_time: "2024-07-29T13:00:00Z",
        end_time: "2024-07-29T14:00:00Z"
    };

    const testEvent2 = {
        start_time: "2024-07-29T11:00:00Z",
        end_time: "2024-07-29T12:00:01Z"
    };

    const testEvent3 = {
        start_time: "2024-07-29T11:59:00Z",
        end_time: "2024-07-29T15:00:00Z"
    };

    const testEvent4 = {
        start_time: "2024-07-29T9:59:00Z",
        end_time: "2024-07-29T15:00:00Z"
    };

    const testEvents: any[] = [];
    testEvents.push(testEvent);
    testEvents.push(testEvent2);
    testEvents.push(testEvent3);
    testEvents.push(testEvent4);

    const handleClick = () => {
        var events = GetOverlappingEvents(testEvent1, testEvents);
        console.log(events);
    }

    return (
        <div>
            Hello world.
            <button onClick={handleClick}>
                Button for Testing
            </button>
        </div>
    )
}