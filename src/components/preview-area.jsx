import React, { useState } from 'react';
import CatSprite from '../assets/CatSprite';

const PreviewArea = () => {
  const [currChar, setCurrChar] = useState(1);
  console.log(currChar)
  return (
    <>
      {/* Grid Background */}
      <div className="grid-background fixed inset-0 -z-10" />


      <div className="flex flex-col h-full overflow-y-auto text-muted-foreground">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4  shadow-sm border-b">
          <h3 className="text-2xl font-bold tracking-wide">Preview Playground</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition" onClick={() => setCurrChar(prev => prev + 1)}>
            + Create Character
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 flex justify-center items-center">
          {Array.from({ length: currChar }).map((_, ind) => {
            return <CatSprite key={ind} />;
          })}
        </div>

        <div>

        </div>
      </div>
    </>
  );
};

export default PreviewArea;
