import React from 'react'
import {z} from 'zod';
import dayjs from 'dayjs';
import {MODAL_TYPES, PAYMENT_METHODS} from '../lib/konstants/Defaults'

const methods = PAYMENT_METHODS.map((m)=>{
    return m.value
})
export const FundingAccSchema = z.object({
        id: z.string().min(1, {message: 'Transaction ID is required'}),
        type: z.enum([MODAL_TYPES.modes.credit, MODAL_TYPES.modes.debit]),
        amount: z.coerce.number().min(100, {message: 'Amount must be equal to or greater than 100'}),
        paymentMethod: z.enum([...methods]),
        date: z.coerce.date()
});

export const FundingAccDefaults = {
    id: '',
    type: MODAL_TYPES.modes.credit,
    amount: 100,
    paymentMethod: PAYMENT_METHODS[0].value,
    date: new Date(),
}