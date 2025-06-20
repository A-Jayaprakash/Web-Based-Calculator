document.addEventListener('keydown', function(event) {
    if (document.activeElement.tagName === 'INPUT') return;

    const key = event.key;

    if (key >= '0' && key <= '9') {
        addToEquation(key);
    } else if (['+', '-', '*', '/', '.', '%', '(', ')'].includes(key)) {
        addToEquation(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        clearEntry();
    } else if (key === 'Delete') {
        clearAll();
    } else if (key === 'Escape') {
        clearAll();
    }
});