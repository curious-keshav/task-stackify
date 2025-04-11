import React, { useRef } from 'react';
import CatSprite from '../assets/CatSprite';

const PreviewArea = ({ position, onPositionChange }) => {

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
