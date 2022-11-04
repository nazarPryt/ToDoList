import {ChangeAppStatusAC, SetAppErrorAC} from "../components/Todolist/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todoListAPI";


export const HandleServerAppError = <D>(dispatch: ErrorUtilsDispatcType, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(SetAppErrorAC(data.messages[0]))
    } else {
        dispatch(SetAppErrorAC('Some Error occurred!!'))
    }
    dispatch(ChangeAppStatusAC('failed'))
}

export const HandleServerNetworkError = (dispatch: ErrorUtilsDispatcType, error: {message: string}) => {
    dispatch(ChangeAppStatusAC('failed'))
    dispatch(SetAppErrorAC(error.message))
}
type ErrorUtilsDispatcType = Dispatch<ReturnType<typeof ChangeAppStatusAC> | ReturnType<typeof SetAppErrorAC>>