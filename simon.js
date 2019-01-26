// https://github.com/thisisjosh/simonj

var sequence = [];
var playMode = false;
var recallIndex = 0;

function start(){
    console.log("start");

    sequence = [];
    playMode = false;
    recallIndex = 0;

    addBox();
    displaySequence();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Display the sequence
async function displaySequence(){
    playMode = false;
    recallIndex = 0;

    for(let value of sequence){
        await sleep(1000);
        let elementId = boxElementId(value);
        console.log("display " + elementId);
        light(elementId);
    }

    // done replay
    console.log("play done");
    playMode = true;
}

// Get box Id by box index
function boxElementId(i){
    switch(i) {
        case 0:
            return "tl";
        case 1:
            return "tr";
        case 2:
            return "bl";
        case 3:
            return "br";
        default:
            return i;
    }
}

// Add a new box to the sequence
function addBox(){
    let next = randomIntFromInterval(0,3);
    sequence.push(next);
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Handle the box touch
function presh(boxId){
    if(playMode){
        let expected = boxElementId(sequence[recallIndex]);
        if(expected == boxId){
            // advance
            recallIndex++;
            console.log("recallIndex = " + recallIndex);
            light(boxId);
        } else {
            // reset
            alert("Score " + sequence.length);
            start();
        }
        
        if(recallIndex == sequence.length){
            // done
            console.log("recall done");
            addBox();
            displaySequence();
        }   
    }
}

// Momentarily light up a box
async function light(boxId){
    document.getElementById(boxId).style.opacity = 1;
    await sleep(300);
    document.getElementById(boxId).style.opacity = 0.25;
}