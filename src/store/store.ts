import {combineReducers} from "redux";
import {taskActionType, taskReducer} from "../components/Todolist/task-reducer";
import {todolistActionType, todolistReducer} from "../components/Todolist/todolist-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, appReducerActionType} from "../components/Todolist/app-reducer";
import {authReducer, authReducerActionType} from "../auth/authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    app: appReducer,
    task: taskReducer,
    toDoList: todolistReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type rootReducerType = ReturnType<typeof rootReducer>
export type AppActionsType = taskActionType | todolistActionType | appReducerActionType | authReducerActionType
export type AppDispatchType = ThunkDispatch<rootReducerType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, rootReducerType, unknown, AppActionsType>

// @ts-ignore
window.store = store




