import React from 'react';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import SayMessage from './animations/looks/say-message';
import SayMessageForSeconds from './animations/looks/say-message-for-seconds';
import ThinkMessage from './animations/looks/thing-message';
import ThinkMessageForSeconds from './animations/looks/think-message-for-seconds';
import RepeatAction from './animations/motion/repeat-action';
import { COMPONENTS } from '../utility/components';



const SidebarArea = () => {

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("text/plain", type);
  };

  return (
    <div className=" text-white min-w-[19rem] px-5 rounded-xl shadow-lg overflow-y-scroll space-y-6">
      <div className='border-b py-4 sticky top-0 bg-[#171717]'>
        <h2 className="text-4xl text-center font-bold tracking-wide text-muted-foreground sticky">Task Stackify</h2>
      </div>

      {/* Motion Section */}
      <section className='space-y-4'>
        <h3 className="text-lg font-semibold text-muted-foreground">Motion</h3>

        <div className="space-y-2 ">

          {/* MOVE X */}
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, COMPONENTS.MOVE_X)}
            className={`cursor-grab flex items-center justify-between gap-2 bg-blue-600 px-4 py-3 rounded-xl font-medium`}
          >
            <span className="text-sm w-20 text-white">Move X</span>
            <input
              disabled
              type="number"
              defaultValue={0}

              className="h-8 w-24 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white">steps</span>
          </div>

          {/* MOVE Y */}
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, COMPONENTS.MOVE_Y)}
            className={` flex items-center justify-between gap-2 bg-blue-600 px-4 py-3 rounded-xl font-medium`}
          >
            <span className="text-sm w-20 text-white">Move Y</span>
            <input
              disabled
              type="number"
              defaultValue={0}
              className="h-8 w-24 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white">steps</span>
          </div>


        </div>

        <div className='space-y-2'>
          <div
            className="bg-purple-600 px-4 py-3 rounded-xl  font-medium flex flex-col gap-2"
            draggable
            onDragStart={(e) => handleDragStart(e, COMPONENTS.TURN_DEGREES)}
          >
            <div className="flex items-center ">
              <div className="text-sm text-white">Rotate <RotateRightIcon /> By</div>
              <input
                type="number"
                defaultValue={0}
                disabled
                className="h-8 w-[6rem] rounded-lg px-3 ml-2 text-sm bg-gray-800 text-white"
              />
              <span className="text-sm text-white ml-1">°</span>
            </div>
            <div className='flex bg-muted/30 shadow-md p-1 rounded-md w-full '>
              <div className='h-3 w-1 rounded-lg bg-muted-foreground  mr-2'></div>
              <span className='text-[0.48rem] font-semibold '>Use negative value to rotate in AntiClockwise Direction</span>
            </div>
          </div>
        </div>

        {/* move coordinates */}
        <div
          className="bg-rose-500 px-4 py-3 rounded-xl font-medium space-y-3"
          draggable
          onDragStart={(e) => handleDragStart(e, COMPONENTS.GO_TO)}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium text-white">Move Object At</span>

            <div className="flex items-center gap-2">
              <span className="text-sm text-white ">X   :</span>
              <input
                type="number"
                value={0}
                disabled
                className="h-8 w-24 rounded-lg px-3 text-sm bg-gray-800 text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-white">Y   :</span>
              <input
                type="number"
                value={0}
                disabled
                className="h-8 w-24 rounded-lg px-3 text-sm bg-gray-800 text-white"
              />
            </div>
          </div>

        </div>

        {/* repeat */}
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, COMPONENTS.REPEAT)}
          className="bg-green-500 px-4 py-3 rounded-xl font-semibold text-center text-white">
          Repeat
        </div>
      </section>

      <hr className="border-gray-600" />

      {/* Looks Section */}
      <section className='space-y-4'>

        <h3 className="text-lg font-semibold text-muted-foreground">Looks</h3>

        <div className="space-y-2 ">
          {/* <SayMessage /> */}

          <div
            className="flex items-center gap-2 bg-amber-500 px-4 py-3 rounded-xl font-medium"
            draggable
            onDragStart={(e) => handleDragStart(e, COMPONENTS.SAY)}
          >
            <span className="text-sm  text-white">Say</span>
            <input
              type="text"
              defaultValue="Hi"
              className="h-8 w-[3.6rem] rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white"> for </span>
            <input
              type="number"
              defaultValue={0}
              className="h-8 w-8 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white">seconds </span>

          </div>
        </div>

        <div className="space-y-2 ">
          <div
            className="flex items-center gap-2 bg-violet-600 px-4 py-3 rounded-xl font-medium"
            draggable
            onDragStart={(e) => handleDragStart(e, COMPONENTS.THINK)}
          >
            <span className="text-sm w-20 text-white">Think</span>
            <input
              type="text"
              defaultValue="Hi"
              className="h-8 w-[3.6rem] rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white"> for </span>
            <input
              type="number"
              defaultValue={0}
              className="h-8 w-8 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white">seconds </span>

          </div>
        </div>

      </section>
    </div>
  );
};

export default SidebarArea;
