import { Avatar, Stack, Typography } from '@mui/material';
import dp from '../../../assets/IMG_20200914_130923_325.jpg'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext';

export default function UserAvatar() {
    const {user} = useAuth()
    return (
        <Avatar
            alt={user} >
            </Avatar>
        
    )
}
