import {v1} from "uuid";

export type filterType = 'all' | 'completed' | 'active'
export type todolistDataType = {
    id: string
    title: string
    filter: filterType
}
export const taskID_1 = v1()
export const taskID_2 = v1()
export const taskID_3 = v1()

const initialState: todolistDataType[] = [
    {id: taskID_1, title: "What to do", filter: 'all'},
    {id: taskID_2, title: "Something is done", filter: 'all'},
    {id: taskID_3, title: "Need to buy", filter: 'all'}

]
type actionType = removeToDoListAT | addNewTodolistAT | changeToDoListTitleAT | changeTodolistFilterAT

export const todolistReducer = (state = initialState, action: actionType): todolistDataType[] => {
    switch (action.type) {

        case "REMOVE-TODOLIST":
            let copyState = state.map(el => ({...el}))
            let stateMapd = copyState.filter(el => el.id !== action.todolistID)
            if (stateMapd) {
                return stateMapd
            }
            return state;
        case 'ADD-NEW-TODOLIST':
            let newToDoList: todolistDataType = {id: action.todolistID, title: action.title, filter: 'all'}
            return [newToDoList, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return [...state.map(td => td.id === action.todolistID
                ? {...td, title: action.newValue}
                : td)]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(td => td.id === action.todolistID
                ? {...td, filter: action.newFilterValue}
                : td)]
        default:
            return state
    }
}

export const removeToDoListAC = (todolistID: string) => ({type: 'REMOVE-TODOLIST', todolistID} as const)
type removeToDoListAT = ReturnType<typeof removeToDoListAC>

export const addNewTodolistAC = (title: string) => ({type: 'ADD-NEW-TODOLIST', title, todolistID: v1()} as const)
export type addNewTodolistAT = ReturnType<typeof addNewTodolistAC>

export const changeToDoListTitleAC = (todolistID: string, newValue: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistID,
    newValue
} as const)
export type changeToDoListTitleAT = ReturnType<typeof changeToDoListTitleAC>

export const changeTodolistFilterAC = (todolistID: string, newFilterValue: filterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistID,
    newFilterValue
} as const)
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

