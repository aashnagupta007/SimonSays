let gameSeq = [];
let userSeq = [];

let colors = ["green", "red", "blue", "yellow"];

let started = false;
let level = 0;

let p = document.querySelector("p");

document.addEventListener("keydown", ()=> {
    if(started === false){
        console.log("Game started");
        started = true;

        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    btnPressDisabled = true;

    level++;
    p.innerText = `Level ${level}`;

    //Choose random button
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colors[randIdx];

    gameSeq.push(randColor);

    //Play sequence
    let delay = 0;

    for(let color of gameSeq){
        let btn = document.querySelector(`.${color}`);
        setTimeout(()=> {
            btnFlash(btn);
        }, delay);

        delay += 500;
    }

    setTimeout(()=> {
        btnPressDisabled = false;
    }, delay);
};

function btnFlash(btn){
    btn.classList.add("flash");

    setTimeout(()=> {
        btn.classList.remove("flash");
    }, 250);
};

function checkAns(i){
    if(userSeq[i] === gameSeq[i]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        p.innerText = `Game Over! Your score was ${level - 1}. Press any key to play again.`
        document.body.classList.add("game-over");

        setTimeout(()=> {
            document.body.classList.remove("game-over");
        }, 250);
        reset();
    }
};

function btnPress(){
    if(started === false || btnPressDisabled) return;

    let btn = this;
    btnFlash(btn);

    let userColor = btn.id;
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".box");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];

    level = 0;
};