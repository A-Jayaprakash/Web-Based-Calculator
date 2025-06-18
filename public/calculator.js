let equation = '';

function addToEquation(value) {
    equation += value;
    displayNum(equation);
}

function clearEquation() {
    equation = '';
    displayNum(equation);
}

function backSpace() {
    equation = equation.slice(0, -1);
    displayNum(equation);
}

function calculate() {
    try {
        const result = eval(equation);
        result.toString();
        displayNum(result);
    }
    catch (error) {
        displayNum('Error');
        console.error('Calculation error:', error);
    }
    finally {
        equation = '';
    }
}

function displayNum(num) {
    let disp = document.querySelector(".display");
    disp.innerHTML = num;
    console.log(num);
}

function toggleMode() {
    let text = document.getElementById("Mode");
    let displayText = document.querySelector(".display");
    if (text.innerHTML === 'Light Mode') {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        text.innerHTML = 'Dark Mode';
        displayText.style.color = 'white';

    }
    else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        text.innerHTML = 'Light Mode';
        displayText.style.color = 'black';
    }
}
