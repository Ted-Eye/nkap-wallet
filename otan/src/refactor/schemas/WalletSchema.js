import {z} from 'zod';
import dayjs from 'dayjs';


export const walletSchema = z.object({
    id: z.string(),
	title: z.string().min(4, {message: 'Must NOT be less than 4 characters'}),
	accountBalance: z.coerce.number().min(0),
	monthlyLimit: z.coerce.number().min(0).max(1000000, {message: 'Monthly limit cannot exceed 1,000,000'}),
	transactions: z.array(z.object()).default([]),
	status: z.string()
	// accountType: z.enum(['Savings account', 'Current account']),
    // minBalance: z.coerce.number().min(0),
	// revenues: z.array(z.object()).default([]),
	// expenses: z.array(z.object()).default([]),
	// note: z.string().default('')
})

export const walletDefaultValues = {
				id: '',
				title: "",
				accountBalance: 0,
				monthlyLimit: 0,
				transactions: [],
				// revenues: [],
				// expenses: [],
				status: 'No transactions yet'
};
