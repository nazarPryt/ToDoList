import {ChangeAppStatusAC, SetAppErrorAC} from "../components/Todolist/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todoListAPI";


export const HandleServerAppError = <D>(dispatch: ErrorUtilsDispatcType, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(SetAppErrorAC( {message: data.messages[0]}))
    } else {
        dispatch(SetAppErrorAC({message: 'Some Error occurred!!'}))
    }
    dispatch(ChangeAppStatusAC({status: 'failed'}))
}

export const HandleServerNetworkError = (dispatch: ErrorUtilsDispatcType, error: {message: string}) => {
    dispatch(ChangeAppStatusAC( {status: 'failed'}))
    dispatch(SetAppErrorAC({message: error.message}))
}
type ErrorUtilsDispatcType = Dispatch<ReturnType<typeof ChangeAppStatusAC> | ReturnType<typeof SetAppErrorAC>>