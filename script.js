

const SLOTS_PER_REEL = 12;
let NO_OF_REELS = 3;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;
const bar2 = "./Reel/2xBAR.png";
const bar1 = "./Reel/BAR.png";
const bar3 = "./Reel/3xBAR.png";
const seven = "./Reel/7.png";
const cherry = "./Reel/Cherry.png";
const SLOT_VALUE_RELATIONSHIP = {
	0: bar3,
	1: bar1,
	2: bar2,
	3: seven,
	4: cherry,
	5: bar3,
	6: bar1,
	7: bar2,
	8: seven,
	9: cherry,
	10: bar3, //<= This value is not counted in when spinning
	11: cherry //<= This value is not counted in when spinning
}


function resetSlots() {
	$('.slot').remove();
	$('.slotImg').remove();

	//console.log("slots removed");
	createReels(NO_OF_REELS);
	//console.log("slots added");
	console.log("resetSlots() - not Implemented yet");
}
function generateInitialResults(){
	let result = {};
	for (let i = 1; i <= NO_OF_REELS; i++){
		result[i] = {
			top: null,
			center: 0,
			bottom: null
		}
	}
	return result;
}

function createSlots (ring) {
	
	var slotAngle = 360 / SLOTS_PER_REEL;

	//var seed = getSeed();
	let seed = 0;

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
		var content = $(slot).append('<img class="slotImg" alt="slot" src="' + SLOT_VALUE_RELATIONSHIP[i] +'"/>');
		//var content = $(slot).append('<img class="slotImg" alt="slot" src="' + SLOT_VALUE_RELATIONSHIP[i] +'"/>');
		// add the poster to the row
		ring.append(slot);
	}
}

function getSeed() {
	// generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
	return Math.floor(Math.random()*(10));
}

function setRandomSlotAngles() {
	console.log("==== START setRandomSlotAngle() ====");
	let slotAngle = 360 / SLOTS_PER_REEL;
	let isCentered = {};

	for(let i = 1; i < 4; i ++) {
		let random = Math.floor(Math.random()*(2));
		//console.log("random " + random);

		$("#ring" + i).children(".slot").each(function (slot) {
			let extraAngle = 0;
			if (random === 0) {
				extraAngle = slotAngle / 2;
				isCentered[i] = {isCentered: false};
			} else {
				isCentered[i] = {isCentered: true};
			}

			let slotValue = parseInt($(this).text());
			console.log("slot " + slot + " slotValue " + slotValue);
			$(this).css('transform', 'rotateX(' + ((slotAngle * slot) + extraAngle) + 'deg)' +
				' translateZ(' + REEL_RADIUS + 'px)');


			//console.log($(this).children(".slotImg"));
			//$(this).children(".slotImg").css('transform', 'rotateX(' + ((slotAngle * slotValue) + extraAngle) + 'deg)' +
			//	' translateZ(' + REEL_RADIUS + 'px)');

		/*	} else {
				let halfSlotAngle = 375 / SLOTS_PER_REEL;
				$(this).css('transform', 'rotateX(' + (halfSlotAngle * slot) + 'deg)' +
					' translateZ(' + REEL_RADIUS + 'px)');
			}*/


		});
		//console.log("===============================");
	}
	//console.log("==== END setRandomSlotAngle() ====");

	return isCentered;
}
function spin(timer) {

	resetSlots();
	let isCenteredAndValue = setRandomSlotAngles();
	//console.log("isCenteredAndValue" + JSON.stringify(isCenteredAndValue));
	//var txt = 'seeds: ';
	for(let i = 1; i <= NO_OF_REELS; i ++) {
		let oldSeed = -1;
		/*
		checking that the old seed from the previous iteration is not the same as the current iteration;
		if this happens then the reel will not spin at all
		*/
		let ring = $('#ring'+i);
		let oldClass = ring.attr('class');
		//console.log(oldClass.length);
		//console.log("oldClass => " + JSON.stringify(oldClass));
		if(oldClass.length > 4) {
			oldSeed = parseInt(oldClass.slice(10));
			//console.log("oldSeed: " + oldSeed);
		}
		let seed = getSeed();
		while(oldSeed === seed) {
			seed = getSeed();
		}

		if ((seed + 4) > 11){
			isCenteredAndValue[i]["value"] = seed;
			console.log(i + "new Seed: " + (seed + 4 - 12));
		} else {
			isCenteredAndValue[i]["value"] = seed;
			console.log(i + "new Seed: " + (seed + 4));
		}


		ring
			.css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
			.attr('class','ring spin-' + seed);
	}
	console.log("Updated state: " +
		JSON.stringify(gameEngine.updateState(isCenteredAndValue)));
	console.log('=====');
}
function createReels(noOfReels){
	// initiate slots
	for(let i = 1; i <= noOfReels; i ++) {
		createSlots($('#ring' + i));
	}
}


$(document).ready(function() {

	// Create initial reels
	createReels(NO_OF_REELS);
	gameEngine.generateState(NO_OF_REELS);
	console.log("gameEngine get1 " + JSON.stringify(gameEngine.getState()));
	console.log("gameEngine gen " + JSON.stringify(gameEngine.generateState(NO_OF_REELS)));
	console.log("gameEngine get2 " + JSON.stringify(gameEngine.getState()));

	// Add slot machine overlay
	//
	$('#booth').prepend('<img id="machine" src="machine.png" alt="slot machine"/>')



    $("#selectMode").change(function(){
        let mode = document.getElementById("selectMode").value;
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
 		spin(timer);
 	})

	// hook reset button
	$('.reset').on('click', function (){
		resetSlots();
	});

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

