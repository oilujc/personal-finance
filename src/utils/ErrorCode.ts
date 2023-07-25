
interface ErrorCodes {
    [key: string]: string;
}

const errorCode = (code: string): string => {
    const errorCodes: ErrorCodes = {
        'auth/user-not-found': 'User not found',
        'auth/wrong-password': 'Invalid credentials',
        'auth/too-many-requests': 'Too many requests',
        'auth/email-already-in-use': 'Email already in use',
        'permission/not-found': 'Permission not found',
        'transfer/invalid-amount': 'Invalid amount',
        'transfer/insufficient-funds': 'Insufficient funds',
        'income/not-found': 'Income not found',
        'account/not-found': 'Account not found',
        'budget/not-found': 'Budget not found',
    };

    return errorCodes[code] || 'Unknown error';
};

export default errorCode;