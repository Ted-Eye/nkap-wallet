import dayjs from "dayjs";

    const formatDate = (dateString) => {
    return dayjs(dateString).format('MMMM D, YYYY');
};

    const formatDateTime = (dateString) => {
    return dayjs(dateString).format('MMMM D, YYYY h:mm A');
};

    const isDateToday = (dateString) => {
    const inputDate = dayjs(dateString);
    const today = dayjs();
    return inputDate.isSame(today, 'day');
};


// Function to stamp date in "MMMM D, YYYY h:mm A" format 
export const stampDate = (dateString) => {
    const inputDate = dayjs(dateString);
    return inputDate.format('MMMM D, YYYY h:mm A');
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
