import {TaskType, todoListAPI} from "../api/todoListAPI";
import {AppThunkType} from "./store";

export type taskActionType =
    // | ReturnType<typeof setToDoListsAC>
    // | ReturnType<typeof addNewTodoListAC>
    // | ReturnType<typeof deleteTodoListAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof createNewTaskAC>
    | ReturnType<typeof setTasksAC>


export type taskObjType = {
    [key: string]: Array<TaskType>
}
const initialState: taskObjType = {}


export const taskReducer = (state = initialState, action: taskActionType): taskObjType => {

    switch (action.type) {
        // case "DELETE-TASK":
        //     return {...state, [action.idTodo]: [...state[action.idTodo].filter(task => task.id !== action.idTask)]}
        // case "ADD-TASK":
        //     let newTask: TaskType = action.tasks
        //     return {...state, [action.idTodo]: [newTask, ...state[action.idTodo]]}
        // case "CHANGE-TASK-STATUS":
        //     return {
        //         ...state, [action.idTodo]: state[action.idTodo].map(task => task.id === action.idTask
        //             ? {...task, isDone: !task.isDone}
        //             : task)
        //     }
        // case "CHANGE-TASK-TITLE":
        //     return {
        //         ...state,
        //         [action.idTodo]: state[action.idTodo].map(task => task.id === action.idTask
        //             ? {
        //                 ...task,
        //                 subject: action.newValue
        //             }
        //             : task)
        //     }
        // case "ADD-NEW-TO-DO-LIST":
        //     return {
        //         ...state,
        //         [action.idTodo]: []
        //     }
        // case "DELETE-TO-DO-LIST":
        //     delete state[action.]
        //     return {...state}
        // case 'SET-TO-DO-LISTS': {
        //     const copyState = {...state}
        //     action.ToDoLists.forEach(tl => {
        //         copyState[tl.id] = [];
        //     })
        //     return state
        // }
        //
        // case "ADD-NEW-TO-DO-LIST":
        //     const tas: Array<TaskType> = []
        //     return {...state,
        //         [action.toDoList.id] : tas
        //     }
        case 'SET-TASKS':
            return {...state, [action.todoListID]: [...action.tasks]}
        case "CREATE-NEW-TASK":
            return {...state, [action.todoListID] : [{...action.tasks}, ...state[action.todoListID]]}
        default:
            return state
    }
}


export const deleteTaskAC = (idTodo: string, idTask: string) => ({type: 'DELETE-TASK', idTask, idTodo} as const)
export const createNewTaskAC = (todoListID: string, tasks: TaskType) => ({
    type: 'CREATE-NEW-TASK',
    todoListID,
    tasks
} as const)
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
export const setTasksAC = (tasks: TaskType[], todoListID: string) => ({type: 'SET-TASKS', todoListID, tasks}) as const


///////   Thunk     ///////
export const setTasksTC = (todoListID: string): AppThunkType => async dispatch => {
    try {
        const res = await todoListAPI.getTasks(todoListID)
        dispatch(setTasksAC(res.data.Items, todoListID))
    } catch (e) {
        console.warn(e)
    }
}
export const createNewTaskTC = (todoListID: string, title: string): AppThunkType => async dispatch => {
    try {
        const res = await todoListAPI.createNewTask(todoListID, title)
        dispatch(createNewTaskAC(todoListID, res.data.data.item))
    } catch (e) {
        console.log(e)
    }

}



