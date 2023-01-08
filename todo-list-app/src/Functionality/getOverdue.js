function getOverdue(currAllData) {
    const today = (new Date()).setHours(0, 0, 0, 0);
    let overdueTodos = [];
    for (let item of currAllData) {
        let formatDate;
        if (Array.isArray(item.date)) {
            [formatDate] = [...item.date];
        } else {
            formatDate = item.date;
        };
        formatDate = formatDate.replace(/-/, '/').replace(/-/, '/');
        const currItem = (new Date(formatDate)).setHours(0, 0, 0, 0);
        if (currItem < today) {
            overdueTodos.push(item);
        };
    };
    return overdueTodos;
};

export default getOverdue;