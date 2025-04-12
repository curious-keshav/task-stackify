/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import MOVE_X from './animations/motion/move-x';
import MOVE_Y from './animations/motion/move-y';
import MoveAtCoordinates from './animations/motion/move-at-coordinates';
import RotateClockwise from './animations/motion/rotate-clockwise';
import RepeatAction from './animations/motion/repeat-action';
import SayMessageForSeconds from './animations/looks/say-message-for-seconds';
import ThinkMessageForSeconds from './animations/looks/think-message-for-seconds';

const MainbarArea = ({ onRunStack }) => {
  const [stacks, setStacks] = useState([
    {
      id: Date.now(),
      blocks: [],
    }
  ]);

  const handleAddNewAnimationStack = () => {
    setStacks((prev) => [
      ...prev,
      {
        id: Date.now(),
        blocks: [],
      },
    ]);
  };

  const handleRun = (stack) => {
    onRunStack(stack.blocks);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, stackId) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");

    setStacks((prevStacks) =>
      prevStacks.map((stack) =>
        stack.id === stackId
          ? {
            ...stack,
            blocks: [
              ...stack.blocks,
              {
                type: data,
                props: {},
              },
            ],
          }
          : stack
      )
    );
  };

  return (
    <>
      <div className="flex flex-col bg-[#171717] h-full overflow-y-auto text-muted-foreground w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4  shadow-sm border-b">
          <h3 className="text-2xl font-bold tracking-wide">Lets Create Stack</h3>
          <div className='flex gap-2'>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition" >
              Run All
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition" onClick={handleAddNewAnimationStack}>
              + Add Stack
            </button>
          </div>
        </div>


        <div className='p-8 grid grid-cols-2 gap-2'>
          {stacks?.map((stack, ind) => {
            return (
              <div
                key={stack.id}
                className='flex bg-muted-foreground/20  flex-col border border-muted-foreground rounded-md '
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stack.id)}
              >
                <div className='flex justify-between items-center p-4'>
                  <h2 className='font-semibold text-lg'>Stack {ind + 1}</h2>
                  <div className='flex gap-2'>
                    <select className='bg-muted-foreground rounded-md w-24 p-2 text-muted font-bold'>
                      <option value="someOption">Cat1</option>
                      <option value="otherOption">Cat2</option>
                      <option value="otherOption">Dog1</option>
                    </select>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition" onClick={() => handleRun(stack)}>
                      Run
                    </button>
                  </div>
                </div>
                <div className='p-4  rounded-xl '>
                  <div className='border-b-4 border-x-4 px-1 rounded-t-md border-muted-foreground flex flex-col gap-1 pb-1'>
                    {stack?.blocks?.length === 0 ? (
                      <div className="text-gray-400 italic p-4 text-md">Drop blocks here...</div>
                    ) : (
                      <ul className="space-y-1">
                        {stack?.blocks.map((block, i) => {
                          const handleInputChange = (updatedProps) => {
                            setStacks((prevStacks) =>
                              prevStacks.map((s) =>
                                s.id === stack.id
                                  ? {
                                    ...s,
                                    blocks: s.blocks.map((b, index) => (index === i ? { ...b, props: { ...b.props, ...updatedProps } } : b)),
                                  }
                                  : s
                              )
                            );
                          };

                          return (
                            <li key={i} className="rounded">
                              {block.type === "MOVE_X" && <MOVE_X onChange={handleInputChange} />}
                              {block.type === "MOVE_Y" && <MOVE_Y onChange={handleInputChange} />}
                              {block.type === "GO_TO" && <MoveAtCoordinates onChange={handleInputChange} />}
                              {block.type === "TURN_DEGREES" && <RotateClockwise onChange={handleInputChange} />}
                              {block.type === "REPEAT" && <RepeatAction onChange={handleInputChange} />}
                              {block.type === "SAY" && <SayMessageForSeconds onChange={handleInputChange} />}
                              {block.type === "THINK" && <ThinkMessageForSeconds onChange={handleInputChange} />}
                            </li>
                          );
                        })}
                      </ul>
                    )}

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
