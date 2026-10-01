import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from "./Button"

function App() {
  return (
    <main>
      <Button size="lg">Log in with Google</Button>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

IMPLEMENTATION *************************

**************************

import React from "react"

export default function Button({children, size, ...rest}) {
    let sizeClass
    if (size === "sm") sizeClass = "button-small"
    if (size === "lg") sizeClass = "button-large"
    
    return (
        <button className={sizeClass} {...rest}>
            {children}
        </button>
    )
}


but imagine if we put a classname alogside our size props which do you think will take lead ?

    <main>
      <Button size="lg" className="green">Log in with Google</Button>
    </main>

    then the implementation from the butoon component will only implement the classname of green cause rest 
    has a class name property that overwrites the implicit className={sizeClass}

    export default function Button({children, size, ...rest}) {
    let sizeClass
    if (size === "sm") sizeClass = "button-small"
    if (size === "lg") sizeClass = "button-large"
    
    return (
        <button className={sizeClass} {...rest}>
            {children}
        </button>
    )
}

if you switch as below then we get a large button and not a green one cause class name only implements the size props

<button {...rest} className={sizeClass} >


WE CAN SOLVE THIS WITH BELOW:

import React from "react"
import classnames from "classnames"

export default function Button({children, className, size, ...rest}) {
    let sizeClass
    if (size === "sm") sizeClass = "button-small"
    if (size === "lg") sizeClass = "button-large"
    
    const allClasses = classnames(sizeClass, className)
    console.log(allClasses)
    
    return (
        <button className={allClasses} {...rest}>
            {children}
        </button>
    )
}

    /**
     * Challenge: 
     * 
     * Accept a `variant` prop and style the Button component
     * accordingly. The values can be `success`, `warning`, or `danger`. 
     * Check the Figma design for the specific colors to be used for each
     * variant.
     */