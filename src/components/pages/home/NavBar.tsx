import Link from "next/link";
import { Logo } from "./Logo";
import { ScheduleDemo } from "./TryForFree";

export function NavBar() {
  return (
    <div className=' flex py-5 items-center justify-between'>
      <Link
        href={"/"}
        className='flex items-center'>
        <Logo />
      </Link>
      <ScheduleDemo/>
    </div>
  );
}
