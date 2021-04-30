# Tetris Challenge Part 1

In this guide, I will walk you through building the first part of a tetris game. We will apply our learnings from the first two weeks of General Assembly's Software Engineering Immersive program. 

 
# HOW TO PLAY 
This is a very simple game to play. The only required controls are the following:

1. **Left and Right arrow:** Moves the block left or right
2. **Down Arrow:** Accelerates the block's fall
3. **A & D Key:** Rotates the block


To play Tetris online visit: https://janethl.github.io/project-1-example/

## Start Up Screen:
Press the start button to begin playing! 

<img src="docs/img/startScreen.png" width="600">

The reset game will restart your game and set your score to zero. 

# HOW TO INSTALL

1. *`Fork`* and *`Clone`* this respository to your local machine
2. Open `index.html` in your browser to play or 
3. Open the directory in your text editor of choice to view or edit the code


# HOW IT WORKS


Steps:

// Picked one block piece to start off drawing the entire structure and functions of game
// Blocks are built using an array of arrays and filling them in with 0’s and one’s

```javascript
const blocks = [
    //include four rows to make rotation easier
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
];
```

// Created a function drawBlocks() to draw the first block

// Used forEach and Loops to draw the the squares that aren’t zero 


```javascript

function drawBlocks(blocks, offset){
//use .forEach method to iterate over every row and y index 
blocks.forEach((row, y) => {
    //grab the value and x index 
    row.forEach((value, x) => {
        // if value is not zero we draw the square
        if (value !== 0) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(x + offset.x, // offset will allow us to move the blocks later
                         y + offset.y, 
                         1, 1);
        }
    });
});
}
```

//I added a function draw() to draw game continuosly 

```javascript
//create blocks using function draw () that passes our player position and blocks to update  game constantly
function draw (){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawBlocks(field, {x:0, y:0}); //draw the squares inside zero's that are being populated as block sets`console.log(field)`
    drawBlocks(player.blocks, player.pos); 
}

```

// Our update() function starts our game this function calls draw() and uses requestAnimationFrame()
//requestAnimationFrame() tells the browser to perform an animation and requests that the browser call a function to update an animation before the next repaint

```javascript

//call the draw() function and requestAnimationFrame()
//deltaTime is a useful variable for animation contains the time difference between the beginning of the previous frame and the beginning of the current frame in milliseconds
function update(time = 0) { //drop the blocks using the requestAnimationFrame() by grabbing time and defaulting to 0
    const deltaTime = time - lastTime; 
    lastTime = time;
    // console.log(deltaTime);

    dCounter += deltaTime; //add drop count to the difference between the prev frame and current frame 
    if (dCounter > dropInterval){
        player.pos.y++;
        if (collide(field, player)){  //if  drop and collide it means the block touches the bottom of screen or another block
            player.pos.y--; // if collide then move block player one up 
            join(field, player);
            player.pos.y = 0; // set  player's block to the top to start over 
        }
        dCounter = 0; // reset to 0 so it can count again 
    }

    draw();
    requestAnimationFrame(update);
}

```
// we have a dropCounter variable that we default to 0 whenever we need to move our piece back to top
//we have a dropInterval set to 500 milliseconds so our pices drop every 1/2 a second

```javascript
//500 milliseconds (.5 sec) to drop the piece one step
let dCounter = 0; 
let dropInterval = 500;

//get difference of time
let lastTime = 0; 
```

// we create our field by passing in a width of 12 and height of 22 into our function createBlocks()
createBlocks()

// join() function is where join or print our players position to the field that we built. It copies the players position into the field.

//our collide() function we’re checking to see where our squares on our field are not zero then they collide
 
//Keyboard Controls. Set an event listener for whenever our arrows and and Keys A& D are clicked

//in playerMove() we use our collide() function to check if our pieces collide with the field or other pieces 

//rotate() function is taking our rows annd converting them into columns 



# FUTURE CONSIDERATIONS

- Create 6 more blocks with if statements
- Create a function to randomly select a block
- Add colors to blocks 
- Need to add a game over screen
- Count filled rows using a for loop and clear rows once full
- Add a function that updates the score 
- Add styling to buttons
- Add SMS functionality with API to challenge friends to beat high score a game 


# PROCESS WORK

## Initial Wireframes:
Initial Wireframes go here ( images )

## Scratch Work:

Scratch Work goes here
