import { Fragment } from "react"
import CheckSvg from "../assets/check.svg"
import MaximizeSvg from "../assets/maximize.svg"

function Header({ currentStep, completedSteps, onMaximizeClick, onNavigate, disabled }) {
    const steps = [1, 2, 3, 4]

    return (
        <Fragment>
            <header className="header">
                <h1>Register a new location</h1>
                <div className="steps">
                    {steps.map((num) => (
                        <Fragment key={num}>
                            <button onClick={() => { if (disabled) {return} onNavigate(num) }} className={`step ${currentStep === num ? 'current' : ''} ${completedSteps >= num ? 'done' : ''}`} disabled={completedSteps + 1 < num}>{num}</button>
                            {num != steps.length ? <div className={`step-divider ${completedSteps >= num ? '' : 'dashed'}`}></div> : ""}
                        </Fragment>
                    ))}

                </div>

                <button onClick={onMaximizeClick} className="fullscreen-btn">
                    <img src={MaximizeSvg} alt="Maximize" />
                </button>
            </header>
        </Fragment>
    )
}

export default Header