import {TaskPriorities, TaskStatuses, TaskType, todoListAPI, updateTaskModelType} from "../../api/todoListAPI";
import {AppThunkType} from "../../store/store";
import {addNewTodoListAC, changeToDoListEntityStatusAC, deleteTodoListAC, setToDoListsAC} from "./todolist-reducer";
import {ChangeAppStatusAC, SetAppErrorAC} from "./app-reducer";
import {AxiosError} from "axios";
import {HandleServerAppError, HandleServerNetworkError} from "../../utils/error-utils";

export type taskActionType =
    | ReturnType<typeof setToDoListsAC>
    | ReturnType<typeof addNewTodoListAC>
    | ReturnType<typeof deleteTodoListAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof createNewTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>


export type taskObjType = {
    [key: string]: Array<TaskType>
}
const initialState: taskObjType = {}

export const taskReducer = (state = initialState, action: taskActionType): taskObjType => {
    switch (action.type) {
        case "DELETE-TASK":  //  ok
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].filter(task => task.id !== action.taskId)]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, ...action.model}
                    : task)}
        case "ADD-NEW-TO-DO-LIST":
            return {...state, [action.toDoList.id]: []}    // ok
        case "DELETE-TO-DO-LIST":
            delete state[action.idTodo]
            return {...state}
        case 'SET-TASKS': //  ok
            return {...state, [action.todoListID]: action.tasks}
        case "CREATE-NEW-TASK":  //  ok
            const neWTask = action.task
            return {...state, [action.task.todoListId]: [neWTask, ...state[action.todoListID]]}
        case 'SET-TO-DO-LISTS':  //  ok
            const copyState = {...state}
            action.ToDoLists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        default:
            return state
    }
}


export const deleteTaskAC = (todolistId: string, taskId: string) => ({type: 'DELETE-TASK' as const, todolistId, taskId})
export const createNewTaskAC = (todoListID: string, task: TaskType) => ({
    type: 'CREATE-NEW-TASK' as const,
    todoListID,
    task
})
export const setTasksAC = (tasks: TaskType[], todoListID: string) => ({type: 'SET-TASKS' as const, todoListID, tasks})
export const updateTaskAC = (todolistId: string, taskId: string, model: updateDomainTaskModelType) => ({
    type: 'UPDATE-TASK' as const,
    todolistId,
    taskId,
    model
})


///////   Thunk     ///////
export const setTasksTC = (todoListID: string): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC('loading'))
        const res = await todoListAPI.getTasks(todoListID)
        dispatch(ChangeAppStatusAC('succeed'))
        dispatch(setTasksAC(res.data.items, todoListID))
    } catch (e) {
        dispatch(ChangeAppStatusAC('failed'))
        console.warn(e)
    }
}
export const createNewTaskTC = (todoListID: string, title: string): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC('loading'))
        dispatch(changeToDoListEntityStatusAC(todoListID, 'loading'))
        const res = await todoListAPI.createNewTask(todoListID, title)
        if (res.data.resultCode === 0) {
            dispatch(ChangeAppStatusAC('succeed'))
            dispatch(createNewTaskAC(todoListID, res.data.data.item))
        } else {
            HandleServerAppError(dispatch, res.data)
        }
        dispatch(ChangeAppStatusAC('succeed'))
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC('loading'))
        const res = await todoListAPI.deleteTask(todolistId, taskId)
        dispatch(ChangeAppStatusAC('succeed'))
        dispatch(deleteTaskAC(todolistId, taskId))
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }
}
type updateDomainTaskModelType = {
    description?: string
    title?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, model: updateDomainTaskModelType): AppThunkType =>
    async (dispatch, getState) => {
        const task = getState().task[todolistId].find(tas => tas.id === taskId)
        if (!task) {
            SetAppErrorAC('can not find task !!!')
            throw new Error('can not find task !!!')
            return
        }
        const TaskAPI: updateTaskModelType = {
            completed: task.completed,
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...model
        }
        try {
            const res = await todoListAPI.updateTask(todolistId, taskId, TaskAPI)
            dispatch(updateTaskAC(todolistId, taskId, model))
        } catch (e) {
            const error = e as AxiosError | Error
            HandleServerNetworkError(dispatch, error)
        }
    }

