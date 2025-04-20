const wordList = [
    "apple", "banana", "keyboard", "javascript", "function", "coding", "typing"
];

const paragraphList = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing games are a fun way to improve your speed and accuracy.",
    "Practice makes perfect when it comes to keyboard skills.",
    "Speed typing improves productivity and sharpens your mind.",
    "Programming languages like JavaScript are great for games."
];

let mode = 'word';
let gameType = 'single';
let shuffledList = [];
let currentIndex = 0;
let currentText = '';
let score = [0, 0];
let time = 60;
let timer;
let playerTurn = 0;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

let player1Name = "Player 1";
let player2Name = "Player 2";

// DOM Elements
const modeSelect = document.getElementById("mode-select");
const gameArea = document.getElementById("game-area");
const targetTextDiv = document.getElementById("target-text");
const textInput = document.getElementById("text-input");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const gameOverText = document.getElementById("game-over");
const restartBtn = document.getElementById("restart-btn");
const playerTurnDisplay = document.getElementById("player-turn");
const leaderboardDisplay = document.getElementById("leaderboard");
const gameTypeSelect = document.getElementById("game-type-select");
const multiplayerNamesDiv = document.getElementById("multiplayer-names");
const progressBar = document.getElementById("progress-bar");
const themeToggle = document.getElementById("theme-toggle");

// Sound effects
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');
const gameOverSound = new Audio('gameover.mp3');
const completedSound = new Audio('completed.mp3');

// Preload sounds
[correctSound, incorrectSound, gameOverSound, completedSound].forEach(s => s.preload = 'auto');

// Shuffle function
function shuffleList(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

// Get next word/paragraph
function getNextText() {
    if (currentIndex >= shuffledList.length) {
        currentIndex = 0;
        shuffledList = shuffleList([...shuffledList]);
    }
    const nextText = shuffledList[currentIndex];
    currentIndex++;
    return nextText;
}

// Show color-coded text
function displayColoredText(input) {
    let display = '';
    for (let i = 0; i < currentText.length; i++) {
        if (i < input.length && input[i] === currentText[i]) {
            display += `<span class="correct">${currentText[i]}</span>`;
        } else {
            display += `<span>${currentText[i]}</span>`;
        }
    }
    targetTextDiv.innerHTML = display;
}

// Flow: First screen is game-type-select
window.onload = () => {
    gameTypeSelect.style.display = 'block';
    modeSelect.style.display = 'none';
    multiplayerNamesDiv.style.display = 'none';
    gameArea.style.display = 'none';
    leaderboardDisplay.style.display = 'block';
};

// Called when user selects game type
function selectGameType(type) {
    gameType = type;
    gameTypeSelect.style.display = 'none';

    if (gameType === 'multiplayer') {
        multiplayerNamesDiv.style.display = 'block';
    }

    // Show mode-select next
    modeSelect.style.display = 'block';
}

// Called when user selects mode (word or paragraph)
function startMode(selectedMode) {
    mode = selectedMode;
    modeSelect.style.display = 'none';
    multiplayerNamesDiv.style.display = 'none';
    startGame();
}

// Start game logic
function startGame() {
    if (gameType === 'multiplayer') {
        player1Name = document.getElementById("player1-name").value || "Player 1";
        player2Name = document.getElementById("player2-name").value || "Player 2";
    }

    gameArea.style.display = 'block';
    leaderboardDisplay.style.display = 'none';

    score = gameType === 'single' ? [0] : [0, 0];
    currentIndex = 0;
    time = 60;
    scoreDisplay.textContent = `${player1Name}: ${score[0]}${gameType === 'multiplayer' ? ` | ${player2Name}: ${score[1]}` : ''}`;
    textInput.value = '';
    textInput.disabled = false;
    gameOverText.style.display = 'none';
    restartBtn.style.display = 'none';

    const sourceList = mode === 'word' ? [...wordList] : [...paragraphList];
    shuffledList = shuffleList(sourceList);

    currentText = getNextText();
    displayColoredText('');
    playerTurnDisplay.style.display = 'block';
    playerTurnDisplay.textContent = gameType === 'single' ? 'Your turn' : `${player1Name}'s turn`;
    textInput.focus();

    progressBar.style.width = '100%';
    startTimer();
}

// Timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        timeDisplay.textContent = time;
        progressBar.style.width = `${(time / 60) * 100}%`;
        if (time === 0) {
            clearInterval(timer);
            endGame(false);
        }
    }, 1000);
}

// End game
function endGame(completed = false) {
    textInput.disabled = true;
    if (completed) {
        try { completedSound.play(); } catch (e) {}
        gameOverText.textContent = "🎉 You've completed all!";
    } else {
        try { gameOverSound.play(); } catch (e) {}
        gameOverText.textContent = "❌ Game Over!";
    }
    gameOverText.style.display = 'block';
    restartBtn.style.display = 'inline-block';
    playerTurnDisplay.style.display = 'none';

    if (gameType === 'multiplayer') {
        if (score[0] > score[1]) {
            gameOverText.textContent += ` ${player1Name} Wins!`;
            addToLeaderboard(player1Name, score[0]);
        } else if (score[1] > score[0]) {
            gameOverText.textContent += ` ${player2Name} Wins!`;
            addToLeaderboard(player2Name, score[1]);
        }
    } else {
        addToLeaderboard(player1Name, score[0]);
    }

    displayLeaderboard();
}

// Leaderboard
function addToLeaderboard(player, score) {
    leaderboard.push({ player, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    leaderboardDisplay.innerHTML = '<h3>Leaderboard</h3>';
    leaderboard.forEach((entry, index) => {
        const div = document.createElement('div');
        div.textContent = `${entry.player}: ${entry.score}`;
        if (index === 0) div.classList.add('top-score');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deletePlayer(index);

        div.appendChild(deleteBtn);
        leaderboardDisplay.appendChild(div);
    });
}

function deletePlayer(index) {
    leaderboard.splice(index, 1);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

// Handle input
textInput.addEventListener('input', () => {
    const input = textInput.value;
    displayColoredText(input);
});

textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (textInput.disabled) {
            restartBtn.click();
            return;
        }

        const typed = textInput.value.trim();
        const target = currentText.trim();

        if (typed === target) {
            if (gameType === 'single') {
                score[0]++;
            } else {
                score[playerTurn]++;
            }

            scoreDisplay.textContent = `${player1Name}: ${score[0]}${gameType === 'multiplayer' ? ` | ${player2Name}: ${score[1]}` : ''}`;

            try { correctSound.play(); } catch (e) {}

            currentText = getNextText();
            textInput.value = '';
            displayColoredText('');

            playerTurn = gameType === 'single' ? 0 : 1 - playerTurn;
            playerTurnDisplay.textContent = gameType === 'single' ? 'Your turn' : `${playerTurn === 0 ? player1Name : player2Name}'s turn`;
        } else {
            try { incorrectSound.play(); } catch (e) {}

            if (gameType === 'multiplayer') {
                playerTurn = 1 - playerTurn;
                playerTurnDisplay.textContent = `${playerTurn === 0 ? player1Name : player2Name}'s turn`;
                textInput.value = '';
            }
        }
    }
});

// Restart
restartBtn.addEventListener('click', () => {
    gameTypeSelect.style.display = 'block';
    modeSelect.style.display = 'none';
    gameArea.style.display = 'none';
    leaderboardDisplay.style.display = 'block';
});

// Theme toggle
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark', themeToggle.checked);
        localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') {
        themeToggle.checked = true;
        document.body.classList.add('dark');
    }
}
