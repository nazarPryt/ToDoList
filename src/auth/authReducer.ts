import {AppThunkType} from "../store/store";
import {ChangeAppStatusAC} from "../components/Todolist/app-reducer";
import {HandleServerAppError, HandleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {authAPI, authDataRequestType} from "../api/todoListAPI";

type authStateType = typeof authInitialState

const authInitialState = {
    isLoggedIn: false
}
export type authReducerActionType = ReturnType<typeof setIsLoggedInAC>

export const authReducer = (state: authStateType = authInitialState, action: authReducerActionType): authStateType => {
    switch (action.type) {
        case "AUTH-REDUCER/SET-LOGGED-IN":
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}

///////////  Actions  //////////
const setIsLoggedInAC = (value: boolean) => ({type: 'AUTH-REDUCER/SET-LOGGED-IN', value})


///////////  Thunks  //////////
export const setAuthorizationTC = (data: authDataRequestType): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC('loading'))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(ChangeAppStatusAC('succeed'))
        } else {
            HandleServerAppError(dispatch, res.data)
        }
        dispatch(ChangeAppStatusAC('succeed'))
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }
}
export const initializeAppTC = (): AppThunkType => async dispatch => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
            HandleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }

}

///////////  Types  //////////

