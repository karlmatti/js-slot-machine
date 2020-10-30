

const SLOTS_PER_REEL = 12;
let NO_OF_REELS = 3;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;
const img2xBAR = "./Reel/2xBAR.png";
const imgBAR = "./Reel/BAR.png";
const img3xBAR = "./Reel/3xBAR.png";
const img7 = "./Reel/7.png";
const imgCHERRY = "./Reel/Cherry.png";
const SLOT_NAME_SLOT_SRC = {
	"BAR": imgBAR,
	"2xBAR": img2xBAR,
	"3xBAR": img3xBAR,
	"7": img7,
	"CHERRY": imgCHERRY
}
const SLOT_VALUE_RELATIONSHIP = {
	0: img3xBAR,
	1: imgBAR,
	2: img2xBAR,
	3: img7,
	4: imgCHERRY,
	5: img3xBAR,
	6: imgBAR,
	7: img2xBAR,
	8: img7,
	9: imgCHERRY,
	10: img3xBAR, //<= This value is not counted in when spinning
	11: imgCHERRY //<= This value is not counted in when spinning
}
/*const SLOT_VALUE_RELATIONSHIP_FIXED = {
	0: img3xBAR,
	1: imgBAR,
	2: img2xBAR,
	3: img7,
	4: imgCHERRY,
	5: img3xBAR,
	6: imgBAR,
	7: img2xBAR,
	8: img7,
	9: imgCHERRY,
	10: img3xBAR,
	11: imgCHERRY
}*/
let SLOT_VALUE_RELATIONSHIP_FIXED = {
	0: img7,
	1: img7,
	2: img7,
	3: img7,
	4: img7,
	5: img7,
	6: img7,
	7: img7,
	8: img7,
	9: img7,
	10: img7,
	11: img7
}

let SLOT_VALUE_RELATIONSHIP_FIXED2 = {
	0: img7,
	1: img7,
	2: img7,
	3: img7,
	4: img7,
	5: img7,
	6: img7,
	7: img7,
	8: img7,
	9: img7,
	10: img7,
	11: img7
}



function deleteSlots(){
	$('.slot').remove();
	$('.slotImg').remove();
}

function resetFixedSlots(){
	deleteSlots();
	createFixedReels(NO_OF_REELS);
}

function resetSlots() {
	deleteSlots();
	createReels(NO_OF_REELS);

}

function createFixedSlots(ring, reelNo) {

	let tempReelState = gameEngine.getFixedReelState();
	let slotAngle = 360 / SLOTS_PER_REEL;


	//console.log("tempReelState[reelNo] =>");
	//console.log(tempReelState[reelNo])
	//console.log("!tempReelState[reelNo].isCentered => "+!tempReelState[reelNo].isCentered )
	let slotPosition = reelNo * 2;
	for (let i = 0; i < SLOTS_PER_REEL; i ++) {
		let slot = document.createElement('div');

		slot.className = 'slot';

		// compute and assign the transform for this slot
		slot.style.transform =
			'rotateX(' + (slotAngle * i) + 'deg)' +
			' translateZ(' + REEL_RADIUS + 'px)';

		// setup the number to show inside the slots
		// the position is randomized to
		//var content = $(slot).append('<p>' + ((seed + i) % SLOTS_PER_REEL)+ '</p>');
		//console.log('<img class="slotImg" alt="slot" src="' + SLOT_VALUE_RELATIONSHIP[i] +'"/>');
		//console.log("Creating slot");

		if (i === slotPosition) {
			if (tempReelState[reelNo].isCentered) {
				SLOT_VALUE_RELATIONSHIP_FIXED[i] = SLOT_NAME_SLOT_SRC[tempReelState[reelNo].center]
			} else {
				SLOT_VALUE_RELATIONSHIP_FIXED[i] = SLOT_NAME_SLOT_SRC[tempReelState[reelNo].top]
			}
		} else if (i === slotPosition + 1) {
			if (!tempReelState[reelNo].isCentered) {
				console.log("setting bottom value")
				SLOT_VALUE_RELATIONSHIP_FIXED[i] = SLOT_NAME_SLOT_SRC[tempReelState[reelNo].bottom]
			}
		}
		//console.log("Slot append: "  + '<img class="slotImg" alt="slot" src="' + SLOT_VALUE_RELATIONSHIP_FIXED[i] +'"/>')
		$(slot).append('<img class="slotImg" alt="slot" src="' + SLOT_VALUE_RELATIONSHIP_FIXED[i] +'"/>');



		//var content = $(slot).append('<img class="slotImg" alt="slot" src="' + SLOT_VALUE_RELATIONSHIP[i] +'"/>');
		// add the poster to the row
		ring.append(slot);
	}
	console.log("SLOT_VALUE_RELATIONSHIP_FIXED => ");
	console.log(SLOT_VALUE_RELATIONSHIP_FIXED);

	Object.assign(SLOT_VALUE_RELATIONSHIP_FIXED, SLOT_VALUE_RELATIONSHIP_FIXED2);



}
function createSlots (ring) {
	
	var slotAngle = 360 / SLOTS_PER_REEL;


	for (let i = 0; i < SLOTS_PER_REEL; i ++) {
		let slot = document.createElement('div');
		
		slot.className = 'slot';

		// compute and assign the transform for this slot
		slot.style.transform =
			'rotateX(' + (slotAngle * i) + 'deg)' +
			' translateZ(' + REEL_RADIUS + 'px)';

		$(slot).append('<img class="slotImg" alt="slot" src="' + SLOT_VALUE_RELATIONSHIP[i] +'"/>');
		// add the poster to the row
		ring.append(slot);
	}
}

