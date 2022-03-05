import React from "react";

type we = {
    title: string
}
const HeaderToDoList = (props: we) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            </div>
)}
export default HeaderToDoList