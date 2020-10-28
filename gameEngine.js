
let gameEngine = {};
let state = {};
let reelsCount = 0



/*
One reel state value relationship:
0: 3xBAR,
1: BAR,
2: 2xBAR,
3: 7,
4: CHERRY,
5: 3xBAR,
6: BAR,
7: 2xBAR,
8: 7,
9: CHERRY,
10: 3xBAR, <= This value is not counted in when spinning
11: CHERRY <= This value is not counted in when spinning
 */


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
                    state[i].center = isCenteredAndValue[i].value + 4 - 12;
                } else {
                    state[i].center = isCenteredAndValue[i].value + 4;
                }

                state[i].top = null;
                state[i].bottom = null;
            } else {
                console.log("false isCenteredAndValue["+i+"] " + JSON.stringify(isCenteredAndValue[i]));

                state[i].center = null;

                if ((isCenteredAndValue[i].value + 4) > 11){
                    state[i].top = isCenteredAndValue[i].value + 4 - 12;
                    state[i].bottom = getBottomValue(state[i].top);
                } else {
                    state[i].top = isCenteredAndValue[i].value + 4;
                    state[i].bottom = getBottomValue(state[i].top);
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

