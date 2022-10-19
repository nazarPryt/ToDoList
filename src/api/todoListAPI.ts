import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    headers: {
        'api-key': '52ccabf3-0184-4f40-b001-5997202bec15'
    }
})


export const todoListAPI = {
    getTodolist() {
        return instance.get<ToDoListType[]>('/todo-lists')},
    deleteTodoList(todoListID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListID}`)},
    createNewToDoList(title: string) {
        return instance.post<ResponseType<{item: ToDoListType}>>(`/todo-lists`,{title})},
    updateToDoList (todoListID: string, title: string) {
        return instance.put(`/todo-lists/${todoListID}`,{title})},
    getTasks(todoListID: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todoListID}/tasks`)},
    createNewTask(todoListID: string, title: string) {
        return instance.post<PostTaskResponseType<{item: TaskType}>>(`/todo-lists/${todoListID}/tasks`, {title})
    }

}



///////   ToDoLists Types     ///////
export type ToDoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

///////   Tasks Types     ///////
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    totalCount: number
    error: string
    Items: TaskType[]
}
type PostTaskResponseType<D = {}> = {
    fieldsErrors : string[]
    messages: string []
    resultCode: number
    data: D
}