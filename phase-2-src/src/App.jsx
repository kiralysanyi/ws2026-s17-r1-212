import { useState, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import Part1 from './components/Form/Part1'
import Part2 from './components/Form/Part2'
import Part3 from './components/Form/Part3'
import Part4 from './components/Form/Part4'
import validate from './Validator'
import GridValidator from './GridValidator'

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const containerRef = useRef()

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
"loungeArea": true,
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
    "loungeArea": false,
    "backgroundMusic": false,
    "customerService": false,
    "parking": "Easy"
  };

  let savedData = {};
  try {
    savedData = JSON.parse(window.name)
    savedFormData = savedData["formdata"]
  } catch (error) {
    console.log("No saved form data found.");
  }

  const [formData, setFormData] = useState(savedFormData)
  const [completedSteps, setCompletedSteps] = useState(savedData["completed"] ? savedData["completed"] : 0)
  const [currentStep, setCurrentStep] = useState(savedData["current"] ? savedData["current"] : 1)
  let floorPlannerData = savedData["floorplanner"] ? savedData["floorplanner"] : null;

  const saveData = () => {
    window.name = JSON.stringify({ formdata: formData, completed: completedSteps, current: currentStep, floorplanner: floorPlannerData })
  }

  saveData()

  const [realtimeValidation, setRealtimeValidation] = useState(false)

  const gridUpdated = () => {
    if (currentStep == 2 && realtimeValidation) {
      if (GridValidator(floorPlannerData)) {
        setShowGridError(false)
      } else {
        setShowGridError(true)
      }
    }
  }

  const updateFormData = (key, value) => {
    const newFormData = formData;
    newFormData[key] = value;

    if (currentStep == 1 && realtimeValidation) {
      const validatorResult = validate(newFormData)
      setErrors(validatorResult)
    }

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const [errors, setErrors] = useState({})
  const [showGridError, setShowGridError] = useState(false)

  const navigateSteps = (step) => {
    //validate if current step is 1
    if (currentStep == 1) {
      const validatorResult = validate(formData)

      if (Object.keys(validatorResult).length > 0) {
        setErrors(validatorResult)
        setRealtimeValidation(true)
        return;
      } else {
        setErrors({})
        setRealtimeValidation(false)
      }
    }

    if (currentStep == 2) {
      if (GridValidator(floorPlannerData)) {
        setRealtimeValidation(false)
        setShowGridError(false)
      } else {
        setShowGridError(true);
        setRealtimeValidation(true)
        return;
      }
    }

    setCurrentStep(step)
  }




  const goNext = () => {
    //goNext handler for step 1
    if (currentStep == 1) {
      return (() => {
        const validatorResult = validate(formData)

        if (Object.keys(validatorResult).length > 0) {
          setErrors(validatorResult)
          setRealtimeValidation(true)
          return;
        } else {
          setErrors({})
          setRealtimeValidation(false)
        }

        if (completedSteps > 0) {
          setCurrentStep(currentStep + 1)
          return
        }

        if (currentStep >= completedSteps) {
          setCompletedSteps(currentStep);
          setCurrentStep(currentStep + 1)
        }

      })()
    }


    //goNext handler for step 2
    if (currentStep == 2) {
      return (() => {
        //validate grid layout
        if (GridValidator(floorPlannerData)) {
          setRealtimeValidation(false)
          setCompletedSteps(currentStep)
          setCurrentStep(currentStep + 1)
        } else {
          setShowGridError(true);
          setRealtimeValidation(true)
          return;
        }


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
        <Header disabled={currentStep == 4 ? true : false} onNavigate={navigateSteps} currentStep={currentStep} completedSteps={completedSteps} onMaximizeClick={onMaximizeClick} ></Header>
        <main className="main">
          {
            //render form part
            (() => {
              switch (currentStep) {
                case 1:
                  return (
                    <Part1 errors={errors} formData={formData} onChange={updateFormData}></Part1>
                  )

                case 2:
                  return (
                    <Part2 showError={showGridError} onChange={(cells) => { floorPlannerData = cells; saveData(); gridUpdated() }}></Part2>
                  )

                case 3:
                  return (
                    <Part3 formData={formData} onChange={updateFormData}></Part3>
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
        {currentStep != 4 ? <footer className="footer">
          <button className="btn" onClick={goBack} disabled={currentStep <= 1}>Back</button>
          <button className="btn" onClick={goNext}>Next</button>
        </footer> : ""}
      </article>
    </>
  )
}

export default App
