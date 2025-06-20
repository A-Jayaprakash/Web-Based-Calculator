function toggleTheme() {
    document.body.classList.toggle('dark');
    const btn = document.getElementById('themeBtn');
    if (document.body.classList.contains('dark')) {
        btn.textContent = '☀️ Light';
    }
    else {
        btn.textContent = '🌙 Dark';
    }
}

function toggleMode() {
    isScientific = !isScientific;
    const basicCalc = document.getElementById('basicCalc');
    const scientificCalc = document.getElementById('scientificCalc');
    const btn = document.getElementById('modeBtn');
    
    if (isScientific) {
        basicCalc.style.display = 'none';
        scientificCalc.style.display = 'grid';
        btn.textContent = '🔢 Basic';
        btn.classList.add('active');
    } else {
        basicCalc.style.display = 'grid';
        scientificCalc.style.display = 'none';
        btn.textContent = '🔬 Scientific';
        btn.classList.remove('active');
    }
}

function toggleGraph() {
    const panel = document.getElementById('graphPanel');
    const input = document.getElementById('graphInput');
    const btn = document.getElementById('graphBtn');
    
    if (panel.classList.contains('active')) {
        panel.classList.remove('active');
        input.classList.remove('active');
        btn.classList.remove('active');
    } else {
        panel.classList.add('active');
        input.classList.add('active');
        btn.classList.add('active');
        plotGraph();
    }
}

function toggleHistory() {
    const panel = document.getElementById('historyPanel');
    const btn = document.getElementById('historyBtn');
    
    if (panel.classList.contains('active')) {
        panel.classList.remove('active');
        btn.classList.remove('active');
    } else {
        panel.classList.add('active');
        btn.classList.add('active');
        updateHistoryDisplay();
    }
}