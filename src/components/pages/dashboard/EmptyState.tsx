import { Button } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  tittle: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({
  buttonText,
  description,
  href,
  tittle,
}: iAppProps) {
  return (
    <div className='flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
      <div className='flex items-center justify-center size-20 rounded-full bg-primary/10'>
        <Ban className='size-10 text-primary' />
      </div>

      <h2 className='mt-6 text-xl font-semibold'>{tittle}</h2>
      <p className='mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground max-w-sm mx-auto'>
        {description}
      </p>
      <Button asChild>
        <Link href={href}>
          <PlusCircle className="mr-2 size-4"/>
          {buttonText}
        </Link>
      </Button>
    </div>
  );
}