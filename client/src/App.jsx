import { BrowserRouter, Routes, Route } from 'react-router-dom'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<h1>Home page</h1>} />
                    <Route path='/login' element={<LoginPage/>} />
                    <Route path='/register' element={<RegisterPage/>} />
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
