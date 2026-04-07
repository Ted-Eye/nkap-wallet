import {z} from 'zod';
import dayjs from 'dayjs';


export const walletSchema = z.object({
    id: z.string(),
	title: z.string().min(4, {message: 'Must NOT be less than 4 characters'}),
	accountBalance: z.coerce.number().min(0),
	accountType: z.string(),
    minBalance: z.coerce.number().min(0),
    monthlyLimit: z.coerce.number().min(0).max(1000000, {message: 'Monthly limit cannot exceed 1,000,000'}),
	transactions: z.array(z.string()).default([]),
	revenues: z.array(z.string()).default([]),
	expenses: z.array(z.string()).default([]),
	status: z.string().default('blank'),
	note: z.string().default('')
})

export const walletDefaultValues = {
				id: '',
				title: "",
				accountType: 'Savings account',
				accountBalance: 0,
				minBalance: 0,
				monthlyLimit: 0,
				transactions: [],
				revenues: [],
				expenses: [],
				status: 'No transactions yet',
				note: ''
};

export const transactionSchema = z.object({
	id: z.string().min(1, {message: 'Transaction ID is required'}),
	type: z.enum(['Cash-in', 'Cash-out']),
	amount: z.coerce.number().min(100, {message: 'Amount must be equal to or greater than 100'}),
	motive: z.enum(['Shopping', 'Medical', 'Food']),
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