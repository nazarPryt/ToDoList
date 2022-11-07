import {AppThunkType} from "../store/store";
import {ChangeAppStatusAC, IsInitializedAC} from "../components/Todolist/app-reducer";
import {HandleServerAppError, HandleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {authAPI, authDataRequestType} from "../api/authAPI";


type authStateType = typeof authInitialState

const authInitialState = {
    isLoggedIn: false,
}
export type authReducerActionType =
    | ReturnType<typeof setIsLoggedInAC>


export const authReducer = (state: authStateType = authInitialState, action: authReducerActionType): authStateType => {
    switch (action.type) {
        case "AUTH-REDUCER/SET-LOGGED-IN":
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}

///////////  Actions  //////////
export const setIsLoggedInAC = (value: boolean) => ({type: 'AUTH-REDUCER/SET-LOGGED-IN' as const, value})

///////////  Thunks  //////////
export const loginTC = (data: authDataRequestType): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC('loading'))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(ChangeAppStatusAC('succeed'))
        } else {
            HandleServerAppError(dispatch, res.data)
        }
        dispatch(ChangeAppStatusAC('failed'))
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }
}

///////////  Types  //////////

