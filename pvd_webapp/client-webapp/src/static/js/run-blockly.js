import toolbox from './toolbox.js';
import pythonGenerator from './generators.js';

const ws = Blockly.inject('blocklyDiv', { toolbox: toolbox });
window.blocklyInjected = true;

const supportedEvents = new Set([
    Blockly.Events.BLOCK_CHANGE,
    Blockly.Events.BLOCK_CREATE,
    Blockly.Events.BLOCK_DELETE,
    Blockly.Events.BLOCK_MOVE,
    Blockly.Events.BLOCK_UNDO,
    Blockly.Events.BLOCK_REDO,
    Blockly.Events.VAR_CREATE,
    Blockly.Events.VAR_DELETE,
    Blockly.Events.VAR_RENAME,
    Blockly.Events.UI,
]);

function updateGridWithCode(code) {
    fetch(`/updateGrid?code=${encodeURIComponent(code)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log("Response from server:", data);
            // Handle the server response if needed
        })
        .catch(error => {
            console.error("Error occurred: ", error);
            // Handle any errors that occur during the request
        });
}

function redrawGrid() {
    fetch(`/fetchGrid`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const promise_to_parse = response.json();
            promise_to_parse.then(data => {
                console.log("Response from server:", data);
                setGridState(data.grid);
            });
        })
        .catch(error => {
            console.error("Error occurred: ", error);
            // Handle any errors that occur during the request
        });
}
function setGridState(grid) {
    const gridContainer = document.getElementById('gridContainer');
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    const pixels = [];
    for (let y = 0; y < 64; y++) {
        for (let x = 0; x < 256; x++) {
            const pixel = document.createElement('div');
            pixel.style.width = '5px';
            pixel.style.height = '5px';
            pixel.style.display = 'inline-block';
            pixel.style.backgroundColor = grid[y][x] ? 'blue' : 'white';
            gridContainer.appendChild(pixel);
            pixels.push(pixel);
        }
    }
}

ws.addChangeListener((event) => {
    if (supportedEvents.has(event.type)) {
        console.log(Blockly.Python);
        const code = pythonGenerator.workspaceToCode(ws);
        updateGridWithCode(code);
        redrawGrid();
    }
});
