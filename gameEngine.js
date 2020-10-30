
let gameEngine = {};
let reelState = {};

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
    10: slot3xBAR,
    11: slotCHERRY
}


gameEngine.generateState = function(noOfReels) {
    reelsCount = noOfReels;
    for (let i = 1; i <= noOfReels; i++){
        reelState[i] = {
            top: null,
            center: stateSlotValue[0],
            bottom: null,
            isCentered: true
        }
    }
    return reelState;
}
gameEngine.getState = function () {
    return reelState;
}

gameEngine.setState = function (newState) {
    reelState = newState;
    return reelState;
}

gameEngine.updateRandomReelState = function(isCenteredAndValue) {
    if (reelsCount === 0) {
        console.log("State is not generated yet!");
    } else {
        for (let i = 1; i <= reelsCount; i++){
            if (isCenteredAndValue[i].isCentered) {

                if ((isCenteredAndValue[i].value + 4) > 11){
                    reelState[i].center = stateSlotValue[isCenteredAndValue[i].value + 4 - 12]
                } else {
                    reelState[i].center = stateSlotValue[isCenteredAndValue[i].value + 4]
                }
                reelState[i].isCentered = isCenteredAndValue[i].isCentered;
                reelState[i].top = null;
                reelState[i].bottom = null;
            } else {


                reelState[i].center = null;
                reelState[i].isCentered = isCenteredAndValue[i].isCentered;
                if ((isCenteredAndValue[i].value + 4) > 11){

                    reelState[i].top = stateSlotValue[isCenteredAndValue[i].value + 4 - 12]
                    reelState[i].bottom = stateSlotValue[getBottomValue(isCenteredAndValue[i].value + 4 - 12)]

                } else {

                    reelState[i].top = stateSlotValue[isCenteredAndValue[i].value + 4]
                    reelState[i].bottom = stateSlotValue[getBottomValue(isCenteredAndValue[i].value + 4)]
                }

            }
        }
        return reelState;
    }

}
function getBottomValue(topKey) {
    if(topKey === 0) {
        return 9;
    } else {
        return topKey - 1;
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
        reelState[reelNo] = {
            isCentered: true,
            center: center,
            top: null,
            bottom: null
        }
    } else {
        reelState[reelNo] = {
            isCentered: false,
            top: top,
            bottom: bottom,
            center: null
        }
    }

}
