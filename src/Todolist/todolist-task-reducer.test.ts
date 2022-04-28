import {taskObjType, toDoListsType} from "../App";
import {addNewTodoListAC, todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";

test('test to check if added ID in TASK and TODOLIST is the same', ()=>{
    const startTodolist: toDoListsType[] = []
    const startTasks: taskObjType = {}

    const action = addNewTodoListAC('new todolist')

    const endTodolist = todolistReducer(startTodolist, action)
    const endTasks = taskReducer(startTasks, action)

/*****************************************************************************************************************/

    const allKeys = Object.keys(endTasks)
    const idFromTask = allKeys[0]


    const idFromTodoList = endTodolist[0].id

    expect(idFromTask).toBe(action.idTodo)
    expect(idFromTodoList).toBe(action.idTodo)
})