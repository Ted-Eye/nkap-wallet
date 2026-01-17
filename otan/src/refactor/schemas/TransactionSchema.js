import {z} from 'zod';
import dayjs from 'dayjs';
import {INCOME_CATEGORIES, EXPENSE_CATEGORIES} from '../../refactor/lib/konstants/Defaults'

const sources = INCOME_CATEGORIES.map((s)=>{return s.value})
const motives = EXPENSE_CATEGORIES.map((exp)=>{return exp.value})
export const transactionSchema = z.object({
	id: z.string().min(1, {message: 'Transaction ID is required'}),
	type: z.enum(['Cash-in', 'Cash-out']),
	amount: z.coerce.number().min(100, {message: 'Amount must be equal to or greater than 100'}),
	motive: z.enum([...sources, ...motives]),
	note: z.string().min(4, {message: 'Must NOT be less than 4 characters'}),
	date: z.coerce.date(),
	wallet: z.string().min(1, {message: 'Associated wallet is required'}),
	walletID: z.string().min(1, {message: 'Associated wallet ID is required'})
});

export const transactionDefaultValues = {
	id: '',
	type: 'Cash-in', 
	amount: 0, 
	motive: 'Shopping', 
	note: 'Purchased some panties', 
	date: new Date(),
	wallet: '',
	walletID: ''
};