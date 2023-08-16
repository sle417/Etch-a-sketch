const container = document.getElementById("gridContainer");

let isMouseDown = false; // Track mouse button state
let gridSize = 16; // Initialize grid size
let val = 640;
let gridItems = []; // Store references to grid items

function calculateGridItemSize(cols) {
    return val / cols;
}

function setGridItemSize(gridItem, size) {
    gridItem.style.width = size + "px";
    gridItem.style.height = size + "px";
}

function resetGridItemSize() {
    gridItems.forEach(gridItem => {
        setGridItemSize(gridItem, 16); // Set back to default size of 16px
    });
}

function resetContainerWidth() {
    container.style.width = calculateGridItemSize(gridSize) * gridSize + "px";
}


function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    const gridItemSize = calculateGridItemSize(cols);

    // Update existing grid items
    gridItems.forEach(gridItem => {
        setGridItemSize(gridItem, gridItemSize);
    });
    
    // Add or remove grid items if needed
    while (gridItems.length < (rows * cols)) {
        let gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        setGridItemSize(gridItem, gridItemSize);
        container.appendChild(gridItem);
        gridItems.push(gridItem);
    }
    while (gridItems.length > (rows * cols)) {
        let removedItem = gridItems.pop();
        // remove all the extra grid items
        container.removeChild(removedItem);
    }
    // ensures that the width is exactly the pixel sum of a row of cells
    // there will in turn be no spacing between
    resetContainerWidth();


    /* color grid black on mouse click hold */
    
    gridItems.forEach(gridItem => {
        gridItem.addEventListener('mousedown', () => {
            isMouseDown = true;
            gridItem.style.backgroundColor = 'black';
        });
    
        gridItem.addEventListener('mousemove', () => {
            if (isMouseDown) {
                gridItem.style.backgroundColor = 'black';
            }
        });
    
        gridItem.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
    });
}

makeGrid(gridSize, gridSize);

/* change and update slider value */

const slider = document.getElementById("slider");
const sliderValue = document.getElementById("sliderValue");

slider.addEventListener("input", () => {
    gridSize = parseInt(slider.value);
    sliderValue.textContent = gridSize + "px";
});

/* controls to apply pixel density */

const applyGrid = document.getElementById("applyControl");

applyGrid.addEventListener('click', () => {
    makeGrid(gridSize, gridSize);

    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = 'white';
    })
});


/* reset to all white */

const resetBtn = document.querySelector('#resetBtn');

resetBtn.addEventListener('click', () => {
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = 'white';
    });
});
