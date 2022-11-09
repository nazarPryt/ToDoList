import {AppThunkType} from "../store/store";
import {ChangeAppStatusAC} from "../components/Todolist/app-reducer";
import {HandleServerAppError, HandleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {authAPI, authDataRequestType} from "../api/authAPI";
import {createSlice} from "@reduxjs/toolkit";

const authInitialState = {
    isLoggedIn: false,
}
export type authReducerActionType =
    | ReturnType<typeof setIsLoggedInAC>

const auth = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setIsLoggedInAC: (state, action) => {
            state.isLoggedIn = action.payload
        }
    }
})
export const authReducer = auth.reducer
export const {setIsLoggedInAC} = auth.actions


///////////  Thunks  //////////
export const loginTC = (data: authDataRequestType): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC({status: 'loading'}))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(ChangeAppStatusAC({status: 'succeed'}))
        } else {
            HandleServerAppError(dispatch, res.data)
        }
        dispatch(ChangeAppStatusAC({status: 'failed'}))
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }
}
export const logOutTC = (): AppThunkType => async dispatch => {
    try {
        dispatch(ChangeAppStatusAC({status: 'loading'}))
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(ChangeAppStatusAC({status: 'succeed'}))
        } else {
            HandleServerAppError(dispatch, res.data)
        }
        dispatch(ChangeAppStatusAC({status: 'failed'}))
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }
}


