import './App.css'
import AnimationBar from './components/animationBar'
import Mainbar from './components/mainbar'
import Sidebar from './components/sidebar'

function App() {

  return (
    <>
      <div className="grid-background"></div>
      
      <Sidebar />
      <Mainbar />
      <AnimationBar />
    </>
  )
}

export default App
