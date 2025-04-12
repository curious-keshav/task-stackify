import React, { useRef } from 'react';
import CatSprite from '../assets/CatSprite';

const PreviewArea = ({ position, onPositionChange, message, isThinking }) => {

  const previewRef = useRef(null);

  const handleDragStart = (e) => {
    const rect = previewRef.current.getBoundingClientRect();

    const offsetX = e.clientX - rect.left - position.x;
    const offsetY = e.clientY - rect.top - position.y;

    console.log(position.y, "kesh")


    e.dataTransfer.setData("text/plain", JSON.stringify({ offsetX, offsetY }));
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = previewRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;


    const { offsetX, offsetY } = JSON.parse(e.dataTransfer.getData("text/plain"));

    let newX = mouseX - offsetX;
    let newY = mouseY - offsetY;

    const maxX = previewRef.current.offsetWidth - 95;
    const maxY = previewRef.current.offsetHeight - 100;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    onPositionChange?.({ x: newX, y: newY });
  };

  console.log(position.angle, "kesh")

  return (
    <>
      {/* Grid Background */}
      <div className=" grid-background fixed inset-0 -z-10" />


      <div className="relative w-full flex flex-col h-full overflow-y-auto text-muted-foreground">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4  shadow-sm border-b">
          <h3 className="text-2xl font-bold tracking-wide">Preview Playground</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition" onClick={() => { }}>
            + Create Character
          </button>
        </div>

        {/* Content Area */}
        <div className="relative h-full p-2 w-full overflow-hidden" ref={previewRef} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          <div
            draggable
            onDragStart={handleDragStart}
            style={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              rotate: `${position.angle}rad`,
              cursor: "grab",
              width: "95px",
              height: "100px",
              backgroundColor: "transparent",
              transition: "left 0.3s ease, top 0.3s ease",
            }}
          >
            <CatSprite />

            {isThinking && message && <div className="">
              <div className="absolute top-1 right-2 h-3 w-3 rounded-full bg-muted-foreground"></div>
              <div className="absolute -top-3 -right-0 h-3 w-3 rounded-full bg-muted-foreground"></div>
              <div className="absolute top-[-3.5rem] -right-12 -rotate-6 z-0 h-10 w-fit px-4 rounded-full bg-muted-foreground flex items-center justify-center">
                <span className="z-10 text-xs text-black">{message}</span>
              </div>
            </div>}

            {!isThinking && message && <div className="">
              <div className="absolute top-[-3rem] -right-12 z-0 flex-wrap w-24 px-4 rounded-xl bg-muted-foreground flex items-center justify-center">
                <span className=" relative z-10 text-xs text-black">{message}</span>
              </div>
            </div>}

            

            <div className='text-muted-foreground/50 absolute -bottom-6 right-10'>Cat1</div>
          </div>
        </div>

        <div className='absolute bottom-5 right-5'>
          <div className="bg-muted-foreground/30 p-4 rounded-xl text-white shadow-md flex flex-col justify-between w-fit border-2 border-muted-foreground">
            <h3 className="text-lg font-semibold tracking-wide">Character Position</h3>
            <div className="text-sm text-gray-300 space-y-1 mt-2">
              <div>
                <span className="font-medium text-blue-400">Cat1:</span>
                <span className="ml-2">
                  X: <span className="text-white font-semibold">{position.x}</span>,
                  Y: <span className="text-white font-semibold">{position.y}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default PreviewArea;
