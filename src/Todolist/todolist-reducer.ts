import {FilterType, toDoListsType} from "../App";
import {v1} from "uuid";

export type changeFilterAT = {
    type: 'CHANGE-FILTER-TASK'
    idTodo: string
    value: FilterType
}
export type changeTitleToDoAT = {
    type: 'CHANGE-TITLE-TODO-LIST'
    idTodo: string
    newValue: string
}
export type deleteTodoListAT = {
    type: 'DELETE-TO-DO-LIST'
    idTodo: string
}
export type addNewTodoListAT = {
    type: "ADD-NEW-TO-DO-LIST"
    title: string
    idTodo: string
}


export type actionType = changeTitleToDoAT | changeFilterAT | deleteTodoListAT | addNewTodoListAT


export const todolistReducer = (state: toDoListsType[], action: actionType): toDoListsType[] => {
    let newState = JSON.stringify(state)
    let copyState: toDoListsType[] = JSON.parse(newState)

    switch (action.type) {
        case "CHANGE-FILTER-TASK":
            let task = copyState.find(el => el.id === action.idTodo)
                if (task) {
                    task.filter = action.value
                }
            return copyState;
        case "CHANGE-TITLE-TODO-LIST":
            let todo = copyState.find(el => el.id === action.idTodo)
            if (todo) {
                todo.title = action.newValue
            }
            return copyState;
        case "DELETE-TO-DO-LIST":
            let restOfTodoLists = copyState.filter( el => el.id !== action.idTodo)
            return([...restOfTodoLists])
        case "ADD-NEW-TO-DO-LIST":
            let newTodoList: toDoListsType = {id: action.idTodo ,title: action.title, filter: 'all'}
            return([newTodoList, ...copyState])


    }}

export const changeFilterTaskAC = (idTodo: string, value: FilterType):changeFilterAT => ({type: 'CHANGE-FILTER-TASK', idTodo, value})
export const changeTitleToDoAC = (idTodo: string, newValue: string):changeTitleToDoAT => ({type: 'CHANGE-TITLE-TODO-LIST',idTodo, newValue})
export const deleteTodoListAC = (idTodo: string):deleteTodoListAT => ({type: 'DELETE-TO-DO-LIST', idTodo})
export const addNewTodoListAC = (title: string): addNewTodoListAT => ({type: "ADD-NEW-TO-DO-LIST", title, idTodo: v1()})





