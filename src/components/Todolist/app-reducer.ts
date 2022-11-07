import {AppThunkType} from "../../store/store";
import {authAPI} from "../../api/authAPI";
import {HandleServerAppError, HandleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {setIsLoggedInAC} from "../../auth/authReducer";

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
export const appReducer = (state: appReducerStateType = initialState, action: appReducerActionType): appReducerStateType => {
    switch (action.type) {
        case "appReducer/CHANGE-APP-STATUS":
            return {...state, status: action.status}
        case "appReducer/SET-APP-ERROR":
            return {...state, error: action.message}
        case "AUTH-REDUCER/SET-INITIALIZED":
            return {...state, isInitialized: action.value}


        default:
            return state
    }
}

export const ChangeAppStatusAC = (status: RequestStatusType) => ({
    type: 'appReducer/CHANGE-APP-STATUS' as const,
    status
})
export const SetAppErrorAC = (message: string | null) => ({type: 'appReducer/SET-APP-ERROR' as const, message})
export const IsInitializedAC = (value: boolean) => ({type: 'AUTH-REDUCER/SET-INITIALIZED' as const, value})




export const initializeAppTC = (): AppThunkType => async dispatch => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(IsInitializedAC(true))
        } else {
        HandleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        const error = e as AxiosError | Error
        HandleServerNetworkError(dispatch, error)
    }

}