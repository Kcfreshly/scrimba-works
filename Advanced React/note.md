
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
