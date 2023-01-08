function getOverdue(currAllData) {
    const today = (new Date()).valueOf();
    let overdueTodos = [];
    for (let item of currAllData) {
        let formatDate;
        if (Array.isArray(item.date)) {
            [formatDate] = [...item.date];
        } else {
            formatDate = item.date;
        };
        formatDate = formatDate.replace(/-/, '/').replace(/-/, '/');
        const currItem = (new Date(formatDate)).valueOf();
        if (currItem < today) {
            overdueTodos.push(item);
        };
    };
    return overdueTodos;
};

export default getOverdue;