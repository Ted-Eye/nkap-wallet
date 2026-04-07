export const DEFAULT_WALLET_VALUES = {
    id: crypto.randomUUID(),
    title: "Whyze-R",
    accountType: 'Savings account',
    accountBalance: 43000,
    minBalance: 0,
    monthlyLimit: 0,
    transactions: [],
    revenues: [],
    expenses: [],
    status: 'blank',
    note: ''
};
export const DEFAULT_WALLETS = [{
    title: "N'kap"
}]


export const RECEIVE_DEFAULTS = {
    // id: crypto.randomUUID(),
    walletID: null,
    type: 'Cash-in',
    amount: 500,
    date: new Date().toISOString().split('T')[0],
    note: ''
};
export const SEND_DEFAULTS = {
    // id: crypto.randomUUID(),
    walletID: null,
    type: 'Cash-out',
    amount: 500,
    date: new Date().toISOString().split('T')[0],
    note: ''
};

export const INITIAL_TRANSACTIONS = [];

export const DEFAULT_SETTINGS = {
    currency: 'CFA',
    language: 'en',
    theme: 'light',
    mode: 'simulation'
};
export const CURRENCIES = [
    {id: 'franc cfa', value: 'CFA'},
    {id: 'us dollar', value: 'USD'},
    {id: 'euro', value: 'Euro'}
];
export const LANGUAGES = [
    {key: 'en', value: 'English'},
    {key: 'fr', value: 'French'},
];
export const APP_MODES = [
    {key: 'sim', value: 'Simulation'},
    {key: 'live', value: 'Live'},
]
export const THEMES = [
    {key: 'lt', value: 'Light'},
    {key: 'dk', value: 'Dark'},
]
export const LOCAL_STORAGE_KEYS = {
    WALLETS: 'wallets',
    TRANSACTIONS: 'transactions',
    SETTINGS: 'settings'
};

export const INCOME_CATEGORIES = [
    {key: 'sal', value: 'Salary'},
    {key: 'biz', value: 'Business'},
    {key: 'inv', value: 'Investments'},
    {key: 'gif', value: 'Gifts'},
    {key: 'oth', value: 'Others'},
    // {key: 'ala', value: 'Allowance'},
];

export const EXPENSE_CATEGORIES = [

    {key: 'ren', value: 'Rents'},
    {key: 'shop', value: 'Shopping'},
    {key: 'med', value: 'Medicals'},
    {key: 'cer', value: 'Ceremony'},
    {key: 'oth', value: 'Other'},
    // {key: 'tran', value: 'Transport/Logistics'},
    // {key: 'fee', value: 'Fees/Subscriptions'},
    // {key: 'lei', value: 'Leisure'},
    // 'Rent',
    // 'Utilities',
    // 'Groceries',
    // 'Transportation',
    // 'Other'
];


// IN SYNC WITH API VALUES: 
export const INCOME_SOURCES = ['salary', 'business', 'investment', 'gift', 'others']
export const EXPENSE_MOTIVES = ['rent', 'shopping', 'medicals', 'ceremony', 'others']
export const TRANSACTION_TYPES = ['Send', 'Receive']

export const PAYMENT_METHODS = [
    {key: 'om', value: 'OM'},
    {key: 'momo', value: 'MoMo'},
    {key: 'cc', value: 'Card Payment'},
    {key: 'pp', value: 'PayPal'},
    {key: 'bank', value: 'Bank Transfer'}
]
export const MODAL_TYPES = {
    a: 'account',
    w: 'wallet',
    t: 'transaction',
    n: 'notice',
    modes: {
        //FUNDING ACCOUNT ACTIONS....
        credit: 'Top-up',
        debit: 'Cashout',

        //WALLET ACTIONS....
        newWallet: 'Create wallet',
        editWallet: 'Edit wallet',
        delete: {title: 'Delete wallet', 
            message: 'This action is permanent and cannot be undone! Continue?'},
        cashOut: 'Send',
        cashIn: 'Receive'
    },
};

export const DIALOG_TEXTS = {
    deleteWallet: 'This wallet will be permanently deleted. Do you still want to continue?',
};
export const ACCESS_TOKEN = 'access';
export const REFRESH_TOKEN = 'refresh'

