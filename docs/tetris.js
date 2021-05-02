const canvas = document.getElementById('tetris'); //access canvas
const ctx = canvas.getContext('2d');
const button = document.getElementById('start');
const resetButton = document.getElementById('reset'); //grab reset button
const modal = document.getElementById("myModal");
const btn = document.getElementById("instructions");
const span = document.getElementsByClassName("close")[0];

ctx.scale(20,20); //scale everything on canvas by 20

//add event listener to start button so that when clicked the game is rendered
button.addEventListener('click', () => { 
        update(); // start the game by calling our update() function
button.style.display = 'none'; //remove button to prevent another block from being rendered

resetButton.addEventListener('click', () => { //add another event listener for when reset button is clicked
    location.reload();
    })
})

btn.addEventListener('click', () => { 
    modal.style.display = "block";
  })
span.addEventListener('click', () => { 
    modal.style.display = "none";
  })
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

// Pick one block piece to start off drawing the entire structure and functions of game

const blocks = [
    //include four rows to make rotation easier
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
];

//convert rows into coloumns and reverse the rows
function rotate(blocks, control) {
    for (let y = 0; y < blocks.length; y++ ){
        for(let x = 0; x < y; x++){
            [
                blocks[x][y],
                blocks[y][x],

            ] = [
                blocks[y][x],
                blocks[x][y],
            ];

        }
    }
    if (control > 0){
        blocks.forEach(row => row.reverse());
    } else {
        blocks.reverse();
    }
}


// create a function to save all the pieces
function createBlocks(w, h){
    const blocks = []; // set an empty array
    while (h--){ // we know the height is 2 so here we are saying that while the height is not zero decrease h by 1 
        blocks.push(new Array(w).fill(0));
    }
   return blocks;
}

// now we need a collision detect function 

function collide(field, player){
    //assign the bocks and position to variable f & p, here we're just saving the position of block 
    const b = player.blocks;
    const o = player.pos; 
    //then we have to iterate over the players "blocks" position
    // create for loop to loop over y(rows)
    for(let y = 0; y < b.length; y++){
            //then create for loop to loop over x
        for(let x = 0; x < b[y].length; x++){
            //once iterate over players block, if the blocks position of player is not zero and fields 
            if(b[y][x] !== 0 && //if the players blocks  y row and x column is not zero (they collide)
                (field[y + o.y] && // and if fields row exist // if it doesn't exist it will count as collision 
                field[y + o.y][x + o.x]) !== 0){ //if it exist we can grab the child and if they are not zero (they collide) so we return true
                    return true; // we return true if the if our conditions are not equal to zero, meaning that they have an x or y position

                }
                    
        }
    }
    return false; // if they are zero they don't collide 
}

// now that we have a collide function we can use it within a function that drops the players block
// }
//we create our block using function draw () that passes our player position and blocks
//we created this function because we will need to update our game constantly
function draw (){
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    drawBlocks(field, {x:0, y:0}); // when we open our console to check the field `console.log(field);` we notice our zeros are being populated so we just need to draw those 
    drawBlocks(player.blocks, player.pos); 


}

function drawBlocks(blocks, offset){
//we use .forEach method to iterate over every row and y index 
blocks.forEach((row, y) => {
    //and to grab the value and x index 
    row.forEach((value, x) => {
        // if value is not zero we draw square
        if (value !== 0) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(x + offset.x, // offset will allow us to move the blocks later
                         y + offset.y, 
                         1, 1);
        }
    });
});
}

//we need to add a function that copies players position inside the field that we we can detect collision
//

function join(field, player){
    player.blocks.forEach((row, y) => { //we pull row and y index of the players block 
        row.forEach((value, x) => { // we iterate over row to get value and x index
            if (value !== 0) { //we ignore zero values
                field[y + player.pos.y][x + player.pos.x] = value; //we copy the values into the field 
            }
        });
    });

}


//500 milliseconds (.5 sec) to drop the piece one step
let dCounter = 0; 
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

    dCounter += deltaTime; //we add drop count to the diff between prev frame and current frame 
    if (dCounter > dropInterval){
        player.pos.y++;
        if (collide(field, player)){  //if we drop and collide it means we touch the bottom of screen or another block
            player.pos.y--; // if we do then we have to move block player one up 
            join(field, player);
            player.pos.y = 0; // we set our player's block to the top to start over 
        }
        dCounter = 0; // we reset to 0 so it can count again 
    }

    draw();
    requestAnimationFrame(update);
}

const field = createBlocks(12, 20); //w/h 12 squares wide and 20 height 
// console.log(field); console.table(field);
// we add our player with a position and block
const player = {
    pos: {x: 5, y:-2},
    blocks: blocks,
}

// // use the following EventListener to find key codes
// // document.addEventListener('keydown', e =>{
// //     console.log(e);
// // })
document.addEventListener('keydown', e => {
    if (e.keyCode === 37) {
        function playerMove(control){
            player.pos.x += control;
        if (collide(field, player)){ //if we drop and collide it means we touch the bottom of screen or another block
            player.pos.x -= control; // this is moving our player one up if its colliding, 
        }};
        playerMove(-1);   //move left one

        //player.pos.x--;
    } else if (e.keyCode === 39){ 
        function playerMove(control){
            player.pos.x += control; // take players position x and move + 1 to the right
        if (collide(field, player)){ // if they collide
            player.pos.x -= control;
        }};
        playerMove(+1); //move right one
    } else if (e.keyCode === 40){
        player.pos.y++; 
        if (collide(field, player)){ // if we drop and collide it means we touch the bottom of screen or another block
            player.pos.y--;  // if we do then we have to move block player back up
            join(field, player);
            player.pos.y = -2; // we set our player's block to the top to start over 
        }
                dCounter = 0;

    } else if (e.keyCode === 65 ){ // then we set keys Q and W to rotate our blocks
        const pos = player.pos.x;
        let offset = 1; 
        function playerRotate(control){
            rotate(player.blocks, control);
           }
           playerRotate(-1);
         while(collide(field, player)){  //when we rotate our blocks it exits the canvas walls so we need to check collison  everytime we rotate
             player.pos.x += offset; 
             offset = -(offset + (offset > 0 ? 1 : -1));
             if(offset > player.blocks[0].length){
                 rotate(player.blocks, control);
                player.pos.x = pos; 
                return;
         }
    }
    
}  else if (e.keyCode === 68){
    const pos = player.pos.x;
    let offset = 1; // if the block collides then we move players block by one
    function playerRotate(control){
         rotate(player.blocks, control);
        }
        playerRotate(+1);
     while(collide(field, player)){  //when we rotate our blocks it exits the canvas walls so we need to check collison  everytime we rotate
         player.pos.x += offset; 
         offset = -(offset + (offset > 0 ? 1 : -1)); 
         if(offset > player.blocks[0].length){
             rotate(player.blocks, control);
            player.pos.x = pos; 
            return;
        }
    }
 }
 console.log(field); console.table(field);
});
