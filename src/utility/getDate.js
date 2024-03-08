import { Text, View } from 'react-native'
import React from 'react'

const getDate = (activeButton) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

    let fromDate = '01/01/2024';
    let toDate = `${currentMonth}/${currentDate.getDate()}/${currentYear}`;
    switch (activeButton) {
        case 'daily':
            fromDate = `${currentMonth}/${currentDate.getDate()}/${currentYear}`;
            break;
        case 'weekly':
            // Calculate the start of the current week (assuming Sunday as the first day of the week)
            const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
            const startOfWeek = new Date(currentDate.setDate(firstDayOfWeek));
            fromDate = `${startOfWeek.getMonth() + 1}/${startOfWeek.getDate()}/${startOfWeek.getFullYear()}`;
            break;
        case 'monthly':
            fromDate = `${currentMonth}/01/${currentYear}`;
            break;
        case 'yearly':
            fromDate = `01/01/${currentYear}`;
            break;
        // Add more cases for other tabs if needed
        default:
            break;
    }
    return { fromDate, toDate };
}

export default getDate