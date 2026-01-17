
//KWARGS RELATED TO USER
    const userDictionary = {
    userName: 'User name',
    email: 'Email',
    password: 'Password',
    firstName: 'First name',
    lastName: 'Last name',
    profilePicture: 'Profile photo',
    dateOfBirth: 'Date of birth'
};
export const uD = userDictionary;


// KWARGS RELATED TO WALLET INSTANCE !!!!
    const walletDictionary = {
    accountBalance: 'Account balance',
    accountType: 'Type',
    minBalance: 'Minimum balance',
    monthlyLimit: 'Monthly withrawal limit',
    note: 'Note',
    revenues: 'Revenues',
    status: 'Status',
    title: 'Title',
    transactions: 'Transactions'
};
export const wD = walletDictionary;


// KWARGS RELATED TO TRANSACTION INSTANCE !!!!
    const transactionDictionary = {
    type: 'Transaction Type', 
	amount: 'Amount',
	motive: 'Motive', 
	note: 'Note', 
	date: 'Transaction date',
	wallet: 'Wallet',
	walletID: 'Wallet ID',    
};
export const tD = transactionDictionary;


// KWARGS RELATED TO ALERTS !!!
const alertsDictionary = {
    transactionAlerts: {
        insufficientBalance: 'Insufficient balance',
        invalidTransaction: 'Invalid transaction',
        transactionSuccess: 'Transaction successful',
        transactionFailed: 'Transaction failed, please try again later',
    },
    authAlerts: {
        loginFailed: 'Login failed, please check your credentials',
        signupFailed: 'Signup failed, please try again later',
        logoutSuccess: 'Logged out successfully',
    },
    walletAlerts: {
        walletCreated: 'Wallet created successfully',
        walletUpdated: 'Wallet updated successfully',
        walletDeleted: 'Wallet deleted successfully',
        walletError: 'Error processing wallet, please try again later',
    }
};
export const aD = alertsDictionary;


// KWARGS RELATED TO SETTINGS !!!
const settingsDictionary = {
    currency: 'Currency',
    language: 'Language',
    privacy: 'Privacy',
    notifications: 'Notifications',
    account: 'Account',
};
export const sD = settingsDictionary;
