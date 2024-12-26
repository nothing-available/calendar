import {
  GitHubAuthButton,
  GoogleAuthButton,
} from "@/components/common/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "@/lib/auth";

export function ScheduleDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try For Free</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Try TimeSpark for Free</DialogTitle>
          <DialogDescription>
            Choose your preferred sign-in method to get started.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}>
            <GoogleAuthButton />
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}>
            <GitHubAuthButton />
          </form>

          <div className='relative'>
            <div className=' absolute inset-0 flex items-center'>
              <span className=' w-full border-t' />
            </div>
            <div className=' relative flex justify-center text-xs uppercase'>
              <span className=' bg-background px-2 text-muted-foreground'>
                or continue with
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
