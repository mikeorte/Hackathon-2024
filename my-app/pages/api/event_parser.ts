/**
 * Checks if the provided events overlap.
 * @param {any} event1 Object with attributes 
 * "start_time" and "end_time". Start and end time must be parseable by Date.parse().
 * @param {any} event2 Object with attributes 
 * "start_time" and "end_time". Start and end time must be parseable by Date.parse().
 * 
 * @returns {boolean} Returns true if the events overlap.
 */
export function CheckIfEventOverlaps(event1: any, event2: any): boolean {
    const msStart = Date.parse(event1.start_time);
    const msEnd = Date.parse(event1.end_time);
    const otherMsStart = Date.parse(event2.start_time);
    const otherMsEnd = Date.parse(event2.end_time);
    //console.log(msStart, msEnd, otherMsStart, otherMsEnd);
    if (msStart >= otherMsEnd) return false;
    else if (msEnd <= otherMsStart) return false;
    else return true;
}

/**
 * Assumes the events overlaps and merges them accordingly. Returns only the new start and end time.
 * @param event1 Object with attributes 
 * "start_time" and "end_time". Start and end time must be parseable by Date.parse().
 * @param event2 Object with attributes 
 * "start_time" and "end_time". Start and end time must be parseable by Date.parse().
 * 
 * @returns An object with "start_time" and "end_time" in a Date parseable format.
 */
export function MergeTwoEvents(event1: any, event2: any): any {
    const msStart = Date.parse(event1.start_time);
    const msEnd = Date.parse(event1.end_time);
    const otherMsStart = Date.parse(event2.start_time);
    const otherMsEnd = Date.parse(event2.end_time);

    let newStart = "";
    if (msStart < otherMsEnd) {
        newStart = event1.start_time;
    }
    else newStart = event2.start_time;

    let newEnd = "";
    if (msEnd < otherMsEnd) {
        newEnd = event2.end_time;
    }
    else newEnd = event1.end_time;

    return {
        start_time: newStart,
        end_time: newEnd
    };
}

/**
 * Merges overlapping events to simplify the event list.
 * @param eventList Event list to merge.
 */
export function MergeEvents(eventList: any[]): any[] {
    let mergedEvents: any[] = [];
    if (eventList.length === 0) return [];
    const sortedEvents = eventList.toSorted((a, b) => Date.parse(a.start_time) - Date.parse(b.start_time));
    console.log("Sort events", sortedEvents);
    mergedEvents.push(sortedEvents[0]);

    for(let i = 1; i < sortedEvents.length; i++) {
        if (CheckIfEventOverlaps(mergedEvents[mergedEvents.length - 1], sortedEvents[i])) {
            mergedEvents[mergedEvents.length - 1] = MergeTwoEvents(mergedEvents[mergedEvents.length - 1], sortedEvents[i]);
        }
        else mergedEvents.push(sortedEvents[i]);
    }

    return mergedEvents;
}

/**
 * Checks if the provided event overlaps with any events in the events list.
 * @param {any} eventToCheck Object with attributes 
 * "start_time" and "end_time". Start and end time must be parseable by Date.parse().
 * @param {any[]} eventList List of objects with attributes 
 * "start_time" and "end_time". Start and end time must be parseable by Date.parse().
 * 
 * @return {list} Objects in the event list that overlap with eventToCheck.
 */
export function GetOverlappingEvents(eventToCheck: any, eventList: any[]): any[] {
    let overlaps = [];
    for(let i = 0; i < eventList.length; i++) {
        if (CheckIfEventOverlaps(eventToCheck, eventList[i])) {
            console.log("Found conflicting event:", eventList[i]);
            overlaps.push(eventList[i]);
        }
    }
    return overlaps;
}

export function GetSoonestPossibleMeeting(meetingDuration: number, eventList: any[]): any {
    for(let i = 0; i < eventList.length; i++) {
        
    }
}