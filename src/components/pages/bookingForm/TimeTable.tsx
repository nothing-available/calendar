// import prisma from "@/lib/db";
import { nylas } from "@/lib/nylas";
import { Day, PrismaClient } from "@prisma/client";
import { format } from "date-fns";

interface iAppProps {
  selectedDates: Date;
  userName: string;
}

const prisma = new PrismaClient()

async function getData(userName: string, selectedDate: Date) {
  const currentDay = format(selectedDate, "EEE") as Day

  // available from
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  // till
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay ,
      User: {
        userName: userName,
      },
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
      User: {
        select: {
          grantID: true,
          grnatEmail: true,
        },
      },
    },
  });

  // check out the free days or time
  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.User?.grantID as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data?.User?.grnatEmail as string],
    },
  });

  return {
    data,
    nylasCalendarData,
  };
}

export async function TimeTable({ selectedDates, userName }: iAppProps) {
  const { data, nylasCalendarData } = await getData(userName, selectedDates);
  console.log(nylasCalendarData);

  return (
    <div>
      <p className='text-base font-semibold'>
        {format(selectedDates, "EEE")}{" "}
        <span className='text-sm text-muted-foreground'>
          {format(selectedDates, "MMM. d")}
        </span>
      </p>
    </div>
  );
}
