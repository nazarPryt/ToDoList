import React from "react";

export type HeaderType = {
    val: string
}
function ToDoListHeader (props: HeaderType){
    return (
        <div>
            <h3>{props.val}</h3>
            <input/>
            <button>+</button>
        </div>
    ) }

export default ToDoListHeader