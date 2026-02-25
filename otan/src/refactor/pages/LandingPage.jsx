import { Box, Container, Typography } from '@mui/material'
import React from 'react';
import {FediverseLogoIcon, 
    NotepadIcon, TrendUpIcon, 
    ShieldCheckIcon, PaperPlaneTiltIcon} from '@phosphor-icons/react'
import HeroSection from '../components/pageLegos/landing/HeroSection';

export default function LandingPage() {
    const solutions = ['Manage all your financial transactions in one place', 'Keep track of your cash flow', 'Enhance your knowledge on financial literacy', 'Make secure online payments from trusted merchants', 'Send and receive money accross the country and abroad']
    return (
        <Container sx={{pt: 8}}>
            <HeroSection />
        </Container>
    )
}
