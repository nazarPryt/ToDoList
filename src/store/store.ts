import {combineReducers} from "redux";
import {legacy_createStore as createStore} from 'redux'
import {tasksReducer} from "./tasksReducer";
import {todolistReducer} from "./todolistReducer";


const RootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})
export type RootReducerType = ReturnType<typeof RootReducer>

export const store = createStore(RootReducer)


// @ts-ignore
window.store = store