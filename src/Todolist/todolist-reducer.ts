import {todoListAPI, ToDoListType} from "../api/todoListAPI";
import {AppThunkType} from "./store";


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
            return action.ToDoLists.map(td => {return {...td, filter: 'all'}})
        default:
            return state
    }
}

export const changeFilterTaskAC = (idTodo: string, value: FilterType) => ({
    type: 'CHANGE-FILTER-TASK',
    idTodo,
    value
}) as const
export const changeTitleToDoAC = (idTodo: string, newValue: string) => ({
    type: 'CHANGE-TITLE-TODO-LIST',
    idTodo,
    newValue
}) as const
export const deleteTodoListAC = (idTodo: string) => ({type: 'DELETE-TO-DO-LIST', idTodo}) as const
export const addNewTodoListAC = (toDoList: ToDoListType) => ({type: "ADD-NEW-TO-DO-LIST", toDoList}) as const //подивитись чи треба відправляти таску чи title
export const setToDoListsAC = (ToDoLists: ToDoListType[]) => ({type: 'SET-TO-DO-LISTS', ToDoLists}) as const



///////   Thunk     ///////
export const fetchToDoListsTC = (): AppThunkType => async dispatch => {
    try {
        const res = await todoListAPI.getTodolist()
        dispatch(setToDoListsAC(res.data.data))
    } catch (e) {
        console.warn(e)
    }
}

export const addNewTodoListTC = (title: string): AppThunkType => async dispatch => {
    try {
        const res = await todoListAPI.createNewToDoList(title)
        dispatch(addNewTodoListAC(res.data.data.item))
    } catch (e) {
        console.log(e)
    }
}
export const deleteTodoListTC = (todolistID: string): AppThunkType => async dispatch => {
    try {
        const res = todoListAPI.deleteTodoList(todolistID)
        dispatch(deleteTodoListAC(todolistID))
    } catch (e) {
        console.log(e)
    }
}





///////   Types     ///////
export type FilterType = 'all' | 'completed' | 'active'

export type ToDoListDomainType = ToDoListType & {
    filter: FilterType
}


