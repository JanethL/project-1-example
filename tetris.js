const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const button = document.getElementById('start');
const restartButton = document.getElementById('restart');
ctx.scale(20,20); // used to scale everything on canvas by 20


//add event listener to start button so that when clicked the game is rendered 

document.addEventListener("DOMContentLoaded", function (e) {
button.addEventListener('click', () => {
        //we remove button to prevent another block to be rendered
        button.style.display = 'none';

restartButton.addEventListener('click', () => {
    console.log("clicked!") // check  to see if eventListener is working
    const clearCanvas = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}; 
    clearCanvas();
})
     
const blocks =[
    //we include four rows to make rotation easier
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

//we create our block using function draw () that passes our player position and blocks
//we created this function because we will need to update our game constantly
function draw (){
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBlocks(player.blocks, player.pos);

}

function drawBlocks(blocks, offset){
//we use .forEach method to iterate over every row and y index 
blocks.forEach((row, y) => {
    //and to grab the value and x index 
    row.forEach((value, x) => {
        // if value is not zero we draw square
        if (value !== 0) {
            ctx.fillStyle = 'red';
            ctx.fillRect(x + offset.x, // offset will allow us to move the blocks later
                         y + offset.y, 
                         1, 1);
        }
    });
});
}

//500 milliseconds (.5 sec) to drop the piece one step
let dropCounter = 0;
let dropInterval = 500;

//get difference of time
let lastTime = 0; 

//this calls draw function and calls requestAnimationFrame 
//requestAnimationFrame tells the browser that we wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint
//deltaTime is a useful variable for animation contains the time difference between the beginning of the previous frame and the beginning of the current frame in milliseconds
function update(time = 0) { //drop the blocks using the requestAnimationFrame by getting time and defaulting to 0
    // console.log(time); //console.log to see the time since your page loaded
    const deltaTime = time - lastTime; 
    lastTime = time;
    // console.log(deltaTime);

    dropCounter += deltaTime;
    if (dropCounter > dropInterval){
        player.pos.y++;
        dropCounter = 0;
    }

    draw();
    requestAnimationFrame(update);
}


// we add our player with a position and block
const player = {
    pos: {x: 5, y: 5},
    blocks: blocks,
}

// use the following EventListener to find key codes
// document.addEventListener('keydown', e =>{
//     console.log(e);
// })
document.addEventListener('keydown', e => {
    if (e.keyCode === 65) {
        player.pos.x--;
    } else if (e.keyCode === 68){
        player.pos.x++;
    } else if (e.keyCode === 83){
        player.pos.y++
        dropCounter = 0; // set dropCounter = 0 again /bc when we press down we still want to keep that .5 sec delay 
    }
});

update();

})});