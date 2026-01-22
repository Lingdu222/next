// import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form className="flex flex-col gap-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">create App</h1>
        <Input type="text" placeholder='name' />
        <Textarea placeholder='discription' />
        <Button type='submit' variant='outline'>submit</Button>
      </form>

    </div>
  );
}
