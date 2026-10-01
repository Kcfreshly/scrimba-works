import React from "react"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"

export default function Menu({ buttonText = "Menu", items }) {
    /**
     * Note: leave the div className="menu" here and render
     * the children inside that div. Notice this component will become
     * significantly simpler by doing so 💡
     * 
     * Also, notice our state will be broken after we make 
     * these changes - that's okay! We'll fix it soon. In the meantime,
     * leave the useState() call and toggle() definitions alone. Your
     * new version won't be using them, but we'll come back to them
     * later.
     */
    // const [open, setOpen] = React.useState(true)

    // function toggle() {
    //     setOpen(prevOpen => !prevOpen)
    // }

    // return (
    //     <div className="menu">
    //         <MenuButton
    //             buttonText={buttonText}
    //             onClick={toggle}
    //         />

    //         {open && <MenuDropdown items={items} />}
    //     </div>
    // )

    // After you finish the challenge, your Menu component should look like this:

    const [open, setOpen] = React.useState(true)

    function toggle() {
        setOpen(prevOpen => !prevOpen)
    }

    return (
        <div className="menu">
            // we use React.Children.map() to iterate over the children and clone each child with the open and toggle props
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    open,
                    toggle
                })
            })}
        </div>
    )
}
