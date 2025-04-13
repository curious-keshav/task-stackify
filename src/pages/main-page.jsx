/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import MainbarArea from "../components/mainbar-area"
import PreviewArea from "../components/preview-area"
import SidebarArea from "../components/sidebar-area"
import { Characters } from "../utility/characters";
import { useSpriteContext } from "../context/SpriteContext";

function MainPage() {

  const { setSprites, setShowModal, isThinking, showModal, handleSelectCharacter } = useSpriteContext();


  return (
    <>
      <div className=" h-screen w-screen flex ">
        <div className="flex-1 h-full flex gap-2 p-2 rounded-tr-2xl shadow-xl bg-muted/50 border-t border-r border-gray-300 backdrop-blur-md n">
          <SidebarArea />
          <MainbarArea />
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
            onPositionChange={(id, newPos) => {
              setSprites((prev) => prev.map((s) => (s.id === id ? { ...s, position: newPos } : s)));
            }}
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
