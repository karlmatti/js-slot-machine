
let gameEngine = {};
let state = {};
let fixedReelState = {};
let reelsCount = 0
const slot3xBAR = "3xBAR";
const slot2xBAR = "2xBAR";
const slotBAR = "BAR";
const slotCHERRY = "CHERRY";
const slot7 = "7";

let stateSlotValue = {
    0: slot3xBAR,
    1: slotBAR,
    2: slot2xBAR,
    3: slot7,
    4: slotCHERRY,
    5: slot3xBAR,
    6: slotBAR,
    7: slot2xBAR,
    8: slot7,
    9: slotCHERRY,
    10: slot3xBAR,// <= This value is not counted in when spinning
    11: slotCHERRY// <= This value is not counted in when spinning
}


gameEngine.generateState = function(noOfReels) {
    reelsCount = noOfReels;
    for (let i = 1; i <= noOfReels; i++){
        state[i] = {
            top: null,
            center: 0,
            bottom: null
        }
    }
    return state;
}
gameEngine.getState = function () {
    return state;
}

gameEngine.setState = function (newState) {
    state = newState;
    return state;
}

gameEngine.updateState = function(isCenteredAndValue) {
    if (reelsCount === 0) {
        console.log("State is not generated yet!");
    } else {
        for (let i = 1; i <= reelsCount; i++){
            if (isCenteredAndValue[i].isCentered) {
                console.log("true isCenteredAndValue["+i+"] " + JSON.stringify(isCenteredAndValue[i]));

                if ((isCenteredAndValue[i].value + 4) > 11){
                    state[i].center = isCenteredAndValue[i].value + 4 - 12
                } else {
                    state[i].center = isCenteredAndValue[i].value + 4
                }

                state[i].top = null;
                state[i].bottom = null;
            } else {
                console.log("false isCenteredAndValue["+i+"] " + JSON.stringify(isCenteredAndValue[i]));

                state[i].center = null;

                if ((isCenteredAndValue[i].value + 4) > 11){
                    state[i].top = isCenteredAndValue[i].value + 4 - 12
                    state[i].bottom = getBottomValue(state[i].top)
                } else {
                    state[i].top = isCenteredAndValue[i].value + 4
                    state[i].bottom = getBottomValue(state[i].top)
                }

            }
        }
        return state;
    }

}
function getBottomValue(topValue) {
    if(topValue === 0) {
        return 9;
    } else {
        return topValue - 1;
    }
}


gameEngine.getWinnings = function (){
    let tempWinnings = 0;
    return 0;
}

/*
Input params.
top: String
center: String
bottom: String
==============
Output param.
True/False: Boolean
 */
gameEngine.validateFixedReelValues = function (top, center, bottom) {
    if(center !== "null") {
        return true;
    } else return top !== "null" && bottom !== "null";
}

gameEngine.updateFixedReelState = function (reelNo, top, center, bottom) {
    if (center !== "null") {
        fixedReelState[reelNo] = {
            isCentered: true,
            center: center
        }
    } else {
        fixedReelState[reelNo] = {
            isCentered: false,
            top: top,
            bottom: bottom
        }
    }

}
gameEngine.getFixedReelState = function () {
    return fixedReelState;
}