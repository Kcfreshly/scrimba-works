import React from "react"

// export default function MenuDropdown({ items }) {
//     return (
//         <div className="menu-dropdown">
//             {items.map(
//                 item => (
//                     <div
//                         className="menu-item"
//                         key={item}
//                     >
//                         {item}
//                     </div>
//                 )
//             )}
//         </div>
//     )
// }


export default function MenuDropdown({ children, open }) {
    return open ? (
        <div className="menu-dropdown">
            {children}
        </div>
    ) : null
}