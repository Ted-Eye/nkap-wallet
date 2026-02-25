import {z} from 'zod';

export const userSchema = z.object({
    username: z.string().min(3, {message: 'Enter a valid user name'}),
    password: z.string().min(4, {message: 'password must contain not less than 4 characters'})
})

export const defaultUser = {
    username: '',
    password: ''
}