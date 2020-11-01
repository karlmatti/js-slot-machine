let payTable = {};

payTable.isCherriesOnAnyLine = function (state) {
    return isSlotOnAnyLine(state, slotCHERRY);
}
payTable.is7OnAnyLine = function (state) {
    return isSlotOnAnyLine(state, slot7);
}

payTable.isCherry7Combination = function (state) {
    return isSlotsCombination(state, [slot7, slotCHERRY]);
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
    return isSlotsCombination(state, [slotBAR, slot2xBAR, slot3xBAR]);
}

// ====== UTILS ======
/*
INPUT
state: Object of i states where each have top, center, bottom states
slots: List of slots
==============
OUTPUT
winLines: Object of win lines and count of win lines
 */
function isSlotsCombination(state, slots) {
    let winLines = {
        isTop: true,
        isCenter: true,
        isBottom: true
    }
    for (let i = 1; i <= reelsCount; i++){
        (winLines.isTop && (isSlotInSlots(state[i].top, slots))) ?
            winLines.isTop = true: winLines.isTop = false;

        (winLines.isCenter && (isSlotInSlots(state[i].center, slots))) ?
            winLines.isCenter = true: winLines.isCenter = false;

        (winLines.isBottom && (isSlotInSlots(state[i].bottom, slots))) ?
            winLines.isBottom = true: winLines.isBottom = false;
    }

    winLines.winCount = countWinningLines(winLines);
    return winLines;
}
function isSlotInSlots(slot, slots) {
    let isSlotInSlots = false;
    for (let i = 0; i < slots.length; i++){
        if (slots[i]===slot) isSlotInSlots = true;
    }
    return isSlotInSlots;

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