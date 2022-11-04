export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed'
export type appReducerActionType =
    | ReturnType<typeof ChangeAppStatusAC>
    | ReturnType<typeof SetAppErrorAC>
type appReducerStateType = {
    status: RequestStatusType
    error: null | string
}
const initialState: appReducerStateType = {
    status: "idle",
    error: null,
}
export const appReducer = (state: appReducerStateType = initialState, action: appReducerActionType): appReducerStateType => {
    switch (action.type) {
        case "appReducer/CHANGE-APP-STATUS":
            return {...state, status: action.status}
        case "appReducer/SET-APP-ERROR":
            return {...state, error: action.message}



        default:
            return state
    }
}

export const ChangeAppStatusAC = (status: RequestStatusType) => ({
    type: 'appReducer/CHANGE-APP-STATUS' as const,
    status
})
export const SetAppErrorAC = (message: string | null) => ({type: 'appReducer/SET-APP-ERROR' as const, message})




























