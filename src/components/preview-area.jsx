import React, { useRef } from 'react';
import CatSprite from '../assets/CatSprite';

const PreviewArea = ({ sprites, onPositionChange, tooltipMessages, onSpriteClick, selectedSpriteId, isThinking=false }) => {

  const previewRef = useRef(null);

  const handleDragStart = (e, sprite) => {
    const rect = previewRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - sprite.position.x;
    const offsetY = e.clientY - rect.top - sprite.position.y;
    e.dataTransfer.setData("text/plain", JSON.stringify({ id: sprite.id, offsetX, offsetY }));
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = previewRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const { id, offsetX, offsetY } = JSON.parse(e.dataTransfer.getData("text/plain"));

    let newX = mouseX - offsetX;
    let newY = mouseY - offsetY;

    const maxX = previewRef.current.offsetWidth - 95;
    const maxY = previewRef.current.offsetHeight - 100;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    onPositionChange?.(id, { x: newX, y: newY });
  };


  return (
    <>
      <div className=" grid-background fixed inset-0 -z-10" />
      <div className="relative w-full flex flex-col h-full overflow-y-auto text-muted-foreground">

        <div
          className="relative h-full p-2 w-full overflow-hidden"
          ref={previewRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}>
          {sprites.map((sprite) => (
            <div
              key={sprite.id}
              onClick={() => onSpriteClick?.(sprite.id)}
              draggable
              onDragStart={(e) => handleDragStart(e, sprite)}
              style={{
                position: "absolute",
                left: `${sprite.position.x}px`,
                top: `${sprite.position.y}px`,
                transform: `rotate(${sprite?.angle}deg)`,
                cursor: "grab",
                width: "95px",
                height: "100px",
                transition: "left 0.3s ease, top 0.3s ease",
                selectedSpriteId,
                filter: sprite.id === selectedSpriteId ? "drop-shadow(0 0 6px rgba(234, 179, 8, 0.8))" : " ",
              }}
              className={`${sprite.id === selectedSpriteId ? "drop-shadow-lg" : ""}`}
            >
              {!isThinking?.[sprite.id] && tooltipMessages?.[sprite.id] && (
                <div className="absolute -top-6 -right-10 ml-2 bg-white border px-2 py-1 rounded shadow text-sm max-w-[150px]">
                  {tooltipMessages[sprite.id]}
                </div>
              )}
              {isThinking?.[sprite.id] && tooltipMessages?.[sprite.id] && (
                <>
                <div className='absolute -top-6  -right-1 w-4 h-4 rounded-full bg-muted-foreground/60'></div>
                <div className='absolute -top-2  right-2 w-4 h-4 rounded-full bg-muted-foreground/60'></div>
                <div className="absolute -top-16 -right-12 ml-2 bg-muted-foreground text-muted border px-2 py-1 rounded shadow text-sm max-w-[150px]">
                  {tooltipMessages[sprite.id]}
                </div>
                </>
              )}
              {sprite?.component}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-muted-foreground/60 text-white border px-2 py-1 rounded shadow whitespace-nowrap">
                {sprite.name}
              </div>
            </div>
          ))}

        </div>

        <div className='absolute bottom-5 right-5'>
          <div className="bg-muted-foreground/30 p-4 rounded-xl text-white shadow-md flex flex-col justify-between w-fit border-2 border-muted-foreground">
            <h3 className="text-lg font-semibold tracking-wide">Character Position</h3>
            {sprites.length>0 ? sprites?.map((sprite) => {
              return (
                <div key={sprite?.id} className="text-sm text-gray-300 space-y-1 mt-2">
                  <div className='flex justify-between'>
                    <h3 className="font-medium text-blue-400 inline-block">{sprite?.name}</h3>
                    <span className="ml-2">
                      X: <span className="text-white font-semibold">{sprite?.position?.x}</span>,
                      Y: <span className="text-white font-semibold">{sprite?.position?.y}</span>
                    </span>
                  </div>
                </div>
              )
            }) : <div className='text-sm text-muted-foreground mt-2 text-center'>- Add Character First -</div>}
          </div>
        </div>

      </div>
    </>
  );
};

export default PreviewArea;
