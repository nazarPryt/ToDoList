import {taskID_1, taskID_2, taskID_3} from "./todolistReducer";
import {changeTaskStatusAC, tasksDataType, tasksReducer} from "./tasksReducer";


let startState: tasksDataType = {}

beforeEach(() =>{
    startState = {
        ['first']:
            [
                {id: '1', isDone: true, subject: "HTML&CSS"},
                {id: '2', isDone: true, subject: "JS"},
                {id: '3', isDone: false, subject: "React"},
                {id: '4', isDone: false, subject: "Redux"}
            ],
        ['second']:
            [
                {id: '1', isDone: true, subject: "Clean my house"},
                {id: '2', isDone: true, subject: "Have a rest"}
            ],
        ['third']:
            [
                {id: '1', isDone: true, subject: "Butter"},
                {id: '2', isDone: true, subject: "Milk"}
            ]
    }
})

test('test to CHANGE-TASK-STATUS', () => {
    const action = changeTaskStatusAC('first','1')
    const endState = tasksReducer (startState, action)

    expect(endState['first'][0].isDone).toBeFalsy()
    expect(endState['second'][0].isDone).toBeTruthy()
    expect(endState['third'][0].isDone).toBeTruthy()
})