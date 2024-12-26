import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <div className='flex items-center gap-2'>
      <div className='relative'>
        <Sparkles className='h-6 w-6 text-gray-600' />
        <div className='absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-gray-500' />
      </div>
      <span className='text-xl font-bold bg-gradient-to-r from-gray-600 to-green-800 bg-clip-text text-transparent'>
        TimeSpark
      </span>
    </div>
  );
}
