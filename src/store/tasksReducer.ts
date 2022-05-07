import {v1} from "uuid";
import {addNewTodolistAT, taskID_1, taskID_2, taskID_3} from "./todolistReducer";

type TaskType = {
    id: string
    isDone: boolean
    subject: string
}
export type tasksDataType = {
    [key: string]: Array<TaskType>
}
const initialState: tasksDataType = {
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


type actionType = addNewTaskAT | changeTaskTitleAT | addNewTodolistAT | changeTaskStatusAT

export const tasksReducer = (state = initialState, action: actionType): tasksDataType => {
    switch (action.type) {
        case "ADD-NEW-TASK":
            return state
        case 'CHANGE-TASK-TITLE':
            return state
        case "ADD-NEW-TODOLIST":
            return {...state, [action.todolistID]: []}
        case "CHANGE-TASK-STATUS":
            return {...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {...task, isDone: !task.isDone} : task)}
    }

    return state
}

export const addNewTaskAC = (todolistID: string) => ({type: 'ADD-NEW-TASK' as const, todolistID} as const)
export type addNewTaskAT = ReturnType<typeof addNewTaskAC>
export const changeTaskTitleAC = (todolistID: string, taskID: string) => ({type: 'CHANGE-TASK-TITLE', todolistID, taskID} as const)
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export const changeTaskStatusAC = (todolistID: string, taskID: string) => ({type: 'CHANGE-TASK-STATUS', todolistID, taskID} as const)
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
