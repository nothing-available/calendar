import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import workIsDone from "@/public/work-is-done.gif";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";

export default function GrantIdRoute() {
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle> You are almost done!</CardTitle>
          <CardDescription>
            We have to now connect your calenar to your account.
          </CardDescription>

          <Image
            src={workIsDone}
            alt='workIsDone'
            className='w-full rounded-lg'
            priority
          />
        </CardHeader>

        <CardContent>
          <Button
            asChild
            className='w-full'>
            <Link href='/api/auth'>
              <CalendarCheck2 className='size-4 mr-2' />
              Connect Calender to Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
