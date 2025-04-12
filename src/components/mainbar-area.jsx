import React, { useEffect, useRef, useState } from 'react';
import MOVE_X from './animations/motion/move-x';
import MOVE_Y from './animations/motion/move-y';
import MoveAtCoordinates from './animations/motion/move-at-coordinates';
import RotateClockwise from './animations/motion/rotate-clockwise';
import RepeatAction from './animations/motion/repeat-action';
import SayMessageForSeconds from './animations/looks/say-message-for-seconds';
import ThinkMessageForSeconds from './animations/looks/think-message-for-seconds';
import { v4 as uuidv4 } from "uuid";


const MainbarArea = ({ sprites, onUpdateStack, onRunStack, runAllStacks, selectedSpriteId }) => {

  const spriteRefs = useRef({});
  const [dragInfo, setDragInfo] = useState(null);

  useEffect(() => {
    const ref = spriteRefs.current[selectedSpriteId];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedSpriteId]);

  const handleDropNewBlock = (e, spriteId) => {
    e.preventDefault();
    const blockType = e.dataTransfer.getData("text/plain");
    if (!blockType) return;

    const newBlock = { id: uuidv4(), type: blockType, props: {} };
    const updatedStack = [...sprites.find((s) => s.id === spriteId).stack, newBlock];
    onUpdateStack(spriteId, updatedStack);
  };

  const handleDropReorder = (targetSpriteId, targetIndex) => {
    if (!dragInfo) return;

    const { fromSpriteId, blockIndex } = dragInfo;
    if (fromSpriteId === undefined || blockIndex === undefined) return;

    const sourceStack = [...sprites.find((s) => s.id === fromSpriteId).stack];
    const [draggedBlock] = sourceStack.splice(blockIndex, 1);

    if (fromSpriteId === targetSpriteId) {
      sourceStack.splice(targetIndex, 0, draggedBlock);
      onUpdateStack(fromSpriteId, sourceStack);
    } else {
      const targetStack = [...sprites.find((s) => s.id === targetSpriteId).stack];
      targetStack.splice(targetIndex, 0, draggedBlock);
      onUpdateStack(fromSpriteId, sourceStack);
      onUpdateStack(targetSpriteId, targetStack);
    }

    setDragInfo(null);
  };

  const handleInputChange = (spriteId, index, updatedProps) => {
    const currentStack = sprites.find((s) => s.id === spriteId).stack;
    onUpdateStack(
      spriteId,
      currentStack.map((b, i) => (i === index ? { ...b, props: { ...b.props, ...updatedProps } } : b))
    );
  };


  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // const handleDrop = (e, stackId) => {
  //   e.preventDefault();
  //   const data = e.dataTransfer.getData("text/plain");

  //   setStacks((prevStacks) =>
  //     prevStacks.map((stack) =>
  //       stack.id === stackId
  //         ? {
  //           ...stack,
  //           blocks: [
  //             ...stack.blocks,
  //             {
  //               type: data,
  //               props: {},
  //             },
  //           ],
  //         }
  //         : stack
  //     )
  //   );
  // };

  return (
    <>
      <div className="flex flex-col bg-[#171717] h-full overflow-y-auto text-muted-foreground w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4  shadow-sm border-b">
          <h3 className="text-2xl font-bold tracking-wide">Lets Create Stack</h3>
          <div className='flex gap-2'>
            <button
              onClick={runAllStacks}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition" >
              Run All
            </button>
          </div>
        </div>


        <div className='p-8 grid grid-cols-2 gap-2'>
          {sprites?.map((sprite) => {
            if (!spriteRefs.current[sprite.id]) {
              spriteRefs.current[sprite.id] = React.createRef();
            }
            return (
              <div
                key={sprite.id}
                ref={spriteRefs.current[sprite.id]}
                className='flex bg-muted-foreground/20  flex-col border border-muted-foreground rounded-md '
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropNewBlock(e, sprite.id)}
              >
                <div className='flex justify-between items-center p-4'>
                  <h2 className='font-semibold text-lg'>{sprite?.name}</h2>
                  <div className='flex gap-2'>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition" onClick={() => onRunStack(sprite.stack, sprite.id)}>
                      Run
                    </button>
                  </div>
                </div>
                <div className='p-4  rounded-xl '>
                  <div className='border-b-4 border-x-4 px-1 rounded-t-md border-muted-foreground flex flex-col gap-1 pb-1'>
                    {sprite?.stack?.length === 0 ? (
                      <div className="text-gray-400 italic p-4 text-md">Drop blocks here...</div>
                    ) : (
                      <ul className="space-y-1">
                        {sprite?.stack.map((block, i) => {
                          return (
                            <li
                              className="rounded"
                              key={block.id}
                              draggable
                              onDragStart={() => setDragInfo({ fromSpriteId: sprite.id, blockIndex: i })}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={() => handleDropReorder(sprite.id, i)}
                            >
                              {block.type === "MOVE_X" && <MOVE_X onChange={(props) => handleInputChange(sprite.id, i, props)} />}
                              {block.type === "MOVE_Y" && <MOVE_Y onChange={(props) => handleInputChange(sprite.id, i, props)} />}
                              {block.type === "GO_TO" && <MoveAtCoordinates onChange={(props) => handleInputChange(sprite.id, i, props)} />}
                              {block.type === "TURN_DEGREES" && <RotateClockwise onChange={(props) => handleInputChange(sprite.id, i, props)} />}
                              {block.type === "REPEAT" && <RepeatAction onChange={(props) => handleInputChange(sprite.id, i, props)} />}
                              {block.type === "SAY" && <SayMessageForSeconds onChange={(props) => handleInputChange(sprite.id, i, props)} />}
                              {block.type === "THINK" && <ThinkMessageForSeconds onChange={(props) => handleInputChange(sprite.id, i, props)} />}
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
