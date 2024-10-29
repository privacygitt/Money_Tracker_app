document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('add-btn');
    const addIncomeBtn = document.getElementById('add-income-btn');
    const expensesTableBody = document.getElementById('expenses-table-body');
    const totalAmount = document.getElementById('total-amount');
    const totalExpensesElement = document.getElementById('total-expenses');
    const netBalanceElement = document.getElementById('net-balance');
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const toggleButton = document.getElementById('toggle-button');
    const sidebar = document.querySelector('.sidebar');

    let expenses = [];
    let income = 0;
    let chartInstance = null;

    // Render the list of expenses
    function renderExpenses() {
        expensesTableBody.innerHTML = '';
        let total = 0;

        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');

            const categoryCell = document.createElement('td');
            categoryCell.textContent = expense.category;

            const amountCell = document.createElement('td');
            amountCell.textContent = expense.amount.toFixed(2);
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
        totalExpensesElement.textContent = total.toFixed(2);
        netBalanceElement.textContent = (income - total).toFixed(2);
        renderChart();
    }

    // Add an expense
    function addExpense() {
        const categorySelect = document.getElementById('category-select');
        const customCategoryInput = document.getElementById('custom-category-input');
        const amountInput = document.getElementById('amount-input');
        const dateInput = document.getElementById('date-input');

        // Prioritize custom category if it is filled
        const category = customCategoryInput.value.trim() !== '' ? customCategoryInput.value : categorySelect.value;
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;

        if (!isNaN(amount) && amount > 0 && date) {
            expenses.push({ category, amount, date });
            amountInput.value = '';
            dateInput.value = '';
            customCategoryInput.value = ''; // Clear the custom input after adding
            renderExpenses();
        } else {
            alert('Please enter a valid amount and date.');
        }
    }

    // Add income
    function addIncome() {
        const incomeInput = document.getElementById('income-input');
        const incomeValue = parseFloat(incomeInput.value);
        if (!isNaN(incomeValue) && incomeValue > 0) {
            income += incomeValue;
            incomeInput.value = '';
            netBalanceElement.textContent = (income - parseFloat(totalAmount.textContent)).toFixed(2);
        } else {
            alert('Please enter a valid income.');
        }
    }

    // Delete an expense
    function deleteExpense(index) {
        expenses.splice(index, 1);
        renderExpenses();
    }

    // Group expenses by category
    function groupExpensesByCategory() {
        const categoryTotals = {};

        expenses.forEach(expense => {
            if (categoryTotals[expense.category]) {
                categoryTotals[expense.category] += expense.amount;
            } else {
                categoryTotals[expense.category] = expense.amount;
            }
        });

        return categoryTotals;
    }

    // Render chart based on grouped data
    function renderChart() {
        const groupedExpenses = groupExpensesByCategory();
        const labels = Object.keys(groupedExpenses);
        const data = Object.values(groupedExpenses);

        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Expenses by Category',
                data: data,
                backgroundColor: 'rgba(76, 175, 80, 0.6)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        // Destroy existing chart instance if it exists before creating a new one
        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, config);
    }

    // Event Listeners
    addBtn.addEventListener('click', addExpense);
    addIncomeBtn.addEventListener('click', addIncome);

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });
});
