const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');

// implementing a array to assign a value to the card

let cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; // Duplicate values for pairs
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = cardValues.length;

//shuffle method to shuffle a card 

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // using a math.random to generated given value
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerText = '?';
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedPairs++;
        resetFlippedCards();
        if (matchedPairs === totalPairs) {
            setTimeout(() => alert('You won!'), 500);
            
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.innerText = '?';
            secondCard.classList.remove('flipped');
            secondCard.innerText = '?';
            resetFlippedCards();
        }, 1000);
    }
}

function resetFlippedCards() {
    flippedCards = [];
}

function startGame() {
    matchedPairs = 0;
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach(value => {
        const card = createCard(value);
        gameBoard.appendChild(card);
    });
}

restartButton.addEventListener('click', startGame);

// Initialize the game on page load
startGame();
