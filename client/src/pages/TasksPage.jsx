import { useContext, useEffect } from "react"
import { TaskContext } from "../context/TaskContext"

const TasksPage = () => {
    const { getTasks, tasks } = useContext(TaskContext)

    useEffect(() => {
        getTasks()
    }, [])

    if (tasks.length === 0) return (<h1>No tasks</h1>)
        
    return (
        <div>
            {
                tasks.map(task => (
                    <div key={task._id}>
                        <h1>{task.title}</h1>
                        <p>{task.description}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default TasksPage