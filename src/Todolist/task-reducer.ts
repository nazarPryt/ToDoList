import {taskObjType, TaskType} from "../App";
import {v1} from "uuid";
import {addNewTodoListAT, deleteTodoListAT} from "./todolist-reducer";

type deleteTaskAT = {
    type: 'DELETE-TASK'
    idTodo: string
    idTask: string
}
type addTaskAT = {
    type: 'ADD-TASK'
    idTodo: string
    title: string
}
type changeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    idTodo: string
    idTask: string
}

type actionType = deleteTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | addNewTodoListAT | deleteTodoListAT

export const taskReducer = (state: taskObjType, action: actionType): taskObjType => {
    let copyState = JSON.stringify(state)
    let newState:taskObjType = JSON.parse(copyState)

    switch (action.type) {
        case "DELETE-TASK":
            let restTasks = state[action.idTodo].filter(el => el.id !== action.idTask)
            state[action.idTodo] = restTasks
            return {...state}
        case "ADD-TASK":
            let newTask: TaskType = {id: v1(), isDone: true, subject: action.title}
            let newObj = [newTask, ...state[action.idTodo]]
            state[action.idTodo] = newObj
            return {...state}
        case "CHANGE-TASK-STATUS":
            let arr = newState[action.idTodo]
            let tas = arr.find(el => el.id === action.idTask)
            if (tas) {
                tas.isDone = !tas.isDone
                }
            return newState
        case "CHANGE-TASK-TITLE":
            let task = state[action.idTodo].find(el => el.id === action.idTask)
            if (task){
                task.subject = action.newValue
            }
            return{...state}
        case "ADD-NEW-TO-DO-LIST":
            const copy = {...state}
            copy[action.idTodo] = []
            return copy
        case "DELETE-TO-DO-LIST":
            delete state[action.idTodo]
            return{...state}
        default:
            return {...state}
    }
}


export const deleteTaskAC = (idTodo: string, idTask: string): deleteTaskAT => ({type: 'DELETE-TASK', idTask, idTodo})
export const addTaskAC = (idTodo: string, title: string): addTaskAT => ({type: 'ADD-TASK', idTodo, title})
export const changeTaskStatusAC = (idTodo: string, idTask: string): changeTaskStatusAT => ({type: "CHANGE-TASK-STATUS", idTodo, idTask})



export const changeTaskTitleAC = (idTodo: string, idTask: string, newValue: string) => ({type:"CHANGE-TASK-TITLE",idTask,idTodo,newValue}) as const
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>










