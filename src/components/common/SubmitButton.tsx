"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import Image from "next/image";
import GoogleLogo from "@/public/google.svg";
import GitHubLogo from "@/public/github.svg";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;

  classname?: string;
}

export function SubmitButton({ text, variant, classname }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant={"outline"}
          className={cn("w-fit", classname)}>
          <Loader2 className='size-4 mr-2 animate-spin' />
          Please wait
        </Button>
      ) : (
        <Button
          variant={variant}
          type='submit'
          className={cn("w-fit", classname)}>
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant={"outline"}
          className=' w-full'>
          <Loader2 className='size-4 mr-2 animate-spin' />
          Please wait
        </Button>
      ) : (
        <Button
          variant={"outline"}
          className=' w-full'>
          <Image
            src={GoogleLogo}
            alt='Google Logo'
            className=' size-4 mr-2'
          />
          Sign In with Google
        </Button>
      )}
    </>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant={"outline"}
          className=' w-full'>
          <Loader2 className='size-4 mr-2 animate-spin' />
          Please wait
        </Button>
      ) : (
        <Button
          variant={"outline"}
          className=' w-full'>
          <Image
            src={GitHubLogo}
            alt='Github Logo'
            className=' size-4 mr-2'
          />
          Sign In with Google
        </Button>
      )}
    </>
  );
}
