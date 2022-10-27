import {todoListAPI, ToDoListType} from "../api/todoListAPI";
import {AppThunkType} from "./store";
import {ChangeAppStatusAC, SetAppErrorAC} from "./app-reducer";
import {AxiosError} from "axios";

export type todolistActionType =
    | ReturnType<typeof changeTitleToDoAC>
    | ReturnType<typeof changeFilterTaskAC>
    | ReturnType<typeof deleteTodoListAC>
    | ReturnType<typeof addNewTodoListAC>
    | ReturnType<typeof setToDoListsAC>

const initialState: ToDoListDomainType[] = []

export const todolistReducer = (state = initialState, action: todolistActionType): ToDoListDomainType[] => {
    switch (action.type) {
        case "CHANGE-FILTER-TASK":
            return [...state.map(td => td.id === action.idTodo ? {...td, filter: action.value} : td)]
        case "CHANGE-TITLE-TODO-LIST":
            return [...state.map(td => td.id === action.idTodo ? {...td, title: action.newValue} : td)]
        case "DELETE-TO-DO-LIST":
            return [...state.filter(td => td.id !== action.idTodo)]
        case "ADD-NEW-TO-DO-LIST":
            let newTodoList: ToDoListDomainType = {...action.toDoList, filter: 'all'}
            return [newTodoList, ...state]
        case 'SET-TO-DO-LISTS':
            return action.ToDoLists.map(td => ({...td, filter: 'all'}))
        default:
            return [...state]
    }
}
///////   Actions     ///////
export const changeFilterTaskAC = (idTodo: string, value: FilterType) => ({type: 'CHANGE-FILTER-TASK', idTodo, value}) as const
export const changeTitleToDoAC = (idTodo: string, newValue: string) => ({
    type: 'CHANGE-TITLE-TODO-LIST',
    idTodo,
    newValue
}) as const
export const deleteTodoListAC = (idTodo: string) => ({type: 'DELETE-TO-DO-LIST', idTodo}) as const
export const addNewTodoListAC = (toDoList: ToDoListType) => ({type: "ADD-NEW-TO-DO-LIST", toDoList}) as const
export const setToDoListsAC = (ToDoLists: ToDoListType[]) => ({type: 'SET-TO-DO-LISTS', ToDoLists}) as const


///////   Thunk     ///////
export const fetchToDoListsTC = (): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC('loading'))
        const res = await todoListAPI.getTodolist()

        dispatch(ChangeAppStatusAC('succeed'))
        dispatch(setToDoListsAC(res.data))

    } catch (e) {
        dispatch(ChangeAppStatusAC('failed'))
        //@ts-ignore
        dispatch(SetAppErrorAC(e.message))
    }
}
export const addNewTodoListTC = (title: string): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC('loading'))
        const res = await todoListAPI.createNewToDoList(title)
        if(res.data.resultCode === 0){
            dispatch(ChangeAppStatusAC('succeed'))
            dispatch(addNewTodoListAC(res.data.data.item))
        } else {
            if(res.data.messages.length){
                dispatch(SetAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(SetAppErrorAC('Some Error occurred!!'))
            }
            dispatch(ChangeAppStatusAC('failed'))
        }
    } catch (e) {
        dispatch(ChangeAppStatusAC('failed'))
        console.warn(e)
    }
}
export const deleteTodoListTC = (todolistID: string): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC('loading'))
        const res = await todoListAPI.deleteTodoList(todolistID)
        dispatch(ChangeAppStatusAC('succeed'))
        dispatch(deleteTodoListAC(todolistID))
    } catch (e) {
        dispatch(ChangeAppStatusAC('failed'))
        console.warn(e)
    }
}
export const updateToDoListTC = (todoListID: string, title: string): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC('loading'))
        const res = todoListAPI.updateToDoList(todoListID, title)
        dispatch(ChangeAppStatusAC('succeed'))
        dispatch(changeTitleToDoAC(todoListID, title))
    } catch (e) {
        dispatch(ChangeAppStatusAC('failed'))
        console.warn(e)
    }
}


///////   Types     ///////
export type FilterType = 'all' | 'completed' | 'active'

export type ToDoListDomainType = ToDoListType & {
    filter: FilterType
}


