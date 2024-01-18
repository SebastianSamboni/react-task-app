import { createContext, useState } from "react"
import { createTaskRequest, getTasksRequest } from '../api/task'

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
        } catch (error) {
            console.log(error)
        } 
    }

    const createTask = async task => {
        const res = await createTaskRequest(task)
        console.log(res)
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                getTasks,
                createTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}