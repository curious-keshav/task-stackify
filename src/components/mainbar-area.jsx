import React from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import SayMessage from './animations/looks/say-message';
import MoveX from './animations/motion/move-x';
import ThinkMessageWithDelay from './animations/looks/think-message-with-delay';

const MainbarArea = () => {
  return (
    <>
      {/* Grid Background */}

      <div className="flex flex-col bg-[#171717] h-full overflow-y-auto text-muted-foreground w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4  shadow-sm border-b">
          <h3 className="text-2xl font-bold tracking-wide">Lets Create Stack</h3>
          <div className='flex gap-2'>
            <div className=''>
              <PlayCircleIcon fontSize='large' className='text-green-500' />
              <StopCircleIcon fontSize='large' className='text-red-600' />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              + Add Stack
            </button>
          </div>
        </div>


        <div className='p-8 grid grid-cols-2 gap-2'>
          {Array.from({ length: 2 }).map((_, ind) => {
            return (
              <div key={ind} className='flex bg-muted-foreground/20  flex-col border border-muted-foreground rounded-md '>
                <div className='flex justify-between items-center p-4'>
                  <h2 className='font-semibold'>Stack 1</h2>
                  <select className='bg-muted-foreground rounded-md w-24 p-2 text-muted font-bold'>
                    <option value="someOption">Cat1</option>
                    <option value="otherOption">Cat2</option>
                    <option value="otherOption">Dog1</option>
                  </select>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                    Run
                  </button>
                </div>
                <div className='p-4  rounded-xl '>
                  <div className='border-b-4 border-x-4 px-1 rounded-t-md border-muted-foreground flex flex-col gap-1 pb-1'>
                    <SayMessage />
                    <MoveX />
                    <ThinkMessageWithDelay />
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </>
  );
};

export default MainbarArea;
