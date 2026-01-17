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
    id: crypto.randomUUID(),
    title: "Feeding",
    accountType: 'Savings account',
    accountBalance: 43000,
    minBalance: 0,
    monthlyLimit: 0,
    transactions: [],
    revenues: [],
    expenses: [],
    status: 'blank',
    note: ''
},{
    id: crypto.randomUUID(),
    title: "Savings",
    accountType: 'Savings account',
    accountBalance: 915000,
    minBalance: 0,
    monthlyLimit: 0,
    transactions: [],
    revenues: [],
    expenses: [],
    status: 'blank',
    note: ''
}, {
    id: crypto.randomUUID(),
    title: "Rents",
    accountType: 'Savings account',
    accountBalance: 80000,
    minBalance: 0,
    monthlyLimit: 0,
    transactions: [],
    revenues: [],
    expenses: [],
    status: 'blank',
    note: ''
}, {
    id: crypto.randomUUID(),
    title: "Medicals",
    accountType: 'Savings account',
    accountBalance: 225000,
    minBalance: 0,
    monthlyLimit: 0,
    transactions: [],
    revenues: [],
    expenses: [],
    status: 'blank',
    note: ''
}, {
    id: crypto.randomUUID(),
    title: "Crisis(urgent funds)",
    accountType: 'Savings account',
    accountBalance: 450000,
    minBalance: 0,
    monthlyLimit: 0,
    transactions: [],
    revenues: [],
    expenses: [],
    status: 'blank',
    note: ''
}, {
    id: crypto.randomUUID(),
    title: "Bills(water, electricity...)",
    accountType: 'Savings account',
    accountBalance: 78000,
    minBalance: 0,
    monthlyLimit: 0,
    transactions: [],
    revenues: [],
    expenses: [],
    status: 'blank',
    note: ''
}];


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
    {key: 'ala', value: 'Allowance'},
    {key: 'oth', value: 'Other'}
];

export const EXPENSE_CATEGORIES = [

    {key: 'ren', value: 'Rents'},
    {key: 'shop', value: 'Shopping'},
    {key: 'tran', value: 'Transport/Logistics'},
    {key: 'med', value: 'Medicals'},
    {key: 'fee', value: 'Fees/Subscriptions'},
    {key: 'lei', value: 'Leisure'},
    {key: 'oth', value: 'Other'}
    // 'Rent',
    // 'Utilities',
    // 'Groceries',
    // 'Transportation',
    // 'Other'
];

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
}
