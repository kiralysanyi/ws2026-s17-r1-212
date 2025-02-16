import { useState, useRef, Fragment } from 'react'
import './App.css'
import Header from './components/Header'
import Part1 from './components/Form/Part1'
import Part2 from './components/Form/Part2'
import Part3 from './components/Form/Part3'

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const containerRef = useRef()
  const [missingValues, setMissingValues] = useState([])

  //set title
  document.title = "Register a new location | Sudsy"


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

  let savedFormData = {
    "name": "",
    "description": "",
    "postalCode": "",
    "city": "",
    "address": "",
    "from": "",
    "to": "",
    "openAt": "Every Day",
    "freeWiFi": false,
    "accessibleEntry": false,
    "LoungeArea": false,
    "backgroundMusic": false,
    "customerService": false,
    "parking": "Easy"
  };

  let savedData;
  try {
    savedData = JSON.parse(window.name)
    savedFormData = savedData["formdata"]
  } catch (error) {
    console.log("No saved form data found.");
  }

  const requiredValues1 = ["name", "description", "postalCode", "city", "address", "from", "to", "openAt"]
  const [formData, setFormData] = useState(savedFormData)
  const [completedSteps, setCompletedSteps] = useState(savedData["completed"] ? savedData["completed"] : 0)
  const [currentStep, setCurrentStep] = useState(savedData["current"] ? savedData["current"] : 1)

  window.name = JSON.stringify({ formdata: formData, completed: completedSteps, current: currentStep })

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }


  const goNext = () => {
    //goNext handler for step 1
    if (currentStep == 1) {
      return (() => {

        if (completedSteps > 0) {
          setCurrentStep(currentStep + 1)
          return
        }

        let missing = []
        for (let i in requiredValues1) {
          if (formData[requiredValues1[i]] == undefined || formData[requiredValues1[i]] == "") {
            missing.push(requiredValues1[i])
          }
        }

        if (missing.length > 0) {
          setMissingValues(missing)
          return;
        } else {
          if (currentStep >= completedSteps) {
            setCompletedSteps(currentStep);
            setCurrentStep(currentStep + 1)
          }
        }
      })()
    }


    //goNext handler for step 2
    if (currentStep == 2) {
      return (() => {
        setCompletedSteps(currentStep)
        setCurrentStep(currentStep + 1)
      })()
    }

    //goNext handler for step 3
    if (currentStep == 3) {
      return (() => {
        setCompletedSteps(currentStep)
        setCurrentStep(currentStep + 1)
      })()
    }
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
                      updateFormData(key, value)
                    }}></Part1>
                  )

                case 2:
                  return (
                    <Part2></Part2>
                  )

                case 3:
                  return (
                    <Part3></Part3>
                  )

                case 4:
                  return (
                    <Part4></Part4>
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
