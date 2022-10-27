import {applyMiddleware, combineReducers} from "redux";
import {taskActionType, taskReducer} from "./task-reducer";
import {todolistActionType, todolistReducer} from "./todolist-reducer";
import { legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, appReducerActionType} from "./app-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    task: taskReducer,
    toDoList: todolistReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type rootReducerType = ReturnType<typeof rootReducer>
export type AppActionsType = taskActionType | todolistActionType | appReducerActionType
export type AppDispatchType = ThunkDispatch<rootReducerType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, rootReducerType, unknown, AppActionsType>

// @ts-ignore
window.store = store