function getSeed() {
	// generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
	return Math.floor(Math.random()*(10));
}

function setFixedSlotAngles(reelState) {
	let slotAngle = 360 / SLOTS_PER_REEL;


	for(let i = 1; i < 4; i ++) {

		$("#ring" + i).children(".slot").each(function (slot) {
			let extraAngle = 0;
			if (!reelState[i].isCentered) extraAngle = slotAngle / 2;
			$(this).css('transform', 'rotateX(' + ((slotAngle * slot) - extraAngle) + 'deg)' +
				' translateZ(' + REEL_RADIUS + 'px)');
		});

	}
}
function setRandomSlotAngles() {

	let slotAngle = 360 / SLOTS_PER_REEL;
	let isCentered = {};

	for(let i = 1; i < 4; i ++) {
		let random = Math.floor(Math.random()*(2));


		$("#ring" + i).children(".slot").each(function (slot) {
			let extraAngle = 0;
			if (random === 0) {
				extraAngle = slotAngle / 2;
				isCentered[i] = {isCentered: false};
			} else {
				isCentered[i] = {isCentered: true};
			}

			$(this).css('transform', 'rotateX(' + ((slotAngle * slot) + extraAngle) + 'deg)' +
				' translateZ(' + REEL_RADIUS + 'px)');


		});

	}


	return isCentered;
}

function validateFixedPositions(){
	for (let i = 1; i <= NO_OF_REELS; i++) {
		let top = null;
		let center = null;
		let bottom = null;
		for (let j = 0; j < 3; j++){
			let id = i.toString();
			let position = "xxx";
			if (j === 0) {
				position = "Top";
				id += position;
				//console.log('#' + id+": "+document.getElementById(id).value);
				top = document.getElementById(id).value;

			} else if (j === 1) {
				position = "Center"
				id += position;
				center = document.getElementById(id).value;
				//console.log('#' + id+": "+document.getElementById(id).value);
			} else if (j === 2) {
				position = "Bottom"
				id += position;
				bottom = document.getElementById(id).value;
				//console.log('#' + id+": "+document.getElementById(id).value);
			} else {
				console.error("Something wrong with validating fixed positions.")
			}
		}
		if (gameEngine.validateFixedReelValues(top, center, bottom)){
			gameEngine.updateFixedReelState(i, top, center, bottom);
		} else {
			alert("Please choose either center | top-bottom combinations for each reel!");
			return false;
		}

	}
	return true
}
function spinFixed(timer) {
	if(validateFixedPositions()) {
		console.log("SPINNNNNNNNfixedNNNNNNNING!")

		// delete slots & createFixedReels
		resetFixedSlots();

		// set reel angle
		//console.log("setting reel angle");
		let tempFixedReelState = gameEngine.getFixedReelState();
		setFixedSlotAngles(tempFixedReelState);
		//console.log("tempFixedReelState: " + JSON.stringify(tempFixedReelState));


		let startCount = 8;
		for(let i = 1; i <= NO_OF_REELS; i ++) {
			let oldSeed = -1;
			/*
            checking that the old seed from the previous iteration is not the same as the current iteration;
            if this happens then the reel will not spin at all
            */
			let ring = $('#ring'+i);
			// 10,0,2
			(startCount >= 10) ? startCount = 0 : startCount += 2;
			let seed = startCount;

			console.log(i + " => Seed: " + seed);
			console.log("animation time: " + (timer + i*0.5));
			ring
				.css('animation','back-spin 1s, spin-' + seed + ' ' + (timer /*+ i*0.5*/) + 's')
				.attr('class','ring spin-' + seed);
		}

	}
}

