import {AppThunkType} from "../../store/store";
import {authAPI} from "../../api/authAPI";
import {HandleServerAppError, HandleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {setIsLoggedInAC} from "../../auth/authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed'
export type appReducerActionType =
    | ReturnType<typeof ChangeAppStatusAC>
    | ReturnType<typeof SetAppErrorAC>
    | ReturnType<typeof IsInitializedAC>

type appReducerStateType = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}
const initialState: appReducerStateType = {
    status: "idle",
    error: null,
    isInitialized: false,
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        ChangeAppStatusAC (state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        SetAppErrorAC (state, action: PayloadAction<{message: string | null}>) {
            state.error = action.payload.message
        },
        IsInitializedAC (state, action: PayloadAction<{value: boolean}>) {
            state.isInitialized = action.payload.value
        }
    }
})
export const {ChangeAppStatusAC, IsInitializedAC, SetAppErrorAC} = slice.actions
export const appReducer = slice.reducer

export const initializeAppTC = (): AppThunkType => async dispatch => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(IsInitializedAC({value: true}))
        } else {
            HandleServerAppError(dispatch, res.data)
            dispatch(IsInitializedAC({value: true}))
        }
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
        dispatch(IsInitializedAC({value: true}))
    }

}