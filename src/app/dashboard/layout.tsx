import { ThemeModeToggle } from "@/components/common/ThemeModeToogle";
import { DashBoardLinks } from "@/components/pages/dashboard/DashBoardLinks";
import { Logo } from "@/components/pages/home/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import requireUser from "@/lib/hooks";
import { MenuSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      grantID:true
    },
  });

  if (!data?.userName) {
    return redirect("/onboarding");
  }

  if(!data?.grantID){
    return redirect("/onboarding/grant-id")
  }
}

export default async function DashBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  return (
    <>
      <div className='min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <div className='hidden md:block border-r bg-muted/40'>
          <div className='flex h-full max-h-screen flex-col gap-2'>
            <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
              <Link href='/'>
                <Logo />
              </Link>
            </div>

            <div className='flex-1'>
              <nav className='grid items-start px-2 lg:px-4'>
                <DashBoardLinks />
              </nav>
            </div>
          </div>
        </div>

        <div className='flex flex-col'>
          <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px]'>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className='md:hidden shrink-0'
                  size='icon'
                  variant={"outline"}>
                  <MenuSquare className='size-5' />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={"left"}
                className='flex flex-col'>
                <nav className='grid gap-2 mt-10'>
                  <DashBoardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className='ml-auto flex items-center gap-x-4'>
              <ThemeModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='rounded-full'
                    variant={"secondary"}
                    size={"icon"}>
                    <Image
                      className='w-full h-full rounded-full'
                      src={session?.user?.image as string}
                      alt='Profile Image'
                      width={25}
                      height={25}
                    />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel> My Account </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href={"/dashboard/setting"}>Setting</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <form
                      className='w-full'
                      action={async () => {
                        "use server";
                        await signOut();
                      }}>
                      <button className='w-full  text-left'>Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton/>
    </>
  );
}
