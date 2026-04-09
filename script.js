// Seleção de elementos do DOM
const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

// Variáveis de estado do jogo
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

// Combinações possíveis para vitória
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

// Função disparada ao clicar em uma célula
function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Ignora o clique se a célula já estiver preenchida ou o jogo tiver acabado
    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(clickedCell, cellIndex);
    checkResult();
}

// Atualiza a interface e o array do tabuleiro
function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // Adiciona classe para cor (x ou o)
}

// Verifica se houve vitória ou empate
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusElement.innerText = `Vitória do Jogador ${currentPlayer}!`;
        gameActive = false;
        updateScore();
        return;
    }

    // Verifica empate (não há mais espaços vazios)
    if (!board.includes('')) {
        statusElement.innerText = 'Empate (Deu Velha)!';
        gameActive = false;
        return;
    }

    // Alterna o turno
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.innerText = `Vez do Jogador: ${currentPlayer}`;
}

// Atualiza o placar
function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXElement.innerText = scoreX;
    } else {
        scoreO++;
        scoreOElement.innerText = scoreO;
    }
}

// Reinicia a rodada mantendo o placar intacto
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X'; // O Jogador X sempre começa a nova partida
    gameActive = true;
    statusElement.innerText = `Vez do Jogador: ${currentPlayer}`;
    
    // Limpa o tabuleiro visualmente
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
    });
}

// Adiciona os eventos de clique
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);