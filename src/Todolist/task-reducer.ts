import {taskObjType} from "../App";
import {deleteTodoListAC, setToDoListsAC} from "./todolist-reducer";
import {TaskType} from "../api/todoListAPI";

type actionType =
    | ReturnType <typeof setToDoListsAC>
    | ReturnType <typeof deleteTodoListAC>
    | ReturnType <typeof deleteTaskAC>
    | ReturnType <typeof addTaskAC>
    | ReturnType <typeof changeTaskStatusAC>
    | ReturnType <typeof changeTaskTitleAC>


const initialState: taskObjType = {}

export const taskReducer = (state = initialState, action: actionType): taskObjType => {
    switch (action.type) {
        case "DELETE-TASK":
            return {...state, [action.idTodo]: [...state[action.idTodo].filter(task => task.id !== action.idTask)]}
        case "ADD-TASK":
            let newTask: TaskType = action.tasks
            return {...state, [action.idTodo]: [newTask, ...state[action.idTodo]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.idTodo]: state[action.idTodo].map(task => task.id === action.idTask
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
        case 'SET-TO-DO-LISTS':
            const copyState = {...state}
            action.ToDoLists.forEach(tl => {
                copyState[tl.id] = [];
            })
        default:
            return state
    }
}


export const deleteTaskAC = (idTodo: string, idTask: string) => ({type: 'DELETE-TASK', idTask, idTodo} as const)
export const addTaskAC = (idTodo: string, title: string, tasks: TaskType) => ({type: 'ADD-TASK', idTodo, title, tasks} as const)
export const changeTaskStatusAC = (idTodo: string, idTask: string) => ({
    type: "CHANGE-TASK-STATUS",
    idTodo,
    idTask
} as const)
export const changeTaskTitleAC = (idTodo: string, idTask: string, newValue: string) => ({
    type: "CHANGE-TASK-TITLE",
    idTask,
    idTodo,
    newValue
}) as const










