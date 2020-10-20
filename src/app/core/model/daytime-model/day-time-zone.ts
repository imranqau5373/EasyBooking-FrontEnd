export interface DayTimeZoneElement{
    label?: string;
    dayTimeZoneSchedules? : dayTimeZoneSchedulesElement;
}

export interface dayTimeZoneSchedulesElement{
    [key : string] : Array<TimePeriodElement>;
}

export interface TimePeriodElement{
    startTime : string;
    endTime : string;
}