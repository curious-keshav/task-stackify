import MainbarArea from "../components/mainbar-area"
import PreviewArea from "../components/preview-area"
import SidebarArea from "../components/sidebar-area"


function MainPage() {
  return (
    <>
      <div className=" h-screen w-screen flex ">
        <div className="flex-1 h-full flex gap-2 p-2 rounded-tr-2xl shadow-xl bg-muted/50 border-t border-r border-gray-300 backdrop-blur-md overflow-hidden">
          <SidebarArea />
          <MainbarArea />
        </div>

        {/* Right Side: Preview */}
        <div className="w-1/3 h-full p-2 rounded-tl-2xl shadow-xl bg-muted/50 border-t border-l border-gray-300 backdrop-blur-md overflow-hidden">
          <PreviewArea />
        </div>
      </div>
    </>
  )
}

export default MainPage
