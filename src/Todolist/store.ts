import {combineReducers} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistReducer} from "./todolist-reducer";
import { legacy_createStore as createStore} from 'redux'

const rootReducer = combineReducers({
    task: taskReducer,
    toDoList: todolistReducer
})
export type rootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)


// @ts-ignore
window.store = store




