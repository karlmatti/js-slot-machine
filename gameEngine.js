
let gameEngine = {};
let reelState = {};

let reelsCount = 3;
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

    let winnings = {
        amount: 0,
        isTop: false,
        isCenter: false,
        isBottom: false
    }
    if(payTable.isTopCherries(reelState)) {
        winnings.amount += 2000;
        winnings.isTop = true;
        console.log("isTopCherries");
    }
    if(payTable.isCenterCherries(reelState)){
        winnings.amount += 1000;
        winnings.isCenter = true;
        console.log("isCenterCherries");
    }
    if(payTable.isBottomCherries(reelState)){
        winnings.amount += 4000;
        winnings.isBottom = true;
        console.log("isBottomCherries");
    }
    let is7OnAnyLine = payTable.is7OnAnyLine(reelState);
    if(is7OnAnyLine.winCount > 0){
        winnings.amount += 150 * is7OnAnyLine.winCount;
        if(is7OnAnyLine.isTop) winnings.isTop = is7OnAnyLine.isTop;
        if(is7OnAnyLine.isCenter) winnings.isCenter = is7OnAnyLine.isCenter;
        if(is7OnAnyLine.isBottom) winnings.isBottom = is7OnAnyLine.isBottom;
        console.log("is7OnAnyLine" );
    }
    if(payTable.isCherry7Combination(reelState)){
        winnings.amount += 75;

        console.log("isCherry7Combination");
    }
    let is3xBARs = payTable.is3xBARs(reelState);
    if(is3xBARs.winCount > 0){
        winnings.amount += 50 * is3xBARs.winCount;
        if(is3xBARs.isTop) winnings.isTop = is3xBARs.isTop;
        if(is3xBARs.isCenter) winnings.isCenter = is3xBARs.isCenter;
        if(is3xBARs.isBottom) winnings.isBottom = is3xBARs.isBottom;
        console.log("is3xBARs");
    }
    let is2xBARs = payTable.is2xBARs(reelState);
    if(is2xBARs.winCount > 0){
        winnings.amount += 20 * is2xBARs.winCount;
        if(is2xBARs.isTop) winnings.isTop = is2xBARs.isTop;
        if(is2xBARs.isCenter) winnings.isCenter = is2xBARs.isCenter;
        if(is2xBARs.isBottom) winnings.isBottom = is2xBARs.isBottom;
        console.log("is2xBARs");
    }
    let isBARs = payTable.isBARs(reelState);
    if(isBARs.winCount > 0){
        winnings.amount += 10 * isBARs.winCount;
        if(isBARs.isTop) winnings.isTop = isBARs.isTop;
        if(isBARs.isCenter) winnings.isCenter = isBARs.isCenter;
        if(isBARs.isBottom) winnings.isBottom = isBARs.isBottom;
        console.log("isBARs");
    }
    if(payTable.isAnyBARs(reelState)){
        winnings.amount += 5;
        console.log("isAnyBARs");
    }

    return winnings;
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
