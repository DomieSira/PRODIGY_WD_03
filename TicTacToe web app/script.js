let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let isVsAI = false; // Control if game is vs AI or another player
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle click events when a user clicks a cell
function handleClick(index) {
    if (board[index] === "" && isGameActive) {
        board[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        // If playing vs AI and it's "O" turn
        if (isVsAI && currentPlayer === "O" && isGameActive) {
            aiMove(); // Make AI move
        }
    }
}

// Check for a winner after every move
function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            alert(`${board[a]} wins!`);
            return;
        }
    }

    if (!board.includes("")) {
        isGameActive = false;
        alert("It's a draw!");
    }
}

// Restart the game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
}

// Simple AI move function that picks a random empty spot
function aiMove() {
    let availableCells = board.map((cell, index) => (cell === "" ? index : null)).filter(val => val !== null);
    if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = "O";
        document.getElementById(`cell-${randomIndex}`).innerText = "O";
        checkWinner();
        currentPlayer = "X"; // After AI move, switch back to player
    }
}

// Switch between game modes (PvP or vs AI)
function toggleGameMode() {
    isVsAI = !isVsAI;
    alert(`Game mode changed to ${isVsAI ? "Player vs AI" : "Player vs Player"}`);
    restartGame(); // Restart game when changing mode
}
