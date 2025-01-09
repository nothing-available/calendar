"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar } from "./Calendar";
import { DateValue } from "@react-aria/calendar";

interface iAppProps {
  daysofWeek: { day: string; isActive: boolean }[];
}

export function RenderCalendar({ daysofWeek }: iAppProps) {
  
  


  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    return !daysofWeek[adjustedIndex].isActive;
  };

  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
    />
  );
}
