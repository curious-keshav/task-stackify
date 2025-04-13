import React, { useEffect, useRef, useState } from 'react';
import MOVE_X from './animations/motion/move-x';
import MOVE_Y from './animations/motion/move-y';
import MoveAtCoordinates from './animations/motion/move-at-coordinates';
import RotateClockwise from './animations/motion/rotate-clockwise';
import RepeatAction from './animations/motion/repeat-action';
import SayMessageForSeconds from './animations/looks/say-message-for-seconds';
import ThinkMessageForSeconds from './animations/looks/think-message-for-seconds';
import { v4 as uuidv4 } from "uuid";
import { useSpriteContext } from '../context/SpriteContext';


const MainbarArea = () => {
  
  const { runStack, sprites, selectedSpriteId, setShowModal, runAllStacks, updateSpriteStack } = useSpriteContext();

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
    updateSpriteStack(spriteId, updatedStack);
  };

  const handleDropReorder = (targetSpriteId, targetIndex) => {
    if (!dragInfo) return;

    const { fromSpriteId, blockIndex } = dragInfo;
    if (fromSpriteId === undefined || blockIndex === undefined) return;

    const sourceStack = [...sprites.find((s) => s.id === fromSpriteId).stack];
    const [draggedBlock] = sourceStack.splice(blockIndex, 1);

    if (fromSpriteId === targetSpriteId) {
      sourceStack.splice(targetIndex, 0, draggedBlock);
      updateSpriteStack(fromSpriteId, sourceStack);
    } else {
      const targetStack = [...sprites.find((s) => s.id === targetSpriteId).stack];
      targetStack.splice(targetIndex, 0, draggedBlock);
      updateSpriteStack(fromSpriteId, sourceStack);
      updateSpriteStack(targetSpriteId, targetStack);
    }

    setDragInfo(null);
  };

  const handleInputChange = (spriteId, index, updatedProps) => {
    const currentStack = sprites.find((s) => s.id === spriteId).stack;
    updateSpriteStack(
      spriteId,
      currentStack.map((b, i) => (i === index ? { ...b, props: { ...b.props, ...updatedProps } } : b))
    );
  };



  const handleDragOver = (e) => {
    e.preventDefault();
  };

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

        {sprites?.length === 0 && (
          <div className="p-6 flex justify-center items-center min-h-[60vh]">
            <div className="bg-muted-foreground/40 p-8 rounded-3xl text-white gap-8 shadow-2xl flex flex-col sm:flex-row justify-center items-center w-full max-w-4xl border-2 border-dashed border-muted-foreground transition-all duration-300">

              <div className="bg-muted rounded-2xl p-4 shadow-inner flex items-center justify-center w-[50%]">
                <img
                  src="animation.png"
                  alt="Create character"
                  className="h-52 w-52 object-contain"
                />
              </div>

              <div className="text-center sm:text-left space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">
                  No characters created yet
                </h3>
                <p className="text-muted-foreground text-sm">
                  Get started by creating your first character to play with animations.
                </p>
                <button
                  className="bg-blue-600 w-full text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
                  onClick={() => setShowModal(true)}
                >
                  + Create Character
                </button>
              </div>

            </div>
          </div>
        )}

        <div className='p-8 grid grid-cols-1 gap-2'>
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
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition" onClick={() => runStack(sprite.stack, sprite.id)}>
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
