function addToEquation(value) {
    if (justCalculated) {
        equation = '';
        justCalculated = false;
    }
    equation += value;
    updateDisplay();
    animateButton();
}

function clearAll() {
    equation = '';
    previousEquation = '';
    justCalculated = false;
    updateDisplay();
    animateButton();
}

function clearEntry() {
    if (justCalculated) {
        equation = '';
        justCalculated = false;
    } else {
        equation = equation.slice(0, -1);
    }
    updateDisplay();
    animateButton();
}

function calculate() {
    if (!equation) return;
    
    try {
        const processedEquation = preProcessEquation(equation);
        const result = math.evaluate(processedEquation);
        
        //I'm adding the new calculation and it's result to the front of the history array, so that new calculations will be shown in front of the history panel
        history.unshift({
            equation: equation,
            result: result.toString(),
            timestamp: new Date().toLocaleTimeString()
        });
        
        //Deleting the last history occurrence if the threshold is reached
        if (history.length > 20) {
            history.pop();
        }
        
        previousEquation = equation;
        equation = result.toString();
        justCalculated = true;
        updateDisplay();
        animateButton();
        
    } catch (error) {
        equation = 'Error';
        updateDisplay();
        setTimeout(() => {
            equation = '';
            updateDisplay();
        }, 2000);
    }
}

function preProcessEquation(expr) {
    
    expr = expr.replace(/×/g, '*');
    expr = expr.replace(/÷/g, '/');
    expr = expr.replace(/−/g, '-');
    expr = expr.replace(/π/g, 'pi');
    expr = expr.replace(/\*\*+\d/g, '^2');
    expr = expr.replace(/1\//g, '1/');
    expr = expr.replace(/(\d+)%/g, '($1/100)');
    return expr;
    
}

function updateDisplay() {
    const displayMain = document.getElementById('displayMain');
    const displayHistory = document.getElementById('displayHistory');
    
    displayMain.textContent = equation || '0';
    displayHistory.textContent = previousEquation || '';
    
    
    displayMain.classList.add('fade-in');
    setTimeout(() => displayMain.classList.remove('fade-in'), 300);
}

function animateButton() {
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="history-item">No calculations yet</div>';
        return;
    }
    
    history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-equation">${item.equation}</div>
            <div class="history-result">= ${item.result}</div>
            <div style="font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px;">${item.timestamp}</div>
        `;
        historyItem.addEventListener('click', () => {
            equation = item.result;
            updateDisplay();
        });
        historyList.appendChild(historyItem);
    });
}