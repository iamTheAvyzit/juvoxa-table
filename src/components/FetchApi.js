export const getHoldingsPayload = async () => {
    return await fetch('https://canopy-frontend-task.vercel.app/api/holdings')
    .then((res) => res.json())
}

export const getTransactions = async () => {
    return await fetch('https://canopy-frontend-task.vercel.app/api/transactions')
    .then((res) => res.json())
}