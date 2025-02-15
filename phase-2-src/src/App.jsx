import { useState, useRef, Fragment } from 'react'
import './App.css'
import Header from './components/Header'
import Part1 from './components/Form/Part1'

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const containerRef = useRef()
  const [completedSteps, setCompletedSteps] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const [missingValues, setMissingValues] = useState([])


  const onMaximizeClick = () => {
    if (!isFullScreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    setIsFullScreen(!isFullScreen)
  }

  const navigateSteps = (step) => {
    setCurrentStep(step)
  }

  /*
  Expected form data
{
"name": "Test location",
"description":"Test demo description",
"postalCode": 1000,
"city": "Budapest",
"address": "Test address 55.",
"from":"08:00",
"to": "23:30",
"openAt": "Weekdays",

"freeWiFi": false,
"accessibleEntry": true,
"LoungeArea": true,
"backgroundMusic": true,
"customerService": false,
"parking":"Medium"
}
*/

  const requiredValues1 = ["name", "description", "postalCode", "city", "address", "from", "to", "openAt"]
  const [formData, setFormData] = useState({
    "name": "",
    "description": "",
    "postalCode": "",
    "city": "",
    "address": "",
    "from": "",
    "to": "",
    "openAt": "",
    "freeWiFi": false,
    "accessibleEntry": false,
    "LoungeArea": false,
    "backgroundMusic": false,
    "customerService": false,
    "parking": "Easy"
  })


  const goNext = () => {
    let missing = []
    for (let i in requiredValues1) {
      if (formData[requiredValues1[i]] == undefined || formData[requiredValues1[i]] == "") {
        missing.push(requiredValues1[i])
      }
    }

    if (missing.length > 0) {
      setMissingValues(missing)
      return;
    }

    if (currentStep + 1 > completedSteps + 1) {
      return;
    }

    setCurrentStep(currentStep + 1)
  }

  const goBack = () => {
    setCurrentStep(currentStep - 1)
  }



  return (
    <>
      <article ref={containerRef} className="container">
        <Header onNavigate={navigateSteps} currentStep={currentStep} completedSteps={completedSteps} onMaximizeClick={onMaximizeClick} ></Header>
        <main className="main">
          {
            //render form part
            (() => {
              switch (currentStep) {
                case 1:
                  return (
                    <Part1 missingValues={missingValues} formData={formData} onChange={(key, value) => {
                      if (missingValues.includes(key)) {
                        setMissingValues(missingValues.filter((item => item != key)))
                      }
                      setFormData((prev) => ({
                        ...prev,
                        [key]: value,
                      }))
                    }}></Part1>
                  )

                default:
                  break;
              }
            })()
          }
        </main>
        <footer className="footer">
          <button className="btn" onClick={goBack} disabled={currentStep <= 1}>Back</button>
          <button className="btn" onClick={goNext}>Next</button>
        </footer>
      </article>
    </>
  )
}

export default App
