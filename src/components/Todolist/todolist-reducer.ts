import {todoListAPI, ToDoListType} from "../../api/todoListAPI";
import {AppThunkType} from "../../store/store";
import {ChangeAppStatusAC, RequestStatusType} from "./app-reducer";
import {AxiosError} from "axios";
import {HandleServerAppError, HandleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type todolistActionType =
    | ReturnType<typeof changeTitleToDoAC>
    | ReturnType<typeof changeFilterTaskAC>
    | ReturnType<typeof deleteTodoListAC>
    | ReturnType<typeof addNewTodoListAC>
    | ReturnType<typeof setToDoListsAC>
    | ReturnType<typeof changeToDoListEntityStatusAC>

const initialState: ToDoListDomainType[] = []

const todolistSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        changeTitleToDoAC (state, action: PayloadAction<{idTodo: string, newValue: string}>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.idTodo)
            if(index > -1) {
                state[1].title = action.payload.newValue
            }
        },
        changeFilterTaskAC (state, action: PayloadAction<{idTodo: string, value: FilterType}>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.idTodo)
            if (index > -1) {
                state[index].filter = action.payload.value
            }
        },
        deleteTodoListAC (state, action: PayloadAction<{idTodo: string}>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.idTodo)
            if(index > -1){
                state.splice(index, 1)
            }
        },
        addNewTodoListAC (state, action: PayloadAction<{toDoList: ToDoListType}>) {
            state.unshift({...action.payload.toDoList, filter: 'all', EntityStatus: 'idle'})
        },
        setToDoListsAC (state, action: PayloadAction<{ToDoLists: ToDoListType[]}>) {
            return action.payload.ToDoLists.map(todolist => ({...todolist, filter: 'all', EntityStatus: 'idle'}))
        },
        changeToDoListEntityStatusAC (state, action: PayloadAction<{todoListID: string, status: RequestStatusType}>) {
            const index = state.findIndex( todolist => todolist.id === action.payload.todoListID)
            if(index > -1){
                state[index].EntityStatus = action.payload.status
            }
        }
    }
})
export const todolistReducer = todolistSlice.reducer
// export const todolistReducer = (state = initialState, action: todolistActionType): ToDoListDomainType[] => {
//     switch (action.type) {
//         case "CHANGE-FILTER-TASK":
//             return [...state.map(td => td.id === action.idTodo ? {...td, filter: action.value} : td)]
//         case "CHANGE-TITLE-TODO-LIST":
//             return [...state.map(td => td.id === action.idTodo ? {...td, title: action.newValue} : td)]
//         case "DELETE-TO-DO-LIST":
//             return [...state.filter(td => td.id !== action.idTodo)]
//         case "ADD-NEW-TO-DO-LIST":
//             let newTodoList: ToDoListDomainType = {...action.toDoList, filter: 'all', EntityStatus: 'idle'}
//             return [newTodoList, ...state]
//         case 'SET-TO-DO-LISTS':
//             return action.ToDoLists.map(td => ({...td, filter: 'all', EntityStatus: 'idle'}))
//         case 'SET-TODOLIST-ENTITY-STATUS':
//             return [...state.map(td => td.id === action.todoListID ? {...td, EntityStatus: action.status} : td)]
//         default:
//             return [...state]
//     }
// }
///////   Actions     ///////
export const {addNewTodoListAC,changeFilterTaskAC,changeTitleToDoAC,changeToDoListEntityStatusAC,deleteTodoListAC,setToDoListsAC} = todolistSlice.actions

///////   Thunk     ///////
export const fetchToDoListsTC = (): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC({status: 'loading'}))
        const res = await todoListAPI.getTodolist()
        // dispatch(ChangeAppStatusAC('loading'))
        dispatch(setToDoListsAC({ToDoLists: res.data}))
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }
}
export const addNewTodoListTC = (title: string): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC({status: 'loading'}))
        const res = await todoListAPI.createNewToDoList(title)
        if (res.data.resultCode === 0) {
            dispatch(ChangeAppStatusAC({status: 'succeed'}))
            dispatch(addNewTodoListAC({toDoList: res.data.data.item}))
        } else {
            HandleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }
}
export const deleteTodoListTC = (todolistID: string): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC({status: 'loading'}))
        const res = await todoListAPI.deleteTodoList(todolistID)
        dispatch(ChangeAppStatusAC({status: 'succeed'}))
        dispatch(deleteTodoListAC({idTodo: todolistID}))
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }
}
export const updateToDoListTC = (todoListID: string, title: string): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC({status: 'loading'}))
        const res = todoListAPI.updateToDoList(todoListID, title)
        dispatch(ChangeAppStatusAC({status: 'succeed'}))
        dispatch(changeTitleToDoAC({idTodo: todoListID, newValue: title}))
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }
}


///////   Types     ///////
export type FilterType = 'all' | 'completed' | 'active'

export type ToDoListDomainType = ToDoListType & {
    filter: FilterType
    EntityStatus: RequestStatusType
}


