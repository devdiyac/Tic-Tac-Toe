let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; 

const winPatterns = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]];

let clicks = 0;

let winner=0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.style.color = "deeppink";
            box.innerText = "O";
            turnO = false;
        } else {
            box.style.color = "#7209b7";
            box.innerText = "X";
            turnO = true;
        }
        clicks++;
        box.disabled=true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const drawGame = () => {
    if(clicks===9 && winner===0){
        msg.innerHTML = "<i>It's a Draw!</i>";
        msgContainer.classList.remove("hide");
    }
};

const showWinner = (winner) => {
    msg.innerHTML = `<i>Congratulations, Winner is ${winner}!</i>`;
    msgContainer.classList.remove("hide");
}
const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                winner = 1;
            }
        }
    };
    drawGame();
};

const resetGame = () => {
    clicks = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newGame.addEventListener("click",resetGame);
reset.addEventListener("click", resetGame);