export const ALERT = {
    type: {success: 'success', error: 'error', info: 'info', warning: 'warning'},
    message: {
        success: {reg: 'Registration successful! Please log in with your username and password to continue.',
                login: 'Login successful! Redirecting to your dashboard...',
                wallet: {create: 'Wallet created       successfully!',
                        edit: 'Wallet updated successfully!',
                        delete: 'Wallet deleted successfully!'},
                transaction: 'Transaction recorded successfully!'},
        error: {reg: {network: 'Please check your internet connection and try again.',
                    username: 'Username already exists. Please choose a different one.',
                    generic: 'Registration failed. Please try again.'},
                login: 'Invalid username or password. Please verify your credentials and try again.',
                wallet: {create: 'Failed to create wallet. Please try again.',
                        edit: 'Failed to update wallet. Please try again.',
                        delete: 'Failed to delete wallet. Please try again.'},
                transaction: 'Failed to record transaction. Please try again.'
        },
        info: {
            reg: 'Username already exists. Please choose a different one.',
            login: '',
            wallet: {create: '',
                    edit: '',
                    delete: ''},
            transaction: ''
        },
        warning: {
            reg: 'Registration failed. Please try again.',
            login: 'Login failed. Please try again.',
            wallet: {create: 'Wallet creation failed.',
                    edit: 'Wallet update failed.',
                    delete: 'Wallet deletion failed.'},
            transaction: 'Transaction failed.'
        },
    },
        
        title: {
        success: {reg: 'Success!',
                login: 'Welcome back!',
                wallet: {create: 'Created!',
                        edit: 'Updated!',
                        delete: 'Deleted!'}, 
                    },
        error: {reg: {network: 'Network Error',
                    username: 'Username Taken',
                    generic: 'Registration Failed'},
                login: {network: 'Network Error',
                    credentials: 'Login Error',
                    generic: 'Login Failed'},
                wallet: {create: 'Creation Failed',
                        edit: 'Update Failed',
                        delete: 'Deletion Failed'},
                },
        info: {
            reg: 'Username taken',
            login: '',
            wallet: {create: '',
                    edit: '',
                    delete: ''},
            transaction: ''
        },
        warning: {
            reg: 'Registration failed',
            login: 'Login failed',
            wallet: {create: 'Wallet creation failed.',
                    edit: 'Wallet update failed.',
                    delete: 'Wallet deletion failed.'},
            transaction: 'Transaction failed.'
        },
    },
}    
    


// export const ALERTS = {
//     reg: {
//         type: {success: 'success', error: 'error', info: 'info', warning: 'warning'},
//         messages: {
//             success: 'Registration successful! Please log in with your username and password to continue.',
//             error: 'Please check your internet connection and try again.',
//             info: 'Username already exists. Please choose a different one.',
//             warning: 'Registration failed. Please try again.'
//         },
//         titles: {
//             success: 'Success!',
//             error: 'Error',
//             info: 'Username taken',
//             warning: 'Registration failed'
//         }
//     },
//     login: {
//         type: {success: 'success', error: 'error', info: 'info', warning: 'warning'},
//         messages: {
//             success: 'Login successful! Redirecting to your dashboard...',
//             error: 'Invalid username or password. Please verify your credentials and try again.',
//             info: '',
//             warning: 'Login failed. Please try again.'
//         },
//         titles: {
//             success: 'Welcome back!',
//             error: 'Login Error',
//             info: '',
//             warning: 'Login failed'
//         }
//     },
//     wallet: {
//         type: {success: 'success', error: 'error', info: 'info', warning: 'warning'},
//         messages: {
//             success: 'Wallet created successfully!',
//             error: 'Failed to create wallet. Please try again.',
//             info: '',
//             warning: 'Wallet creation failed.'
//         },
//         titles: {
//             success: 'Success!',
//             error: 'Error',
//             info: '',
//             warning: 'Creation Failed'
//         }
//     },
//     transaction: {
//         type: {success: 'success', error: 'error', info: 'info', warning: 'warning'},
//         messages: {
//             success: 'Transaction recorded successfully!',
//             error: 'Failed to record transaction. Please try again.',
//             info: '',
//             warning: 'Transaction failed.'
//         },
//         titles: {
//             success: 'Success!',
//             error: 'Error',
//             info: '',
//             warning: 'Transaction Failed'
//         }
//     }
// }
