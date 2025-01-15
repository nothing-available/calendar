"use client";

import {
  getLocalTimeZone,
  today,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import { Calendar } from "./Calendar";
import { DateValue } from "@react-aria/calendar";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface iAppProps {
  daysofWeek: { day: string; isActive: boolean }[];
}

export function RenderCalendar({ daysofWeek }: iAppProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [date, setdate] = useState<CalendarDate>(() => {
    const dateParams = searchParams.get("date");

    return dateParams ? parseDate(dateParams) : today(getLocalTimeZone());
  });

  useEffect(() => {
    const dateParams = searchParams.get("date");

    if (dateParams) {
      setdate(parseDate(dateParams));
    }
  }, [searchParams]);

  const handleDateChange = (date: DateValue) => {
    setdate(date as CalendarDate);

    const url = new URL(window.location.href);

    url.searchParams.set("date", date.toString());

    router.push(url.toString());
  };

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    return !daysofWeek[adjustedIndex].isActive;
  };

  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
      value={date}
      onChange={handleDateChange}
    />
  );
}
