document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
    document.getElementById('modeBtn').addEventListener('click', toggleMode);
    document.getElementById('graphBtn').addEventListener('click', toggleGraph);
    document.getElementById('historyBtn').addEventListener('click', toggleHistory);
    
    
    const graphInput = document.getElementById('graphEquation');
    graphInput.addEventListener('input', function() {
        if (document.getElementById('graphPanel').classList.contains('active')) {
            plotGraph();
        }
    });
    
    
    const calcButtons = document.querySelectorAll('.calc-btn');
    calcButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('button-press');
            setTimeout(() => {
                this.classList.remove('button-press');
            }, 100);
        });
    });
});