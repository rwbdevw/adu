function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('adu_v3_dark', isDark ? '1' : '0');
    const btn = document.getElementById('btn-dark-mode');
    if (btn) btn.innerText = isDark ? '☀️' : '🌙';
}

function initTheme() {
    if (localStorage.getItem('adu_v3_dark') === '1') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('btn-dark-mode');
        if (btn) btn.innerText = '☀️';
    }
}
