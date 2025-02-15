import { useState, useRef } from 'react'
import './App.css'
import Header from './components/Header'

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const containerRef = useRef()


  const onMaximizeClick = () => {
    if (!isFullScreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    setIsFullScreen(!isFullScreen)
  }


  return (
    <>
      <article ref={containerRef} className="container">
        <Header currentStep={2} completedSteps={1} onMaximizeClick={onMaximizeClick} ></Header>
      </article>
    </>
  )
}

export default App
