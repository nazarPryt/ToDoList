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
        return instance.get('/todo-lists')},
    deleteTodoList(todoListID: string) {
        return instance.delete(`/todo-lists${todoListID}`)},
    createNewToDoList(todoListID: string, title: string) {
        return instance.post(`/todo-lists${todoListID}`,{title})},
    updateToDoList (todoListID: string, to: {title: 'bla'}) {
        return instance.put(`/todo-lists${todoListID}`, to)},



}