'use strict';
// SELCTING ELEMENTS
const sections = document.querySelectorAll('section');
// const firstCurrScoreEl = document.getElementById('current--0');
// const secondCurrScoreEl = document.getElementById('current--1');
const firstScoreEl = document.getElementById('score--0');
const secondScoreEl = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const displayDice = document.querySelector('.btn--roll');
const displayPlayerScore = document.querySelector('.btn--hold');
const displayNewGame = document.querySelector('.btn--new');
const playerScores = [0, 0];
let currentPlayer = 0;
let currentScore = 0;
let playing = true;

// FUNCTIONS
const generateNum = () => Math.trunc(Math.random() * 6) + 1;
const handleCurrScore = (diceNumber = 0, currentPlayer) => {
    // if number of the dice = 1 so the current score is 0 else current score = curentscore + number of the dice
    currentScore = diceNumber === 1 ? 0 : currentScore + diceNumber;
    // display the current score of the current player
    document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
};
const switchPlayer = () => {
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    sections[0].classList.toggle('player--active');
    sections[1].classList.toggle('player--active');
};

// STARTING CONDITIONS
firstScoreEl.textContent = secondScoreEl.textContent = 0;
diceEl.classList.add('hidden');
// ROLLING DICE
displayDice.addEventListener('click', () => {
    if (playing) {
        // genrate random number and display the dice
        let diceNumber = generateNum();

        diceEl.src = `./assets/images/dice-${diceNumber}.png`;
        diceEl.classList.remove('hidden');
        if (diceNumber !== 1) {
            // display current score
            handleCurrScore(diceNumber, currentPlayer);
        } else {
            // the current score will be 0
            handleCurrScore(diceNumber, currentPlayer);
            // switch player
            switchPlayer();
        }
    }
});
// HOLDING BUTTON
displayPlayerScore.addEventListener('click', () => {
    if (playing) {
        // display the totla score
        playerScores[currentPlayer] += currentScore;
        document.getElementById(`score--${currentPlayer}`).textContent =
            playerScores[currentPlayer];
        currentScore = 0;
        document.getElementById(`current--${currentPlayer}`).textContent =
            currentScore;
        if (playerScores[currentPlayer] >= 50) {
            // stop playing
            playing = !playing;
            // current player wins
            document
                .querySelector(`.player--${currentPlayer}`)
                .classList.remove('player--active');
            document
                .querySelector(`.player--${currentPlayer}`)
                .classList.add('player--winner');

            diceEl.classList.add('hidden');
        } else {
            // switch player
            switchPlayer();
        }
    }
});
// display new game
displayNewGame.addEventListener('click', () => {
    playing = !playing;
    firstScoreEl.textContent = secondScoreEl.textContent = 0;
    diceEl.classList.add('hidden');
    document.querySelector('.player--0').classList.add('player--active');
    document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--winner');
    currentPlayer = 0;
    playerScores[0] = playerScores[1] = 0;
});
