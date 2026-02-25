import { Container } from '@mui/material'
import React from 'react'
import UserForm from '../components/user/UserForm'


export default function RegisterPage() {
    return (
        <Container>
            <UserForm route="/users/" method='register'/>
        </Container>
    )
}
