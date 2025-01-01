import { EmptyState } from "@/components/pages/dashboard/EmptyState";
import prisma from "@/lib/db";
import requireUser from "@/lib/hooks";
import { notFound } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          tittle: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function Dashboard() {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          tittle='ma chuda'
          description='you have created the first event type by clicking button below'
          buttonText='behen ki chut'
          href="'/maa/kaa/bhosra"
        />
      ) : (
        <p>hey we have event types</p>
      )}
    </>
  );
}
