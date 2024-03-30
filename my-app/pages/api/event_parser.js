import { list } from "postcss";

/**
 * Checks if the provided events overlap.
 * @param {object} event1 Object with attributes 
 * "start_time" and "end_time". Start and end time must be formatted as "yyyy-mm-ddThh:mm:ssZ".
 * @param {object} event2 Object with attributes 
 * "start_time" and "end_time". Start and end time must be formatted as "yyyy-mm-ddThh:mm:ssZ".
 * 
 * @returns {boolean} Returns true if the events overlap.
 */
function CheckIfEventOverlaps(event1, event2) {
    const msStart = new Date(event1).getMilliseconds();
    const msEnd = new Date(event1).getMilliseconds();
    const otherMsStart = new Date(event2).getMilliseconds();
    const otherMsEnd = new Date(event2).getMilliseconds();

    if (msStart >= otherMsEnd) return false;
    else if (msEnd <= otherMsStart) return false;
    else if (otherMsEnd <= msStart) return false;
    else if (otherMsStart >= msEnd) return false;
    else return true;
}

/**
 * Checks if the provided event overlaps with any events in the events list.
 * @param {object} eventToCheck Object with attributes 
 * "start_time" and "end_time". Start and end time must be formatted as "yyyy-mm-ddThh:mm:ssZ".
 * @param {list} eventList List of objects with attributes 
 * "start_time" and "end_time". Start and end time must be formatted as "yyyy-mm-ddThh:mm:ssZ".
 * 
 * @return {list} Objects in the event list that overlap with eventToCheck.
 */
function CheckIfEventsOverlap(eventToCheck, eventList) {
    let overlaps = [];
    for(let i = 0; i < eventList.length; i++) {
        if (CheckIfEventOverlaps(eventToCheck, eventList[i])) {
            overlaps.push(eventList[i]);
        }
    }
    return overlaps;
}

