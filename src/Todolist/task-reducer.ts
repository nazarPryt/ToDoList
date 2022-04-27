import {taskObjType, TaskType} from "../App";
import {v1} from "uuid";

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
type changeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    idTodo: string
    idTask: string
    newValue: string
}

type actionType = deleteTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT

export const taskReducer = (state: taskObjType, action: actionType): taskObjType => {
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
            let arr = state[action.idTodo]
            let tas = arr.find(el => el.id === action.idTask)
            if (tas) {
                tas.isDone = !tas.isDone
                return {...state}}
            return {...state}
        case "CHANGE-TASK-TITLE":
            let task = state[action.idTodo].find(el => el.id === action.idTask)
            if (task){
                task.subject = action.newValue
                return{...state}}
            return{...state}
        default:
            return {...state}
    }
}


export const deleteTaskAC = (idTodo: string, idTask: string): deleteTaskAT => ({type: 'DELETE-TASK', idTask, idTodo})
export const addTaskAC = (idTodo: string, title: string): addTaskAT => ({type: 'ADD-TASK', idTodo, title})
export const changeTaskStatusAC = (idTodo: string, idTask: string): changeTaskStatusAT => ({type: "CHANGE-TASK-STATUS", idTodo, idTask})
export const changeTaskTitleAC = (idTodo: string, idTask: string, newValue: string): changeTaskTitleAT => ({type:"CHANGE-TASK-TITLE",idTask,idTodo,newValue})