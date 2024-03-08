// JavaScript (script.js)

document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('add-btn');
    const expensesTableBody = document.getElementById('expenses-table-body');
    const totalAmount = document.getElementById('total-amount');

    let expenses = [];

    // Function to render expenses
    function renderExpenses() {
        expensesTableBody.innerHTML = '';
        let total = 0;

        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');

            const categoryCell = document.createElement('td');
            categoryCell.textContent = expense.category;

            const amountCell = document.createElement('td');
            amountCell.textContent = expense.amount;
            total += expense.amount;

            const dateCell = document.createElement('td');
            dateCell.textContent = expense.date;

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteExpense(index));
            deleteCell.appendChild(deleteButton);

            row.appendChild(categoryCell);
            row.appendChild(amountCell);
            row.appendChild(dateCell);
            row.appendChild(deleteCell);

            expensesTableBody.appendChild(row);
        });

        totalAmount.textContent = total.toFixed(2);
    }

    // Function to add new expense
    function addExpense() {
        const categorySelect = document.getElementById('category-select');
        const amountInput = document.getElementById('amount-input');
        const dateInput = document.getElementById('date-input');

        const category = categorySelect.value;
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;

        if (category && !isNaN(amount) && date) {
            const expense = {
                category,
                amount,
                date
            };

            expenses.push(expense);
            renderExpenses();

            // Clear input fields
            categorySelect.value = '';
            amountInput.value = '';
            dateInput.value = '';
        } else {
            alert('Please fill all fields correctly!');
        }
    }

    // Function to delete an expense
    function deleteExpense(index) {
        expenses.splice(index, 1);
        renderExpenses();
    }

    // Event listener for add button
    addBtn.addEventListener('click', addExpense);
});
