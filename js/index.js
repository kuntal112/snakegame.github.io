let inputDir = { x: 0, y: 0 };
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    { x: 5, y: 8 }
]
var food = { x: 6, y: 9 }
// functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(sArr) {
    for (let i = 1; i < sArr.length; i++) {
        if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y) {

            return true;
        }
    }
    if (sArr[0].x > 18 || sArr[0].y > 18 || sArr[0].x < 0 || sArr[0].y < 0) {
        return true;
    }
}
function gameEngine() {
    // update the snake array
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Over Press any key to start");
        snakeArr = [{ x: 13, y: 15 }];

    }
    // moving the snake
    for (i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // after eating the food
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    // display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add("snakebody")
        }
        board.appendChild(snakeElement);

    })
    // display the food
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement)
}





// main logic starts here
window.requestAnimationFrame(main)
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "ArrowUp": {

            if (inputDir.y === 1) {
                console.log("bfrbrk")
                break;
            }
            inputDir = { x: 0, y: -1 }
            console.log("break")
        }
            break;
        case "ArrowDown": {
            if (inputDir.y === -1) {
                break;
            }
            inputDir = { x: 0, y: 1 }
        }
            break;
        case "ArrowRight":
            console.log(inputDir)
            if (inputDir.x === -1) {
                break
            }
            inputDir = { x: 1, y: 0 }
            break;
        case "ArrowLeft":
            if (inputDir.x === 1) {
                break;
            }
            inputDir = { x: -1, y: 0 }
            break;

    }
})


// for touch devices
let startX, startY;

window.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling on touch devices

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    // Adjust the sensitivity based on your needs
    const sensitivity = 10;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > sensitivity) {
            // Swipe right
            if (inputDir.x !== -1) {
                inputDir = { x: 1, y: 0 }
            }
            console.log("Swipe Right");
        } else if (deltaX < -sensitivity) {
            // Swipe left
            if (inputDir.x !== 1) {
                inputDir = { x: -1, y: 0 }
            }
            console.log("Swipe Left");
        }
    } else {
        // Vertical swipe
        if (deltaY > sensitivity) {
            // Swipe down
            if (inputDir.y !== -1) {
                inputDir = { x: 0, y: 1 }
            }
            console.log("Swipe Down");
        } else if (deltaY < -sensitivity) {
            // Swipe up
            if (inputDir.y !== 1) {
                console.log("bfrbrk")
                inputDir = { x: 0, y: -1 }
            }
            console.log("Swipe Up");
        }
    }

    // Update the start coordinates for the next iteration
    startX = currentX;
    startY = currentY;
});
