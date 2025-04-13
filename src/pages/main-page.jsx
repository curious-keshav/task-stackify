/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import { useState } from "react";
import MainbarArea from "../components/mainbar-area"
import PreviewArea from "../components/preview-area"
import SidebarArea from "../components/sidebar-area"
import { v4 as uuidv4 } from "uuid";
import { Characters } from "../utility/characters";


function MainPage() {
  const [sprites, setSprites] = useState([]);
  const [tooltipMessages, setTooltipMessages] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedSpriteId, setSelectedSpriteId] = useState(null);
  const [isThinking, setIsThinking] = useState([]);
  console.log(sprites, "hello")

  const runStack = async (blocks, spriteId) => {
    for (const block of blocks) {
      const { type, props } = block;
      console.log(type, props, "keshav")

      switch (type) {
        case "MOVE_X":
          await moveBy(spriteId, Number(props?.value || 10), 0);
          break;
        case "MOVE_Y":
          await moveBy(spriteId, 0, Number(props?.value || 10));
          break;
        case "GO_TO":
          setSprites((prev) => prev.map((s) => (s.id === spriteId ? { ...s, position: { x: props?.x ?? 0, y: props?.y ?? 0 } } : s)));
          await delay(500);
          break;

        case "SAY":
          setIsThinking((prev) => ({ ...prev, [spriteId]: false }));
          setTooltipMessages((prev) => ({ ...prev, [spriteId]: props?.message }));
          await delay((props?.duration || 1) * 1000);
          setTooltipMessages((prev) => ({ ...prev, [spriteId]: "" }));
          break;
        case "THINK":
          setIsThinking((prev) => ({ ...prev, [spriteId]: true }));
          setTooltipMessages((prev) => ({ ...prev, [spriteId]: props?.message }));
          await delay((props?.duration || 1) * 1000);
          setTooltipMessages((prev) => ({ ...prev, [spriteId]: "" }));
          break;

        case "TURN_DEGREES":
          setSprites((prev) =>
            prev.map((s) => {
              if (s.id === spriteId) {
                const currentAngle = s.angle || 0;
                const newAngle = currentAngle + Number(props?.degrees || 0);
                return { ...s, angle: newAngle };
              }
              return s;
            })
          );
          break;

        case "REPEAT": {
          const times = Number(props?.count || 1);
          const currentIndex = blocks.indexOf(block);
          const previousBlocks = blocks.slice(0, currentIndex);

          for (let j = 0; j < times; j++) {
            await runStack(previousBlocks, spriteId);

            setSprites((prev) =>
              prev.map((s) => {
                if (s.id === spriteId) {
                  const resetAngle = s.angle || 0;
                  return { ...s, angle: resetAngle };
                }
                return s;
              })
            );

            await delay(100);
          }
          break;
        }
      }
    }
  }

  const moveBy = (spriteId, dx, dy) =>
    new Promise((resolve) => {
      setSprites((prev) => {
        const updatedSprites = prev?.map((sprite) => {
          if (sprite.id !== spriteId) return sprite;

          const newPos = {
            x: sprite?.position?.x + dx,
            y: sprite?.position?.y + dy,
          };

          return { ...sprite, position: newPos };
        });

        const current = updatedSprites.find((s) => s.id === spriteId);
        const collided = updatedSprites.find(
          (s) => s.id !== spriteId && Math.abs(s.position.x - current.position.x) < 95 && Math.abs(s.position.y - current.position.y) < 100
        );

        if (collided) {
          console.log(spriteId, "Hero Feature Collision between:", collided.id);
          return updatedSprites.map((s) => {
            if (s.id === spriteId) return { ...s, stack: collided.stack };
            if (s.id === collided.id) return { ...s, stack: current.stack };
            return s;
          });
        }

        setTimeout(resolve, 500);
        return updatedSprites;
      });
    });

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const addNewSprite = (characterKey) => {
    const character = Characters[characterKey];
    const id = uuidv4();
    const name = `${character.label} ${sprites.filter((s) => s.type === character.type).length + 1}`;

    let x = 50;
    let y = 50;
    const padding = 10;

    // Ensure non-overlapping position
    // while (sprites.some((s) => Math.abs(s.position.x - x) < 95 + padding && Math.abs(s.position.y - y) < 100 + padding)) {
    //   x += 30;
    //   y += 30;
    //   if (x > 250) x = 50;
    //   if (y > 250) y = 50;
    // }

    setSprites((prev) => [
      ...prev,
      {
        id,
        name,
        type: character.type,
        position: { x, y },
        stack: [],
        component: character.component,
      },
    ]);
  };

  const runAllStacks = () => {
    sprites.forEach((sprite) => {
      runStack(sprite.stack, sprite.id);
    });
  };

  const updateSpriteStack = (spriteId, blocks) => {
    setSprites((prev) => prev.map((s) => (s.id === spriteId ? { ...s, stack: blocks } : s)));
  };

  const handleSelectCharacter = (key) => {
    addNewSprite(key);
    setShowModal(false);
  };

  const handleSpriteSelection = (id) => {
    if (selectedSpriteId === id) {
      setSelectedSpriteId(null);
    } else {
      setSelectedSpriteId(id);
    }
  };

  return (
    <>
      <div className=" h-screen w-screen flex ">
        <div className="flex-1 h-full flex gap-2 p-2 rounded-tr-2xl shadow-xl bg-muted/50 border-t border-r border-gray-300 backdrop-blur-md n">
          <SidebarArea />
          <MainbarArea
            runAllStacks={runAllStacks}
            sprites={sprites}
            onUpdateStack={updateSpriteStack}
            onRunStack={runStack}
            selectedSpriteId={selectedSpriteId}
            setShowModal={setShowModal}
          />
        </div>

        <div className=" w-1/3 h-screen  flex flex-col p-2 rounded-tl-2xl shadow-xl bg-muted/50 border-t border-l border-gray-300 backdrop-blur-md ">
          <div className="flex  items-center justify-between px-6 py-4  shadow-sm border-b">
            <h3 className="text-muted-foreground text-2xl font-bold tracking-wide">Preview Playground</h3>
            <div className="relative inline-block text-left">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                onClick={() => setShowModal(true)}
              >
                + Create Character
              </button>
            </div>
          </div>
          <PreviewArea
            setShowModal={setShowModal}
            sprites={sprites}
            onPositionChange={(id, newPos) => {
              setSprites((prev) => prev.map((s) => (s.id === id ? { ...s, position: newPos } : s)));
            }}
            tooltipMessages={tooltipMessages}
            onSpriteClick={handleSpriteSelection}
            selectedSpriteId={selectedSpriteId}
            isThinking={isThinking}
          />

        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
            <div className="bg-muted-foreground/80 backdrop-blur-lg text-zinc-800 dark:text-zinc-100 rounded-2xl shadow-2xl p-8 w-[70vw] max-w-4xl h-[50vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-8 text-center text-muted">Select Character</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {Object.entries(Characters).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleSelectCharacter(key)}
                    className="flex flex-col items-center justify-center p-4  border-2 border-muted-foreground bg-muted/90 hover:bg-muted text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  >
                    {value.component}
                    <span className="mt-3 text-sm font-medium">{value.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium bg-muted text-white hover:text-gray-800 dark:hover:text-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default MainPage
