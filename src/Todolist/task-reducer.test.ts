import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, taskReducer} from "./task-reducer";
import {taskObjType} from "../App";

let taskID_1: string
let taskID_2: string
let taskID_3: string

let startState: taskObjType

beforeEach(() => {
    taskID_1 = v1()
    taskID_2 = v1()
    taskID_3 = v1()

    startState = {
        [taskID_1]:
            [
                {id: '1', isDone: true, subject: "HTML&CSS"},
                {id: '2', isDone: true, subject: "JS"},
                {id: '3', isDone: false, subject: "React"},
                {id: '4', isDone: false, subject: "Redux"}
            ],
        [taskID_2]:
            [
                {id: '1', isDone: true, subject: "Clean my house"},
                {id: '2', isDone: true, subject: "Have a rest"}
            ],
        [taskID_3]:
            [
                {id: '1', isDone: true, subject: "Butter"},
                {id: '2', isDone: true, subject: "Milk"}
            ]
    }
})


test('test for DELETE TASK', () => {
    const action = deleteTaskAC(taskID_1, '1')
    const endState = taskReducer(startState, action)

    expect(endState[taskID_1].length).toBe(3)
    expect(endState[taskID_1][0].id).toBe('2')
});


test('test for ADD  TASK', () => {
    const action = addTaskAC(taskID_1, 'nazar')
    const endState = taskReducer(startState, action)

    expect(endState[taskID_1].length).toBe(5)
    expect(endState[taskID_1][0].subject).toBe('nazar')
    expect(endState[taskID_2][0].subject).toBe('Clean my house')
})

test('test for CHANGE TASK STATUS', () => {
    const action = changeTaskStatusAC(taskID_1, '1')
    const endState = taskReducer(startState, action)
    expect(endState[taskID_1][0].isDone).toBeFalsy()
    expect(endState[taskID_2][0].isDone).toBeTruthy()

});

test('test for CHANGE TASK TITLE', () => {
    const action = changeTaskTitleAC(taskID_1, '1', 'nazar')
    const endState = taskReducer(startState, action)
    expect(endState[taskID_1][0].subject).toBe('nazar')
    expect(endState[taskID_2][0].subject).toBe('Clean my house')


})