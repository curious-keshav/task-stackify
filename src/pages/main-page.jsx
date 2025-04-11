import { useState } from "react";
import MainbarArea from "../components/mainbar-area"
import PreviewArea from "../components/preview-area"
import SidebarArea from "../components/sidebar-area"


function MainPage() {
  const [spritePosition, setSpritePosition] = useState({ x: 100, y: 100 });

  const runStack = async (blocks) => {
    for (const block of blocks) {
      const { type, props } = block;

      switch (type) {
        case "MOVE_X":
          await moveBy(Number(props?.value || 10), 0);
          break;
        case "MOVE_Y":
          await moveBy(0, Number(props?.value || 10));
          break;
        case "GO_TO":
          setSpritePosition({ x: props?.x ?? 0, y: props?.y ?? 0 });
          await delay(500);
          break;
        case "TURN_DEGREES":
          setSpritePosition({ angle : props?.angle ?? 0 });
          await delay(500);
          break;
      }
    }
  }

  const moveBy = (dx, dy) =>
    new Promise((resolve) => {
      setSpritePosition((prev) => {
        const newPos = { x: prev.x + dx, y: prev.y + dy };
        setTimeout(resolve, 500);
        return newPos;
      });
    });

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));



  return (
    <>
      <div className=" h-screen w-screen flex ">
        <div className="flex-1 h-full flex gap-2 p-2 rounded-tr-2xl shadow-xl bg-muted/50 border-t border-r border-gray-300 backdrop-blur-md overflow-hidden">
          <SidebarArea />
          <MainbarArea onRunStack={runStack} />
        </div>

        {/* Right Side: Preview */}
        <div className=" w-1/3 h-screen  flex flex-row p-2 rounded-tl-2xl shadow-xl bg-muted/50 border-t border-l border-gray-300 backdrop-blur-md overflow-hidden">
          <PreviewArea position={spritePosition} onPositionChange={setSpritePosition} />
        </div>
      </div>
    </>
  )
}

export default MainPage