function spinRandom(timer) {

	resetSlots();
	let isCenteredAndValue = setRandomSlotAngles();

	for(let i = 1; i <= NO_OF_REELS; i ++) {
		let oldSeed = -1;
		/*
		checking that the old seed from the previous iteration is not the same as the current iteration;
		if this happens then the reel will not spin at all
		*/
		let ring = $('#ring'+i);
		let oldClass = ring.attr('class');

		if(oldClass.length > 4) {
			oldSeed = parseInt(oldClass.slice(10));

		}
		let seed = getSeed();
		while(oldSeed === seed) {
			seed = getSeed();
		}

		if ((seed + 4) > 11){
			isCenteredAndValue[i]["value"] = seed;
			//console.log(i + "new Seed: " + (seed + 4 - 12));
		} else {
			isCenteredAndValue[i]["value"] = seed;
			//console.log(i + "new Seed: " + (seed + 4));
		}


		ring
			.css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
			.attr('class','ring spin-' + seed);
	}
	/*console.log("Updated state: " +
		JSON.stringify(gameEngine.updateState(isCenteredAndValue)));*/
	console.log('===== End of SPIN =====');

}
function createReels(noOfReels){
	// initiate slots
	for(let i = 1; i <= noOfReels; i ++) {
		createSlots($('#ring' + i));
	}
}
function createFixedReels(noOfReels){
	// initiate slots
	for(let i = 1; i <= noOfReels; i++) {
		createFixedSlots($('#ring' + i), i);
	}
}
function activateDebugMode() {
    let debugArea = document.getElementById("debugArea");
    for (let i = 1; i <= NO_OF_REELS; i++) {
        let div = document.createElement('div');
        div.className = "selectSlotArea";
        for (let j = 0; j < 3; j++){
            let id = i.toString();
            let position = "xxx";
            if (j === 0) {
                position = "Top";
            } else if (j === 1) {
                position = "Center"
            } else if (j === 2) {
                position = "Bottom"
            } else {
                console.error("Something wrong with generating debug mode.")
            }
            id += position;
            $(div).append(
                '<label class="selectSlotLabel" for="'+id+'">'+position+':</label>' +
                '<select id="'+id+'" class="selectSlot">' +
                '<option class="selectSlotValue" value='+null+'>-' +
                '<option class="selectSlotValue" value="'+slot3xBAR+'">'+slot3xBAR +
                '<option class="selectSlotValue" value="'+slot2xBAR+'">'+slot2xBAR+
                '<option class="selectSlotValue" value="'+slotBAR+'">'+slotBAR+'' +
                '<option class="selectSlotValue" value="'+slotCHERRY+'">'+slotCHERRY +
                '<option class="selectSlotValue" value="'+slot7+'">'+slot7 +
                '</select>'
            );

        }
        debugArea.append(div);

    }

}

function activateRandomMode() {
    $('.selectSlot').remove();
    $('.selectSlotLabel').remove();
    $('.selectSlotValue').remove();
    $('.selectSlotArea').remove();

}

$(document).ready(function() {

	// Create initial reels
	createReels(NO_OF_REELS);
	gameEngine.generateState(NO_OF_REELS);

	// Add slot machine overlay
	//
	$('#booth').prepend('<img id="machine" src="machine.png" alt="slot machine"/>')



    $("#selectMode").change(function(){
        let mode = document.getElementById("selectMode").value;
        (mode === "Debug") ? activateDebugMode() : activateRandomMode();

        console.log("New mode is " + mode);
    });

    $("#balance").change(function(){
        let balance = document.getElementById("balance").value;
        console.log("New balance is " + balance);
    });

 	// hook start button
 	$('.go').on('click',function(){
 		console.log("spin")
 		var timer = 2;
		let mode = document.getElementById("selectMode").value;
		(mode === "Random") ? spinRandom(timer) : spinFixed(timer);
 		let winnings = gameEngine.getWinnings();
 		console.log("$$$ Winnings: " + winnings + " $$$");
 	})


 	// hook xray checkbox
 	$('#xray').on('click',function(){
 		//var isChecked = $('#xray:checked');
 		var tilt = 'tiltout';
 		
    if($(this).is(':checked')) {
 			tilt = 'tiltin';
 			$('.slot').addClass('backface-on');
 			$('#rotate').css('animation',tilt + ' 2s 1');

			setTimeout(function(){
			  $('#rotate').toggleClass('tilted');
			},2000);
 		} else {
      tilt = 'tiltout';
 			$('#rotate').css({'animation':tilt + ' 2s 1'});

			setTimeout(function(){
	 			$('#rotate').toggleClass('tilted');
	 			$('.slot').removeClass('backface-on');
	 		},1900);
 		}
 	})

 	// hook perspective
 	$('#perspective').on('click',function(){
 		$('#stage').toggleClass('perspective-on perspective-off');
 	})	
 });

