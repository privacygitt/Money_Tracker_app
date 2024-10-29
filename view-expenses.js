document.addEventListener('DOMContentLoaded', function () {
    const expensesTableBody = document.getElementById('expenses-table-body');
    const totalAmount = document.getElementById('total-amount');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const searchInput = document.getElementById('search-input');
    const filterBtn = document.getElementById('filter-btn');
    const searchBtn = document.getElementById('search-btn');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses(filteredExpenses) {
        expensesTableBody.innerHTML = '';
        let total = 0;

        filteredExpenses.forEach((expense, index) => {
            const row = document.createElement('tr');

            const categoryCell = document.createElement('td');
            categoryCell.textContent = expense.category;

            const amountCell = document.createElement('td');
            amountCell.textContent = expense.amount.toFixed(2);
            total += expense.amount;

            const dateCell = document.createElement('td');
            dateCell.textContent = expense.date;

            const editCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editExpense(index));
            editCell.appendChild(editButton);

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteExpense(index));
            deleteCell.appendChild(deleteButton);

            row.appendChild(categoryCell);
            row.appendChild(amountCell);
            row.appendChild(dateCell);
            row.appendChild(editCell);
            row.appendChild(deleteCell);

            expensesTableBody.appendChild(row);
        });

        totalAmount.textContent = total.toFixed(2);
    }

    function filterExpenses() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= startDate && expenseDate <= endDate;
        });
        renderExpenses(filteredExpenses);
    }

    function searchExpenses() {
        const searchText = searchInput.value.toLowerCase();
        const filteredExpenses = expenses.filter(expense => {
            return expense.category.toLowerCase().includes(searchText) || 
                   expense.amount.toString().includes(searchText);
        });
        renderExpenses(filteredExpenses);
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses(expenses);
    }

    function editExpense(index) {
        const expense = expenses[index];
        const category = prompt("Edit Category:", expense.category);
        const amount = prompt("Edit Amount:", expense.amount);
        const date = prompt("Edit Date:", expense.date);

        if (category && !isNaN(amount) && date) {
            expenses[index] = { category, amount: parseFloat(amount), date };
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses(expenses);
        }
    }

    // Event Listeners
    filterBtn.addEventListener('click', filterExpenses);
    searchBtn.addEventListener('click', searchExpenses);

    renderExpenses(expenses);
});
