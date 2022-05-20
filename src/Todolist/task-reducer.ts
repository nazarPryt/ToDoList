import {taskObjType, TaskType} from "../App";
import {v1} from "uuid";
import {addNewTodoListAT, deleteTodoListAT} from "./todolist-reducer";

type actionType =
    deleteTaskAT
    | addTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | addNewTodoListAT
    | deleteTodoListAT

export const taskID_1 = v1()
export const taskID_2 = v1()
export const taskID_3 = v1()

const initialState: taskObjType = {
    [taskID_1]:
        [
            {id: v1(), isDone: true, subject: "HTML&CSS"},
            {id: v1(), isDone: true, subject: "JS"},
            {id: v1(), isDone: false, subject: "React"},
            {id: v1(), isDone: false, subject: "Redux"}
        ],
    [taskID_2]:
        [
            {id: v1(), isDone: true, subject: "Clean my house"},
            {id: v1(), isDone: true, subject: "Have a rest"}
        ],
    [taskID_3]:
        [
            {id: v1(), isDone: true, subject: "Butter"},
            {id: v1(), isDone: true, subject: "Milk"}
        ]
}

export const taskReducer = (state = initialState, action: actionType): taskObjType => {
    switch (action.type) {
        case "DELETE-TASK":
            return {
                ...state,
                [action.idTodo]: [...state[action.idTodo].filter(task => task.id !== action.idTask)]
            }
        case "ADD-TASK":
            let newTask: TaskType = {id: v1(), isDone: true, subject: action.title}
            return {
                ...state,
                [action.idTodo]: [newTask, ...state[action.idTodo]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.idTodo]: state[action.idTodo].map(task => task.id === action.idTask
                    ? {...task, isDone: !task.isDone}
                    : task)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.idTodo]: state[action.idTodo].map(task => task.id === action.idTask
                    ? {
                        ...task,
                        subject: action.newValue
                    }
                    : task)
            }
        case "ADD-NEW-TO-DO-LIST":
            return {
                ...state,
                [action.idTodo]: []
            }
        case "DELETE-TO-DO-LIST":
            delete state[action.idTodo]
            return {...state}
        default:
            return state
    }
}


export const deleteTaskAC = (idTodo: string, idTask: string) => ({type: 'DELETE-TASK', idTask, idTodo} as const)
export type deleteTaskAT = ReturnType<typeof deleteTaskAC>
export const addTaskAC = (idTodo: string, title: string) => ({type: 'ADD-TASK', idTodo, title} as const)
export type addTaskAT = ReturnType<typeof addTaskAC>
export const changeTaskStatusAC = (idTodo: string, idTask: string) => ({type: "CHANGE-TASK-STATUS", idTodo, idTask} as const)
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export const changeTaskTitleAC = (idTodo: string, idTask: string, newValue: string) => ({type: "CHANGE-TASK-TITLE", idTask, idTodo, newValue}) as const
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>










