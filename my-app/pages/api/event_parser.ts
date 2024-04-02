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

    // Sets the new start time to the earliest of the given events.
    let newStart = "";
    if (msStart < otherMsStart) {
        newStart = event1.start_time;
    }
    else newStart = event2.start_time;

    // Sets the new stop time the the latest of the given events.
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
    // Sorts the events to make the merging process easier.
    const sortedEvents = eventList.toSorted((a, b) => Date.parse(a.start_time) - Date.parse(b.start_time));
    console.log("Sorted events", sortedEvents);

    mergedEvents.push(sortedEvents[0]);

    for(let i = 1; i < sortedEvents.length; i++) {
        // If the current event overlaps with the last event in the merged events list 
        // it combines them.
        if (CheckIfEventOverlaps(mergedEvents[mergedEvents.length - 1], sortedEvents[i])) {
            mergedEvents[mergedEvents.length - 1] = MergeTwoEvents(mergedEvents[mergedEvents.length - 1], sortedEvents[i]);
        }
        else mergedEvents.push(sortedEvents[i]);
    }
    console.log("Merged events", mergedEvents);
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

/**
 * Gets the date in miliseconds, ignoring hours, minutes, and seconds.
 * @param time A date in a Date parsable format.
 */
function GetDateInMiliseconds(time: string): number {
    let left, right = time.split("T", 2);
    let newDate = left + "T:00:00:00";
    return Date.parse(newDate);
}

/**
 * Gets the weekday name given a date. ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].
 * @param time The date in a Date parseable string.
 * @returns The shortened day in lowercase.
 */
function GetWeekdayName(time: string): string {
    return new Date(time).toDateString().split(" ")[0].toLowerCase();
}

/**
 * Gets the soonest possible meeting time given a target meeting duration. The meeting time will fall between 
 * the given start hour and end hour.
 * This function starts at the beggining of the week for demonstration purposes.
 * @param meetingDuration How long the meeting should be.
 * @param eventList The list of events that may interfere with the meeting.
 * @param startHour The earliest the meeting can start.
 * @param endHour The latest the meeting can end.
 * @param weekDays The possible days the meeting can take place. 'mon', 'tue', etc... Must be lowercase and must be truncated to 3 letters.
 */
export function GetSoonestPossibleMeeting(meetingDuration: number, eventList: any[], startHour: number, endHour: number,
    weekDays: string[]): any {
    let durationMilisec = meetingDuration * 3600000;
    let currentTime = Date.parse("2024-04-01T01:00:00Z");
    
    for(let i = 0; i < eventList.length; i++) {
        let startMilisec = GetDateInMiliseconds(eventList[i].start_time);
        startMilisec += startHour * 3600000;
        let endMilisec = startMilisec + (endHour - startHour) * 3600000;
        
        
    }
}