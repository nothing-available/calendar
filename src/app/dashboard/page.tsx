import { EmptyState } from "@/components/pages/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import prisma from "@/lib/db";
import requireUser from "@/lib/hooks";
import {
  ExternalLink,
  Link2,
  Pen,
  Settings,
  Trash2,
  User2,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
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
        <>
          <div className='flex items-center justify-between px-2'>
            <div className='hidden sm:grid gap-y-1'>
              <h1 className='text-3xl md:text-4xl font-semibold'>Event Type</h1>
              <p className='text-muted-foreground'>
                Create and manage your event types right here.
              </p>
            </div>
            <Button asChild>
              <Link href={"/dashboard/new"}>Create New Event</Link>
            </Button>
          </div>

          <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {data.eventType.map(item => (
              <div
                className='overflow-hidden shadow rounded-lg border relative'
                key={item.id}>
                <div className='absolute top-2 right-2'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"outline"}
                        size={"icon"}>
                        <Settings className='size-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='center'>
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data.userName}/${item.url}`}>
                            <ExternalLink className='mr-2 size-4' />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link2 className='mr-2 size-4' />
                          Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pen className='mr-2 size-4' />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className='mr-2 size-4' />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link
                  href='/'
                  className='flex items-center p-5'>
                  <div>
                    <User2 className='size-6' />
                  </div>

                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-muted-foreground'>
                        {item.duration} Minutes Meeting
                      </dt>
                      <dd className='text-lg font-medium'>{item.tittle}</dd>
                    </dl>
                  </div>
                </Link>

                <div className='bg-muted px-5 py-3 justify-between items-center flex'>
                  <Switch />
                  <Button>Edit Event</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
