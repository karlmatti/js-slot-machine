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
    for (let i = 1; i <= reelsCount; i++){
        if (!isSlotOnReel (state[i], slot7)) return false;
    }
    return true;
}
function isSlotOnReel (reel, slot) {
    return reel.top === slot ||
        reel.center === slot ||
        reel.bottom === slot;

}
payTable.isCherry7Combination = function (state) {
    for (let i = 1; i <= reelsCount; i++){
        if (!isSlotOnReel (state[i], slot7 ||
        !isSlotOnReel(state[i], slotCHERRY)) ) {
            return false;
        }
    }
    return true;
}

payTable.is3xBARs = function (state) {
    for (let i = 1; i <= reelsCount; i++){
        if (!isSlotOnReel (state[i], slot3xBAR)) return false;
    }
    return true;
}

payTable.is2xBARs = function (state) {
    for (let i = 1; i <= reelsCount; i++){
        if (!isSlotOnReel (state[i], slot2xBAR)) return false;
    }
    return true;
}

payTable.isBARs = function (state) {
    for (let i = 1; i <= reelsCount; i++){
        if (!isSlotOnReel (state[i], slotBAR)) return false;
    }
    return true;
}

payTable.isAnyBARs = function (state) {
    for (let i = 1; i <= reelsCount; i++){
        if (!isSlotOnReel (state[i], slotBAR) ||
            !isSlotOnReel(state[i], slot2xBAR) ||
            !isSlotOnReel(state[i], slot3xBAR))  {
            return false;
        }
    }
    return true;
}
