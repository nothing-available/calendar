import { RenderCalendar } from "@/components/pages/bookingForm/RenderCalendar";
import { TimeTable } from "@/components/pages/bookingForm/TimeTable";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
      },
      active: true,
    },
    select: {
      tittle: true,
      id: true,
      description: true,
      videoCallSoftware: true,
      duration: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function BookingPageRoute({
  params,
  searchParams,
}: {
  params: { userName: string; eventUrl: string };
  searchParams: { date?: string };
}) {
  const data = await getData(params.eventUrl, params.userName);

  const selectDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectDate);

  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <Card className='max-w-[1000px] w-full mx-auto'>
        <CardContent className='p-5 grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4'>
          <div>
            <Image
              src={data.User?.image as string}
              alt='profiel image of user'
              className='size-10 rounded-full'
              width={40}
              height={40}
            />

            <p className='text-sm font-medium text-muted-foreground mt-1'>
              {data.User?.name}
            </p>

            <h1 className='text-xl font-semibold mt-2'>{data.tittle}</h1>

            <p className='text-sm font-medium text-muted-foreground'>
              {data.description}
            </p>

            <div className='mt-5 grid gap-y-3'>
              <p className='flex items-center'>
                <CalendarX2 className='size-4 mr-2 text-primary' />
                <span className='text-sm font-medium text-muted-foreground'>
                  {formattedDate}
                </span>
              </p>

              <p className='flex items-center'>
                <Clock className='size-4 mr-2 text-primary' />
                <span className='text-sm font-medium text-muted-foreground'>
                  {data.duration} Minutes
                </span>
              </p>

              <p className='flex items-center'>
                <VideoIcon className='size-4 mr-2 text-primary' />
                <span className='text-sm font-medium text-muted-foreground'>
                  {data.videoCallSoftware}
                </span>
              </p>
            </div>
          </div>

          <Separator
            orientation='vertical'
            className='hidden md:block h-full w-[1px]'
          />

          <div className='my-4 md:my-0'>
            <RenderCalendar daysofWeek={data.User?.availability} />
          </div>

          <Separator
            orientation='vertical'
            className='hidden md:block h-full w-[1px]'
          />

          <TimeTable
            selectedDates={selectDate}
            userName={params.userName}
          />
        </CardContent>
      </Card>
    </div>
  );
}
