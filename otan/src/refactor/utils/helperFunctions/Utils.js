import dayjs from "dayjs";

export const formatDate = (date) => {
    return dayjs(date).format('MMMM D, YYYY');
};

export const formatDateTime = (date) => {
    return dayjs(date).format('MMMM D, YYYY h:mm A');
};

export const isDateToday = (date) => {
    const inputDate = dayjs(date);
    const today = dayjs();
    return inputDate.isSame(today, 'day');
};


// Function to stamp date in "MMMM D, YYYY h:mm A" format 
export const stampDate = () => {
    const now = dayjs();
    const formattedDate = now.format('YYYY-MM-DD HH:mm:ss');
    return formattedDate;
}; 

export const updateBalance = (accountBalance, transaction) => {
        let newBalance;
        if (transaction.type === 'Cash-in') {
            accountBalance += transaction.amount;
        } else if (transaction.type === 'Cash-out') {
            accountBalance -= transaction.amount;
        }
        newBalance = accountBalance;
    return newBalance;  // Return the updated balance to the caller
};

export const transactionValidity = (transaction ={}, wallet={}) => {
    if (!transaction || !wallet) {
        alert('Exepects two arguments(Objects): 1.transaction(Object) and 2.wallet(Object)');
        return false;
    }
    if (transaction.type === "Cash-out" && transaction.amount > parseInt(wallet.accountBalance)) {
        alert('Insufficient balance');
        return false;
    }
    return true;
};
