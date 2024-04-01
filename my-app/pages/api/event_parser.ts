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
            console.log("Found conflicting event.");
            overlaps.push(eventList[i]);
        }
    }
    return overlaps;
}