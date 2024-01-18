import { createContext, useState } from "react"

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    const createTask = async task => {
        console.log(task)
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}