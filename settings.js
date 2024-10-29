document.addEventListener('DOMContentLoaded', function () {
    const currencySelect = document.getElementById('currency-select');
    const themeSelect = document.getElementById('theme-select');
    const notificationCheckbox = document.getElementById('notification-checkbox');
    const exportBtn = document.getElementById('export-btn');

    // Load saved settings from localStorage
    const savedCurrency = localStorage.getItem('currency') || 'USD';
    const savedTheme = localStorage.getItem('theme') || 'light';
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';

    currencySelect.value = savedCurrency;
    themeSelect.value = savedTheme;
    notificationCheckbox.checked = notificationsEnabled;

    // Change theme based on user selection
    document.body.className = savedTheme; // Apply saved theme on load

    themeSelect.addEventListener('change', function () {
        const selectedTheme = themeSelect.value;
        document.body.className = selectedTheme;
        localStorage.setItem('theme', selectedTheme); // Save theme to localStorage
    });

    currencySelect.addEventListener('change', function () {
        const selectedCurrency = currencySelect.value;
        localStorage.setItem('currency', selectedCurrency); // Save currency to localStorage
    });

    notificationCheckbox.addEventListener('change', function () {
        const isEnabled = notificationCheckbox.checked;
        localStorage.setItem('notificationsEnabled', isEnabled); // Save notification preference
    });

    exportBtn.addEventListener('click', function () {
        // Functionality to export data as CSV
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const csvContent = 'data:text/csv;charset=utf-8,' + 
            ['Category,Amount,Date'].concat(expenses.map(e => `${e.category},${e.amount},${e.date}`)).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'expenses.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
