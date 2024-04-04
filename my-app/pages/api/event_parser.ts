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
 * Merges overlapping events to simplify the event list. Merged events lose their titles and descriptions.
 * @param eventList Event list to merge.
 * 
 * @returns A simplified event list sorted by start time.
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
    const sortedEventList = eventList.toSorted((a, b) => Date.parse(a.start_time) - Date.parse(b.start_time));
    let overlaps = [];
    for(let i = 0; i < sortedEventList.length; i++) {
        if (CheckIfEventOverlaps(eventToCheck, sortedEventList[i])) {
            console.log("Found conflicting event:", sortedEventList[i]);
            overlaps.push(sortedEventList[i]);
        }
    }
    return overlaps;
}

/**
 * Gets the date in miliseconds, ignoring hours, minutes, and seconds.
 * @param time A date in a Date parsable format.
 */
function GetDateInMiliseconds(time: string): number {
    let times = time.split("T", 2);
    let newDate = times[0] + "T00:00:00";
    let date = new Date(time);
    let dateMS = date.getTime();
    dateMS -= date.getHours() * 3600000;
    dateMS -= date.getMinutes() * 60000;
    dateMS -= date.getSeconds() * 1000;
    return dateMS;
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
 * @param meetingDuration How long the meeting should be in hours.
 * @param eventList The list of events that may interfere with the meeting.
 * @param startHour The earliest the meeting can start.
 * @param endHour The latest the meeting can end.
 * @param weekDays The possible days the meeting can take place. 'mon', 'tue', etc... Must be lowercase and must be truncated to 3 letters.
 */
export function GetSoonestPossibleMeeting(meetingDuration: number, eventList: any[], startHour: number, endHour: number,
    weekDays: string[]): any {
    let durationMilisec = meetingDuration * 3600000;
    let currentTime = new Date("2024-04-01T01:00:00");

    const mergedEvents = MergeEvents(eventList);
    
    let dayIncrement = 0;
    let possibleMeetingDay = new Date(currentTime.getTime());
    console.log(mergedEvents);
    while(dayIncrement < 10) {
        //console.log(possibleMeetingDay);
        possibleMeetingDay = new Date(GetDateInMiliseconds(currentTime.toISOString()) + dayIncrement * 86400000);
        console.log(possibleMeetingDay);
        if (weekDays.includes(GetWeekdayName(possibleMeetingDay.toISOString()))) {
            console.log("Possible day.");
            let result = GetSoonestPossibleMeetingAtDay(durationMilisec, mergedEvents, startHour, endHour, currentTime.toISOString(), possibleMeetingDay.toISOString());
            if (result != undefined) {
                return result;
            }
        }

        dayIncrement++;
    }
}

/**
 * Gets the soonest possible meeting time within the given start and end hours for the given day.
 * @param meetingDurationMS How long the meeting is in miliseconds.
 * @param eventlist The list of events to avoid.
 * @param startHour The soonest hour the meeting can take place.
 * @param endHour The latest hour the meeting can end.
 * @param currentTime The current time in a Date parseable string.
 * @param dayToCheck The beginning of the day to check in a Date parseable string.
 * @returns undefined if no viable timeslot exists, otherwise it returns an object with "start_time" and "end_time" attributes.
 */
function GetSoonestPossibleMeetingAtDay(meetingDurationMS: number, eventlist: any[], startHour: number, endHour: number, currentTime: string, dayToCheck: string): any {
    let dayStartMS = GetDateInMiliseconds(dayToCheck);
    let startDT = new Date(currentTime);
    console.log("Start Time");
    console.log(new Date(dayStartMS));
    if (startDT.getTime() < dayStartMS + startHour * 3600000) startDT.setTime(dayStartMS + startHour * 3600000);

    let endDT = new Date(startDT);
    endDT.setTime(startDT.getTime() + meetingDurationMS);

    console.log(startDT, endDT);
    if (endDT.getTime() > dayStartMS + endHour * 3600000) return undefined;

    while(endDT.getTime() < dayStartMS + endHour * 3600000) {
        let eventAttempt = {start_time: startDT.toISOString(), end_time: endDT.toISOString()};
        let overlaps = GetOverlappingEvents(eventAttempt, eventlist);
        console.log("Attempt vs overlaps", eventAttempt, overlaps);

        if (overlaps.length === 0) {
            return eventAttempt;
        }
        else {
            startDT.setTime(new Date(overlaps[overlaps.length - 1]).getTime());
            endDT.setTime(startDT.getTime() + meetingDurationMS);
            console.log("New Start and End Time: ", startDT, endDT);
        }
    }

    return undefined;
}

/**
 * Filters events that don't start on the given day.
 * @param eventList List of events to filter through.
 * @param dayToCheck A date to check.
 * @returns List of events that start on the given date.
 */
export function FilterEventsOnDay(eventList: any[], dayToCheck: string): any[] {
    let dayStart = new Date(GetDateInMiliseconds(dayToCheck));
    let dayEnd = new Date(dayStart.getTime() + 86400000);
    let event = {
        start_time: dayStart.toISOString(),
        end_time: dayEnd.toISOString()
    };

    return GetOverlappingEvents(event, eventList);
}

/**
 * Gets a list of all the distinct dates events take place on.
 * @param eventList List of events to check.
 * @returns 
 */
export function GetDistinctDates(eventList: any[]): string[] {
    if (eventList.length === 0) return [];
    let mergedEvents = MergeEvents(eventList);
    const dates: string[] = [];
    
    for (let i = 0; i < mergedEvents.length; i++) {
        let dayStart = new Date(GetDateInMiliseconds(mergedEvents[i].start_time));
        let dayEnd = new Date(dayStart.getTime() + 86400000);
        let event = {
            start_time: dayStart.toISOString(),
            end_time: dayEnd.toISOString()
        };

        if (CheckIfEventOverlaps(event, mergedEvents)) {
            if (!dates.includes(event.start_time)) {
                dates.push(event.start_time);
            }
        }
    }

    return dates;
}

/**
 * Creates a new list where all available space is filled with events. The existing events 
 * get a new attribute names "blocked" where it's value is set to true. 
 * The events that are added have that value marked false.
 * @param eventList 
 * @returns 
 */
export function ConvertToEventListWithBlockedAttributes(eventList: any[]) {
    const mergedEvents = MergeEvents(eventList);
    const newEventList: any[] = [];

    if (eventList.length === 0) {
        return undefined;
    }

    let unblockedEvent = {
        start_time: "",
        end_time: "",
        blocked: false
    };
    let blockedEvent = {
        start_time: mergedEvents[0].start_time,
        end_time: mergedEvents[0].end_time,
        blocked: true
    };

    unblockedEvent.start_time = new Date(GetDateInMiliseconds(blockedEvent.start_time)).toISOString();
    unblockedEvent.end_time = new Date(blockedEvent.start_time).toISOString();
    newEventList.push(unblockedEvent);
    newEventList.push(blockedEvent);

    for(let i = 1; i < mergedEvents.length; i++) {
        blockedEvent = {
            start_time: mergedEvents[i].start_time,
            end_time: mergedEvents[i].end_time,
            blocked: true
        };

        unblockedEvent.start_time = new Date(mergedEvents[i-1].end_time).toISOString();
        unblockedEvent.end_time = new Date(mergedEvents[i].start_time).toISOString();
        newEventList.push(unblockedEvent);
        newEventList.push(blockedEvent);

    }
    
    unblockedEvent = {
        start_time: "",
        end_time: "",
        blocked: false
    };

    unblockedEvent.start_time = new Date(mergedEvents[mergedEvents.length - 1].end_time).toISOString();
    unblockedEvent.end_time = new Date(GetDateInMiliseconds(mergedEvents[0].start_time) + 86399999).toISOString();
    newEventList.push(unblockedEvent);

    return newEventList;
}