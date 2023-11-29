import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<h1>Home page</h1>} />
                    <Route path='/login' element={<h1>Login</h1>} />
                    <Route path='/register' element={<h1>Register</h1>} />
                    <Route path='/tasks' element={<h1>Tasks Page</h1>} />
                    <Route path='/add-task' element={<h1>New Task</h1>} />
                    <Route path='/' element={<h1>Update Task</h1>} />
                    <Route path='/profile' element={<h1>Profile</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
