
instead of passing items as props we can pass them as children in react

e.g 
instead of  <Button item="hello" />
we do <Buttton> Hello <Button/>

However to recieve this props we don do
function Button(props){
    return props.text
}

Rather:
funciton Button(props{
    return props.children
})


Imagine we want to but an icon  left side of the button initillau you will pass it as props and handle in your component.
But now you can

<Button>
{/*Icon goes here*/}
Buy now!
</Button>

importing Icons

import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from "./Button"
import { FaMoneyBill } from "react-icons/fa"
/**
 * Challenge: Add the "FaMoneyBill" icon to the left
 * of the "Buy now!" text in the button
 */

function App() {
  return (
    <main>
      <Button>
        <FaMoneyBill />
        Buy now!
      </Button>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

button {
    background-color: #E5E7EB;
    color: #4B5563;
    border: 1px solid #6B7280;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    font-weight: 700;
    padding: 9px 17px;
    border-radius: 6px;
    line-height: 24px;
    display: flex;
    align-items: center;
}

button > svg {
    margin-right: 7px;
    color: green;
    height: 30px;
    
}



PROPS SPREADING **********
**********************************************************

function App() {
  return (
    <main>
      <Button style={{color: "green"}} onClick={() => console.log("Logging in...")}>
        <FcGoogle />
        Log in with Google
      </Button>
    </main>
  )
}


import React from "react"

export default function Button(props) {
    return (
        <button {...props}>
            {props.children}
        </button>
    )
}

the disadvantage if you pass something thats not a button element it will be ignored


DESTRUCTURING PROPS************************
****************************************************
This way below we pass the spread and also include none element of the button element cause we pulled it out as variant

function App() {
  return (
    <main>
      <Button variant="anything" style={{color: "green"}} onClick={() => console.log("Logging in...")}>
        <FcGoogle />
        Log in with Google
      </Button>
    </main>
  )
}

export default function Button({children, variant, ...rest}) {
    return (
        <button {...rest}>
            {children}
        </button>
    )
}





REACT REUSABILITY:


Prop Drilling: happens when a component down the comp tree needs access to a data in a grandparent comp

Compound comp: Flattens the structure and easily pass props to more deeply nested components

Context: Access state driectly from the components that need it


# Compound Components Quiz

1. How would you explain the concept of compound components in React to someone who
   only knows the very basics of React?

Components that work together to accomplish a greater objective than might make
sense to try and accomplish with a single component alone.


2. What are some examples of HTML elements that work together to add functionality
   or styling to each other?

<ul> & <li>, <select> & <option>, <table> & all the other table elements


3. How can compound components help you avoid having to drill props multiple levels
   down?
   
Compound component "flatten" the heirarchy that I would otherwise need to pass
props through. Since I need to provide the children to render, the parent-most
component has direct access to those "grandchild" components, to which it can
pass whatever props it needs to pass directly.


IMPLICIT STATE:

passing state to children of an element

We will use React.cloneElement(): A utility that duplicates a react element and provides
a way to inject additional props to that element

React.Children.map() it can be used to augment the original children with new props

Limitation of React.Children:
it is fragile



CONTEXT:

using a provider to provide values through the useContext() hook to the components that needthose values or data

import React from "react"
import Header from "./Header"
import Button from "./Button"

const ThemeContext = React.createContext()

export default function App() {
    return (
        <ThemeContext.Provider value="light">
            <div className="container dark-theme">
                <Header />
                <Button />
            </div>
        </ThemeContext.Provider>
    )
}

export { ThemeContext }

import React from "react"
import { ThemeContext } from "./App"

export default function Header() {
    const value = React.useContext(ThemeContext)
    console.log(value)
    return (
        <header className="dark-theme">
            <h1>Dark Theme</h1>
        </header>
    )
}