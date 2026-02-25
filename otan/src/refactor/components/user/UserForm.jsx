import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {defaultUser} from '../../schemas/UserSchema'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, CircularProgress, FormControl, TextField, Typography } from '@mui/material'
import api from '../../../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../lib/konstants/Defaults'
import { useAuth } from '../../contexts/AuthContext'
import LoadingIndicator from '../global/LoadingIndicator'

export default function UserForm({route, method}) {
    // const methods = useForm({
    //     resolver: zodResolver,
    //     defaultValues: defaultUser
    // })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [loading, setLoading] = useState(false)
    const {login, register, loading} = useAuth()
    const navigate = useNavigate()
    const name = method === 'login'? 'Login' : 'Register'

    const handleSubmit = (e) => {
        e.preventDefault()
        if (method === 'login') {
            login({username, password})
        } else {
            register({username, password})
        }
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault() 
    //     try {
    //         // const res = await api.post(route, {username, password})
    //         if(method==='login') {
    //             login({username, password})
    //             // navigate('/home')
                
    //         } else {

    //             register({username, password})
    //             // navigate('/login')
    //         }
    //     } 
    //     catch (error) {
    //         if(error.code === "ERR_BAD_REQUEST") {
    //             alert('Invalid username or password')
                

    //             console.error('API Error:', error) 
    //             alert(error.message || 'An error occurred')
    //         }
    //     } 
    // }
    
    return (
        <Box component='form' onSubmit={handleSubmit}
        mt={26}
        p={4}
        sx={{bgcolor: '#fefdfaff', borderRadius: 1}}
        >
            <Typography variant='h4' gutterBottom>{name}</Typography>
            <TextField 
                label="Username"
                value={username}
                type='text'
                placeholder='Enter username'
                onChange={(e)=>{setUsername(e.target.value)}}
                fullWidth
                margin='normal'
            />
            <TextField 
                label="Password"
                value={password}
                type='password'
                placeholder='Enter password'
                onChange={(e)=>{setPassword(e.target.value)}}
                fullWidth
                margin='normal'
            />
            <Button type='submit' 
            variant='contained' 
            sx={{mt:2, 
                bgcolor: '#eda113ff',textTransform: 'none', borderRadius: 5}} 
            disabled={loading}
            fullWidth
            >{name }</Button>
            <Typography variant='subtitle2' mt={2}>
                {
                    name==='Login'? "Don't have an account ? ...": "Already have an account ? ..."
                }
            </Typography>
            <Link to={name==='Login'? '/register' : '/login'}>
                {name==='Login'? 'Register': 'Login'}
            </Link>
        </Box>
    )
}
