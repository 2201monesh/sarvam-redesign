import { LuKeyRound } from "react-icons/lu";
import { MdCurrencyRupee } from "react-icons/md";
import { BsChatLeftText } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";


const MainSectionHome = () => {
  return (
    <div>
        <div className="w-full flex items-center justify-between mb-4">
            <p className="font-season-mix capitalize font-medium text-xl">Get Started</p>
            <div className="flex items-center gap-1.5 cursor-pointer text-neutral-500 hover:text-neutral-800 transition-colors duration-100">
                <RxCross2 size={16} />
                <p className="text-sm">Dismiss</p>
            </div>
           
        </div>
    <div className='w-full h-44 border rounded-xl border-neutral-200 flex justify-between px-6 py-4'>
        <div className='h-full flex flex-col justify-between'>
            <div className='flex items-center'>
                <span className='mr-3 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 '><LuKeyRound /></span>
                <p className='text-neutral-600 leading-snug'>1. Create an API key</p>
            </div>
            <div className='flex items-center'>
                <span className='mr-3 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 '><MdCurrencyRupee /></span>
                <p className='text-neutral-600 leading-snug'>2. Add credits</p>
            </div>
            <div className='flex items-center'>
                <span className='mr-3 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 '><BsChatLeftText /></span>
                <p className='text-neutral-600 leading-snug'>3. Build a prompt</p>
            </div>
        </div>
        <div className="flex gap-2 h-full items-end">
            <div className="w-64 h-16 border border-neutral-200 shadow-xs rounded-lg flex flex-col justify-center gap-1 px-4 cursor-pointer hover:bg-neutral-50">
                <div className="flex items-center gap-2">
                    <p className="text-sm">Developer quickstart</p>
                    <GoArrowUpRight />
                </div>
                <p className="text-xs text-neutral-600 leading-snug">Make your first API request in minutes</p>
            </div>
            <div className="w-64 h-16 border rounded-lg border-neutral-200 shadow-xs flex flex-col justify-center gap-1 px-4 cursor-pointer hover:bg-neutral-50">
                <div className="flex items-center gap-2">
                    <p className="text-sm">Responses Starter app</p>
                    <GoArrowUpRight />
                </div>
                <p className="text-xs text-neutral-600 leading-snug">Make your first API request in minutes</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default MainSectionHome