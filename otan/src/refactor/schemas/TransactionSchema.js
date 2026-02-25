import {maxLength, z} from 'zod';
import dayjs from 'dayjs';
import {INCOME_SOURCES, EXPENSE_MOTIVES, TRANSACTION_TYPES} from '../../refactor/lib/konstants/Defaults'

// const sources = INCOME_CATEGORIES.map((s)=>{return s.value})
// const motives = EXPENSE_CATEGORIES.map((exp)=>{return exp.value})

export const transactionSchema = z.object({
	// id: z.string().min(1, {message: 'Transaction ID is required'}),
	transactionType: z.enum([...TRANSACTION_TYPES]),
	receiver_name: z.string().max(20).min(4, {message: 'Invalid username'}),
	amount: z.coerce.number().min(100, {message: 'Amount must be equal to or greater than 100'}),
	motive: z.enum([...INCOME_SOURCES, ...EXPENSE_MOTIVES, '']),
	note: z.string(),
	// timestamp: z.coerce.date(),
	wallet: z.string(),
	origin_id: z.string(),
	dest_id: z.string()
	// walletID: z.string().min(1, {message: 'Associated wallet ID is required'})
});

export const transactionDefaultValues = {
	// id: '',
	receiver_name: 'receiver',
	transactionType: 'Send', 
	amount: 0, 
	motive: '', 
	note: '', 
	// timestamp: new Date(),
	wallet: '',
	origin_id: '',
	dest_id: ''
	// walletID: ''
};