import {ToDoListType} from "../api/todoListAPI";


export type actionType =
    | ReturnType<typeof changeTitleToDoAC>
    | ReturnType<typeof changeFilterTaskAC>
    | ReturnType<typeof deleteTodoListAC>
    | ReturnType<typeof addNewTodoListAC>
    | ReturnType<typeof setToDoListsAC>

const initialState: ToDoListDomainType[] = []

export const todolistReducer = (state = initialState, action: actionType): ToDoListDomainType[] => {
    switch (action.type) {
        case "CHANGE-FILTER-TASK":
            return [...state.map(td => td.id === action.idTodo ? {...td, filter: action.value} : td)]
        case "CHANGE-TITLE-TODO-LIST":
            return [...state.map(td => td.id === action.idTodo ? {...td, title: action.newValue} : td)]
        case "DELETE-TO-DO-LIST":
            return [...state.filter(td => td.id !== action.idTodo)]
        case "ADD-NEW-TO-DO-LIST":
            let newTodoList: ToDoListDomainType = action.toDoList
            return [newTodoList, ...state]
        case 'SET-TO-DO-LISTS':
            return action.ToDoLists.map(td => {return{...td, filter: 'all'}})
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
export const addNewTodoListAC = (toDoList: ToDoListDomainType) => ({type: "ADD-NEW-TO-DO-LIST", toDoList}) as const //подивитись чи треба відправляти таску чи title
export const setToDoListsAC = (ToDoLists: ToDoListType[]) => ({type: 'SET-TO-DO-LISTS' as const, ToDoLists})

///////   Types     ///////
export type FilterType = 'all' | 'completed' | 'active'

export type ToDoListDomainType = ToDoListType & {
    filter: FilterType
}


