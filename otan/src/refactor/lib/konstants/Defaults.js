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
