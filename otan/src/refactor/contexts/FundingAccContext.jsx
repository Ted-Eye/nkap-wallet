import React, { createContext, useContext, useEffect, useState } from 'react'
import { json } from 'zod';
import {MODAL_TYPES} from '../lib/konstants/Defaults';

const FundingContext = createContext();
export const FundingProvider=({children})=> {
    const [accBalance, setAccBalance] = useState(()=>{
        const savedBalance = JSON.parse(localStorage.getItem('funding balance'))
        return savedBalance || 0
    })
    const type = MODAL_TYPES
    const handleTopUpNCashOut = (data)=>{
        if(data.type===type.modes.credit){
            const newAccBalance = accBalance + data.amount
            setAccBalance(newAccBalance)
        }else {
            const newAccBalance = accBalance - data.amount
            setAccBalance(newAccBalance)
        }
    }   
    useEffect(()=>{
        localStorage.setItem('funding balance', JSON.stringify(accBalance))
    },[accBalance]);

    const value = {accBalance, handleTopUpNCashOut}
    return (
        <FundingContext.Provider value={value}>
            {children}
        </FundingContext.Provider>
    )
};

export const useFunding = () => {
    return useContext(FundingContext)
}
