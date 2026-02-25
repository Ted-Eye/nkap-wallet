import React from 'react'
import UserForm from '../components/user/UserForm'
import { Container } from '@mui/material'


export default function LoginPage() {
    return (
        <Container>
            <UserForm route="/user/token/" method='login'/>
        </Container>
    )
}
