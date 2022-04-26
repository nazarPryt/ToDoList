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
    type: 'ADD-NEW-TO-DO-LIST'
    title: string
}


export type actionType = changeTitleToDoAT | changeFilterAT | deleteTodoListAT | addNewTodoListAT


export const todolistReducer = (state: toDoListsType[], action: actionType): toDoListsType[] => {
    switch (action.type) {
        case "CHANGE-FILTER-TASK":
            state.find(el => {
                if (el.id === action.idTodo) {
                    el.filter = action.value
                }
            })
            return {...state};

        case "CHANGE-TITLE-TODO-LIST":
            let todo = state.find(el => el.id === action.idTodo)
            if (todo) {
                todo.title = action.newValue

            }
            return {...state};
        case "DELETE-TO-DO-LIST":
            let restOfTodoLists = state.filter( el => el.id !==action.idTodo)
            return([...restOfTodoLists])
            // delete taskObj[idTodo]
        case "ADD-NEW-TO-DO-LIST":
            let newTaskID = v1()
            let newTodoList: toDoListsType = {id: newTaskID,title: action.title, filter: 'all'}
            return([newTodoList, ...state])
            // let newTodoListTask = taskObj[newTaskID] = []
            // setTaskObj({newTodoListTask,...taskObj})

    }}

export const changeFilterTaskAC = (idTodo: string, value: FilterType):changeFilterAT => ({type: 'CHANGE-FILTER-TASK', idTodo, value})
export const changeTitleToDoAC = (idTodo: string, newValue: string):changeTitleToDoAT => ({type: 'CHANGE-TITLE-TODO-LIST',idTodo, newValue})
export const deleteTodoListAC = (idTodo: string):deleteTodoListAT => ({type: 'DELETE-TO-DO-LIST', idTodo})
export const addNewTodoListAC = (title: string): addNewTodoListAT => ({type: "ADD-NEW-TO-DO-LIST", title})






//     addTask: (idTodo: string, value: string) => void
//     deleteTask: (idTodo: string, idTask: string) => void
//     changeStatusTask: (idTodo: string, idTask: string) => void
//     changeTitleTask: (idTodo: string, idTask: string, newValue: string) => void
//     changeTitleToDo: (idTodo: string, newValue: string) => void
//     changeFilter: (value: FilterType, idTodo: string) => void
//     filterValue: FilterType
//     deleteTodoList: (idTodo: number) => void

