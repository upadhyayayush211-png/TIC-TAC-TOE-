// app.js
let boxes = document.querySelectorAll('.box');
let Reset = document.querySelector('#Reset');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const disableboxes = () => {
    boxes.forEach((b) => {
        b.disabled = true;
    });
};

const enableboxes = () => {
    boxes.forEach((b) => {
        b.disabled = false;
    });
};

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove('hide');
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== '' && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("winner", pos1Val);
            showWinner(pos1Val);
            disableboxes();
            return true;
        }
    }
    return false;
};

// resetGame sets board to initial state and attaches click listeners
function resetGame() {
    // clear board and prepare
    boxes.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
    });

    // hide winner message
    msgContainer.classList.add('hide');
    msg.innerText = 'Winner';

    // start with O as per original code
    turnO = true;

    // remove existing listeners by cloning nodes (simple way) and re-querying
    const game = document.querySelector('.game');
    // rebuild boxes to remove duplicate listeners
    const boxNodes = Array.from(document.querySelectorAll('.box'));
    boxNodes.forEach((oldBox, idx) => {
        // replace node with a clone to remove previous listeners
        const newBox = oldBox.cloneNode(true);
        oldBox.parentNode.replaceChild(newBox, oldBox);
    });

    // re-query updated boxes
    boxes = document.querySelectorAll('.box');

    // attach click listeners
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            console.log('Box clicked');
            if (turnO) {
                box.innerText = 'O';
                turnO = false;
            } else {
                box.innerText = 'X';
                turnO = true;
            }
            box.disabled = true;

            // check winner after each move
            checkWinner();
        });
    });
}

// Attach event listeners for the Reset / New Game buttons
if (Reset) {
    Reset.addEventListener('click', resetGame);
}

if (newGameBtn) {
    newGameBtn.addEventListener('click', resetGame);
}

// initialize the board on load
resetGame();
