import { useForm } from 'react-hook-form'
import { registerRequest } from '../api/auht'

const RegisterPage = () => {

    /*
        useForm() -> Hook para formularios
        register -> Método para asignar names y validaciones a un form
        handleSubmit -> Método por defecto para forms de tipo onSubmit
    */
    const { register, handleSubmit } = useForm()
    
    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            <form onSubmit={handleSubmit(async values => {
                const res = await registerRequest(values)
            })}>
                <input type="text"
                    {...register('username', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Username'
                />
                <input type="email"
                    {...register('email', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Email'
                />
                <input type="password" name="password"
                    {...register('password', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Password'
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage
