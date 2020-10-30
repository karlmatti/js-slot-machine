let payTable = {};

payTable.isTopCherries = function (state) {
    for (let i = 1; i <= reelsCount; i++){
        if (state[i].top !== slotCHERRY) return false;
    }
    return true;
}

payTable.isCenterCherries = function (state) {
    for (let i = 1; i <= reelsCount; i++){
        if (state[i].center !== slotCHERRY) return false;
    }
    return true;
}

payTable.isBottomCherries = function (state) {
    for (let i = 1; i <= reelsCount; i++){
        if (state[i].bottom !== slotCHERRY) return false;
    }
    return true;
}

payTable.is7OnAnyLine = function (state) {
    return isSlotOnAnyLine(state, slot7);
}
function isSlotOnAnyLine(state, slot) {

    let winLines = {
        isTop: true,
        isCenter: true,
        isBottom: true
    }

    for (let i = 1; i <= reelsCount; i++){
        (winLines.isTop && state[i].top === slot) ? winLines.isTop = true : winLines.isTop = false;
        (winLines.isCenter && state[i].center === slot) ? winLines.isCenter = true : winLines.isCenter = false;
        (winLines.isBottom && state[i].bottom === slot) ? winLines.isBottom = true : winLines.isBottom = false;
    }
    winLines.winCount = countWinningLines(winLines);
    return winLines;
}
function countWinningLines(winStatus){
    let counter = 0;
    if(winStatus.isTop)counter++;
    if(winStatus.isCenter)counter++;
    if(winStatus.isBottom)counter++;
    return counter;
}
function isSlotOnReel (reel, slot) {

    return reel.top === slot ||
        reel.center === slot ||
        reel.bottom === slot;

}
payTable.isCherry7Combination = function (state) {

    for (let i = 1; i <= reelsCount; i++){
        if (!(isSlotOnReel (state[i], slot7) ||
        isSlotOnReel(state[i], slotCHERRY))) {
            return false;
        }
    }
    return true;
}

payTable.is3xBARs = function (state) {
    return isSlotOnAnyLine(state, slot3xBAR);
}

payTable.is2xBARs = function (state) {
    return isSlotOnAnyLine(state, slot2xBAR);
}

payTable.isBARs = function (state) {
    return isSlotOnAnyLine(state, slotBAR);
}

payTable.isAnyBARs = function (state) {
    for (let i = 1; i <= reelsCount; i++){
        if (!(isSlotOnReel(state[i], slotBAR) ||
            isSlotOnReel(state[i], slot2xBAR) ||
            isSlotOnReel(state[i], slot3xBAR)))  {
            return false;
        }
    }
    return true;
}
