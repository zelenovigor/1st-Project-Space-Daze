 let scoreboard = document.getElementById('score');
 var sound = new Audio("mario-gameover.mp3");
 var boing = new Audio("boing.mp3");
 var stAUD = new Audio("start.mp3");


 function showScore(){
    let newScore = JSON.parse(localStorage.getItem('allScores'));
     
     document.querySelector('#scoreboard').innerHTML = newScore &&
     newScore.filter((_,i)=> i <= 4).map(eachScore=>`<li>${eachScore.name} .. ${eachScore.score}</li>`);
     console.log('here');
 }
 showScore()

// scoreboard.innerHTML = 'CHANGED'
document.querySelector('#start-button').onclick = (e) => { //Start button is clicked 
    console.log(e.target, this);
    e.target.remove()  //removes start button
    startGame(); //calls startGame
    score()
    window.requestAnimationFrame(animate)
}
// document.querySelector('#restart-button').onclick = (e) => {
//     console.log(e.target, this);
//     e.target.remove()
//     startGame();
//     window.requestAnimationFrame(animate)
// }


var canvas = document.getElementById('canvas'); //calling canvas
var ctx = canvas.getContext('2d');


function startGame() {
    console.log('bla')
    stAUD.play()
    //making player object
    empty = [];
    
    //speed start
    ctx.speedY = 4;
    
    ctx.x = 30;         //sizes
    ctx.y = 30;
    ctx.px = canvas.width/2;        //positions
    ctx.py = 300;
   redo()
}   


// function drawBlueSquare(){                                    // draw square                                              
//     ctx.fillStyle = "blue";
//     ctx.fillRect(ctx.px, ctx.py, ctx.x, ctx.y);
// }


function drawCircle(){
    ctx.beginPath();
    ctx.arc(ctx.px, ctx.py, ctx.x, 0, 2 * Math.PI);
    ctx.fillStyle = 'purple'
    ctx.fill()
}


function newPos() {

    if (ctx.py <= 0) {
        boing.play()
        ctx.speedY = 4;
        ctx.py = 1;
        
    }
    else if (ctx.py >= 460) {
        boing.play()
        ctx.speedY = -4;
        ctx.py = 458;
        
    }
    ctx.py += ctx.speedY;

}


function moveup() {
    ctx.speedY = -4
}


function movedown() {
     ctx.speedY = 4;
}


document.onkeydown = function (e) {

    switch (e.key) {

        case 'ArrowUp': moveup(); break;
        case 'ArrowDown': movedown(); break;

    }


}


function getRandomArbitrary(min, max) { return Math.random() * (max - min) + min; }
let r = getRandomArbitrary(240, 550)
let x = 0;

let gameover = false

function checkCollision(){
    //  console.log(frameId)
    empty.forEach(stamp => {
      if (ctx.px < stamp.x + stamp.width &&
        ctx.px + ctx.x > stamp.x &&
        ctx.py < stamp.y + stamp.height &&
        ctx.py + ctx.y > stamp.y) {
         console.log('collision detected!',frameId);

         gameover = true 
         window.cancelAnimationFrame(frameId)
         window.clearInterval(scoreId)
         
         ctx.fillStyle = 'yellow'
         ctx.font = '60px arial'
         ctx.fillText("GAME OVER", 273, 273);
         
         sound.play()
         return
     }
    })
    if(gameover){
        return addScore()
    }
  }

  function addScore(){
      let name = prompt('what is your name?')
      console.log(name,scores);

      let allScores = localStorage.getItem('allScores') ? JSON.parse(localStorage.getItem('allScores')) : []
        console.log(allScores)
    
      allScores.unshift({name:name, score:scores});
      allScores.sort((a,b) => b.score - a.score)
      localStorage.setItem('allScores', JSON.stringify(allScores))
      showScore()
      console.log(allScores)
  }

  let scores = 0;


  function score(){
      
        scoreId = setInterval(() => {
            scores += 1 
            scoreboard.innerHTML = scores
    }, 2000 )
  }


// let empty = [];

// function checkCollision(sq){
//     console.log(sq, ctx.px, ctx.py, ctx.x, ctx.y)
//     if(sq.x < ctx.px + ctx.x && )
//     // if (rect1.x < rect2.x + rect2.width &&
// //     rect1.x + rect1.width > rect2.x &&
// //     rect1.y < rect2.y + rect2.height &&
// //     rect1.y + rect1.height > rect2.y) {


// }

function stamp(){
    empty.forEach(sq=>{
        ctx.fillStyle = sq.color
        ctx.fillRect(sq.x -=2,sq.y,sq.width, sq.height)
        //checkCollision(sq)
    })
    
  
}
let sq = {
    x: 860,
    y: getRandomArbitrary(0, 400),
    width: 5,
    height: 110,
    color:'red'
}


function redo() {
    console.log('called')
    setInterval(() => {
        let sq = {
            x: 860,
            y: getRandomArbitrary(0, 400),
            width: 5,
            height: 110,
            color:'red'
        }
        empty.push(sq)
    }, 1750)
console.log(sq)
   
}

// if (rect1.x < rect2.x + rect2.width &&
//     rect1.x + rect1.width > rect2.x &&
//     rect1.y < rect2.y + rect2.height &&
//     rect1.y + rect1.height > rect2.y) {




let scoreId;//6546
let frameId;//323232
function animate() {
    frameId = window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    newPos()
    drawCircle()                                                         
    stamp()
    checkCollision()
    
}




